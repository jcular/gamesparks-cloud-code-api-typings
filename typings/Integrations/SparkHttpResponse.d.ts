/**
 * Represents the response form the HTTP call.
 * e.g.
 * var headers = response.getHeaders();
 */
interface SparkHttpResponse {
    /**
     * Returns the headers from the response.
     * @returns A JSON object containing the headers
     * @example var headers = response.getHeaders();
     */
    getHeaders(): JSON
    /**
     * Returns values for 'Set-Cookie' headers in the response.
     * @returns A JSON array containing values of the Set-Cookie headers
     * @example var cookies = response.getCookies();
     */
    getCookies(): JSON
    /**
     * Returns the response code.
     * e.g. 200
     * @returns the HTTP status code
     * @example var statusCode = response.getResponseCode();
     */
    getResponseCode(): number
    /**
     * Returns the body from the response.
     * @returns A string representing the body of the response.
     * @example var body = response.getResponseString();
     */
    getResponseString(): string
    /**
     * Returns the body from the response as XML.
     * @returns An XML object representing the body of the response.
     * @example var body = response.getResponseXml();
     */
    getResponseXml(): JSON
    /**
     * Returns the body from the response as JSON.
     * @returns A JSON object representing the body of the response.
     * @example var body = response.getResponseJson();
     */
    getResponseJson(): JSON
}
