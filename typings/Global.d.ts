declare type date = any;
declare type XMLObject = any;
declare type SparkPendingMatch = any;
declare type ScriptableObject = any;
declare type List = any[];
declare type Json = any;

declare let Spark: Spark;

interface Spark {
    runtimeCollection(collectionName: string): SparkMongoCollectionReadWrite
}
