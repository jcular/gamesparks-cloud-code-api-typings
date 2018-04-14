import * as https from "https";
import * as fs from "fs";
import { JSDOM } from 'jsdom';

let webUrl = "https://docs.gamesparks.com/api-documentation/";
let outPath = "./typings/";
let baseUrl = "https://docs.gamesparks.com";
let baseHref = "/api-documentation/cloud-code-api/";
let baseMenuTitle = "Cloud Code API";

interface IClassInfo {
	name: string,
	folder: string,
	descriptions: string[],
	signatures: {
		text: string,
		returns: string,
		deprecated: string,
		validity: string,
		descriptions: string[],
		lastDescriptionIndex: number,
		params: {
			name: string,
			descriptions: string[],
		}[],
		example: string,
		returnsDescription: string,
	}[],
}

async function main() {
	console.log("read...");
	let dom = await JSDOM.fromURL(webUrl);

	let subMenus = dom.window.document.getElementsByClassName("sub-menu ");
	for (let i = 0; i < subMenus.length; i++) {
		let subMenu = subMenus[i];
		let title = subMenu.childNodes[1].textContent as string;
		let href = subMenu.childNodes[1].attributes.getNamedItem("href").nodeValue as string;
		if (href.indexOf(baseHref) != 0) {
			continue;
		}

		let url = baseUrl + href;
		let page = await JSDOM.fromURL(url);
		let content = page.window.document.getElementsByClassName("content")[0];
		let folder = "";
		if (subMenu.parentNode && subMenu.parentNode.parentNode) {
			let parent = subMenu.parentNode.parentNode;
			if (parent.childNodes[1].textContent != baseMenuTitle) {
				folder = parent.childNodes[1].textContent as string;
			}
		}

		let c: IClassInfo = {
			name: "",
			folder: folder,
			descriptions: [],
			signatures: [],
		};

		let j = 0;
		for (; j < content.childNodes.length; j++) {
			let childNode = content.childNodes[j];
			if (childNode.localName == undefined) {
				continue;
			}
			if (childNode.localName == "h1") {
				c.name = childNode.textContent as string;
				continue;
			}
			if (childNode.localName == "h2") {
				break;
			}
			c.descriptions.push(childNode.textContent as string);
		}
		for (; j < content.childNodes.length; j++) {
			let childNode = content.childNodes[j];
			if (childNode.localName == undefined || !childNode.textContent) {
				continue;
			}
			// signature
			if (childNode.childNodes.length > 0 && childNode.childNodes[0].localName as string == "em" && childNode.childNodes[0].textContent == "signature") {
				let signature = childNode.childNodes[1].textContent as string;
				for (let k = 2; k < childNode.childNodes.length; k++) {
					signature += childNode.childNodes[k].textContent;
				}
				signature = signature.substr(1);
				if (signature.indexOf("()") == -1) {
					let parsStr = signature.split("(")[1].split(")")[0];
					let pars = parsStr.split(", ");
					for (let k = 0; k < pars.length; k++) {
						let temp = pars[k].split(" ");
						pars[k] = temp[1] + ": " + temp[0];
					}
					signature = signature.split("(")[0] + "(" + pars.join(", ") + ")";
				}
				c.signatures.push({
					text: signature,
					returns: "",
					deprecated: "",
					validity: "",
					descriptions: [],
					lastDescriptionIndex: -1,
					params: [],
					example: "",
					returnsDescription: "",
				});
				continue;
			}
			let lastSignature = c.signatures[c.signatures.length - 1];
			// returns
			if (childNode.childNodes.length > 0 && childNode.childNodes[0].localName as string == "em" && childNode.childNodes[0].textContent == "returns") {
				let returns = childNode.textContent.replace("returns ", "");
				lastSignature.returns = returns;
				continue;
			}
			// deprecated
			if (childNode.childNodes.length > 0 && childNode.childNodes[0].localName as string == "b" && (childNode.childNodes[0].textContent as string).indexOf("DEPRECATED ") == 0) {
				let deprecated = childNode.childNodes[childNode.childNodes.length - 1].textContent as string;
				deprecated = deprecated.replace("DEPRECATED ", "");
				lastSignature.deprecated = deprecated;
				continue;
			}
			// validity
			if (childNode.childNodes.length > 0 && childNode.childNodes[0].localName as string == "b" && childNode.childNodes[0].textContent == "validity") {
				let validity = childNode.childNodes[childNode.childNodes.length - 1].textContent as string;
				validity = validity.substring(1);
				lastSignature.validity = validity;
				continue;
			}
			if (childNode.childNodes.length > 0 && childNode.childNodes[0].localName == undefined && childNode.localName as string == "p") {
				// description start
				if (lastSignature.lastDescriptionIndex == -1) {
					lastSignature.descriptions.push(childNode.textContent);
					lastSignature.lastDescriptionIndex = j;
				}
				// params start
				else if (childNode.textContent.indexOf(" - ") >= 0) {
					let pStrs = childNode.textContent.split(" - ");
					lastSignature.params.push({
						name: pStrs[0],
						descriptions: pStrs.length > 0 ? [pStrs[1]] : [],
					});
					for (let k = j + 1; k < content.childNodes.length; k++) {
						let nextChildNode = content.childNodes[k];
						if (nextChildNode.localName == undefined) {
							continue;
						}
						if (nextChildNode.childNodes.length == 1 && nextChildNode.childNodes[0].localName == undefined && nextChildNode.localName as string == "p" && nextChildNode.textContent && nextChildNode.textContent.indexOf(" - ") == -1) {
							lastSignature.params[lastSignature.params.length - 1].descriptions.push(nextChildNode.textContent);
							j++
							continue;
						}
						break;
					}
				}
				else if (j - lastSignature.lastDescriptionIndex == 2) {
					lastSignature.descriptions.push(childNode.textContent);
					lastSignature.lastDescriptionIndex = j;
				}
				continue;
			}
			// returns description
			if (childNode.childNodes.length > 0 && childNode.childNodes[0].localName as string == "b" && childNode.childNodes[0].textContent == "returns") {
				lastSignature.returnsDescription = content.childNodes[j + 2].textContent as string;
				j += 2;
				continue;
			}
			// example
			if (childNode.localName == "pre" && !!childNode.attributes.getNamedItem("code-brush")) {
				lastSignature.example = childNode.textContent;
				continue;
			}
		}
		handleData(c);
	}
}
function handleData(data: IClassInfo) {
	if (!fs.existsSync(outPath)) {
		fs.mkdirSync(outPath);
	}
	if (data.folder) {
		if (!fs.existsSync(outPath + data.folder + "/")) {
			fs.mkdirSync(outPath + data.folder + "/");
		}
	}

	let dts = "";
	let level = 0;
	dts += createDes(data.descriptions, level);
	dts += getLevelSpace(level) + "interface " + data.name + " {\n";
	level++; {
		for (let i = 0; i < data.signatures.length; i++) {
			let signature = data.signatures[i];
			if (signature.deprecated) {
				signature.descriptions.push("@deprecated " + signature.deprecated);
			}
			if (signature.validity) {
				signature.descriptions.push("@validity " + signature.validity);
			}
			signature.params.forEach(param => {
				signature.descriptions.push("@param " + param.name + " " + param.descriptions[0]);
				for (let j = 1; j < param.descriptions.length; j++) {
					signature.descriptions.push(param.descriptions[j]);
				}
			});
			if (signature.returnsDescription) {
				signature.descriptions.push("@returns " + signature.returnsDescription);
			}
			if (signature.example) {
				signature.descriptions.push("@example " + signature.example);
			}
			dts += createDes(signature.descriptions, level);
			dts += getLevelSpace(level) + signature.text + ": " + signature.returns + "\n"
		}
	} level--;
	dts += getLevelSpace(level) + "}\n";

	let path = outPath + (data.folder ? data.folder + "/" : "") + data.name + ".d.ts";
	console.log(path);
	fs.writeFileSync(path, dts);
}
function createDes(dess: string[], level: number) {
	if (dess.length == 0) {
		return "";
	}
	let des = getLevelSpace(level) + "/**\n";
	for (let i = 0; i < dess.length; i++) {
		des += getLevelSpace(level) + " * " + dess[i] + "\n";
	}
	des += getLevelSpace(level) + " */\n"
	return des;
}
function getLevelSpace(level: number) {
	let space = "";
	while (level > 0) {
		level--;
		space += "    ";
	}
	return space;
}

main();
