/// <reference path="./references.d.ts" />
/// <reference path="./patches.ts" />

declare type date = any;
declare type XMLObject = any;
declare type SparkPendingMatch = any;
declare type ScriptableObject = any;
declare type List = any[];

declare const Spark: Spark;

declare namespace SparkRequests {

    export class AcceptChallengeRequest  {

        public challengeInstanceId : string;
        public message : string;
        // tslint:disable-next-line:no-empty
        public SendAs(playerId : string) : any;
        // tslint:disable-next-line:no-empty
    }

    // tslint:disable-next-line: max-classes-per-file
    export class SteamConnectRequest  {

        public action : string;
        public matchShortCode : string;
        public skill : number;
        public sessionTicket : any;
        public matchData : any;
        // tslint:disable-next-line:no-empty
        public Send() : any;
        // tslint:disable-next-line:no-empty
        public SendAs(playerId : string) : any;
    }

    // tslint:disable-next-line: max-classes-per-file
    export class MatchmakingRequest  {

        public action : String;
        public matchShortCode : string;
        public skill : number;
        public matchData : any;
        // tslint:disable-next-line:no-empty
        public Send() : any;
        // tslint:disable-next-line:no-empty
        public SendAs(playerId : string) : any;
    }

    // tslint:disable-next-line: max-classes-per-file
    export class LogChallengeEventRequest  {
        public challengeInstanceId : string;
        public eventKey : string;
        // tslint:disable-next-line:no-empty
        public Send() : any;
        // tslint:disable-next-line:no-empty
        public SendAs(playerId : string) : any;
        public ExecuteAs(playerId : string) : any;

    }

    // tslint:disable-next-line: max-classes-per-file
    export class CreateChallengeRequest  {

        public accessType : string;
        public challengeShortCode : string;
        public endTime : string;
        public expiryTime : string;
        public usersToChallenge : any;
        // tslint:disable-next-line:no-empty
        public Execute() : any;
        // tslint:disable-next-line:no-empty
    }

    // tslint:disable-next-line: max-classes-per-file
    export class ChangeUserDetailsRequest  {

        public challengeInstanceId : string;
        public displayName : string;
        // tslint:disable-next-line:no-empty
        public SendAs(playerId : string) : any;
        // tslint:disable-next-line:no-empty
        public Send() : any;
    }

}
