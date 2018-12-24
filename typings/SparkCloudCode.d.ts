declare type date = any;
declare type XMLObject = any;
declare type SparkPendingMatch = any;
declare type ScriptableObject = any;
declare type List = any[];

declare const Spark: Spark;

interface Spark {
    /**
     * Gets a runtimedata collection by name, this collection is read write access and can be queried using the methods defined in the SparkMongoCollectionReadWrite object.
     * @validity All Scripts
     * @param collectionName the name of the collection you wish to access
     * @example var myRuntimeCollection = Spark.runtimeCollection("runtimetest");
     * @deprecated use [Game Data Service](https://docs.gamesparks.com/documentation/configurator/game-data.html)
     */
    runtimeCollection(collectionName: string): SparkMongoCollectionReadWrite
}
