/**
 * Provides read only access to a mongo collection.
 * e.g.
 * var myMetaCollection = Spark.metaCollection('metatest');
 */
interface SparkMongoCollectionReadOnly {
    /**
     * Returns the number of documents in this collection
     * @returns the number of documents
     * @example var count = myMetaCollection.count();
     */
    count(): number
    /**
     * Returns the number of documents that match the supplied query
     * @returns the number of documents
     * @example var count = Spark.metaCollection('metatest').count({"metafield" : "metavalue"});
     */
    count(query: JSON): number
    /**
     * Returns a list of distinct values for the given key in the collection
     * @param key the key to use in the query
     * @returns an object array
     * @example var keys = Spark.metaCollection('metatest').distinct("metafield");
     */
    distinct(key: string): JSON
    /**
     * Returns a list of distinct values for the given key in the collection that match the supplied query
     * @param key the key to use in the query
     * @param query the Mongo query
     * @returns an object array
     * @example var keys = Spark.metaCollection('metatest').distinct("metafield", {"metafield1":{"$gte" : 5}});
     */
    distinct(key: string, query: JSON): JSON
    /**
     * Drops or removes the specified index from a collection.
     * @param keys the index definition used in ensureIndex.
     * @example Spark.metaCollection('metatest').dropIndex({"metafield" : 1});
     */
    dropIndex(keys: JSON): void
    /**
     * Drops or removes the specified index from a collection.
     * @param name the name of the index to drop.
     * @example Spark.metaCollection('metatest').dropIndexByName("myIndex");
     */
    dropIndexByName(name: string): void
    /**
     * Creates an index on the specified fields if the index does not already exist.
     * @param keys the index definition used in ensureIndex.
     * @example Spark.metaCollection('metatest').ensureIndex({"metafield" : 1, "metafield1" : 1});
     */
    ensureIndex(keys: JSON): void
    /**
     * Creates an index on the specified fields if the index does not already exist.
     * @param keys the index definition used in ensureIndex.
     * @param optionsIN index options
     * @example Spark.metaCollection('metatest').ensureIndex({"metafield" : 1, "metafield1" : 1}, {"name":"myIndex"});
     */
    ensureIndex(keys: JSON, optionsIN: JSON): void
    /**
     * Returns a SparkMongoCursor of all documents in this collection
     * @example var results = Spark.metaCollection('metatest').find();
     */
    find(): SparkMongoCursor
    /**
     * Returns a SparkMongoCursor of all documents in this collection that match the supplied query
     * @param query a Mongo query
     * @example var results = Spark.metaCollection('metatest').find({"metatest1" : {"$gt" : 1}});
     */
    find(query: JSON): SparkMongoCursor
    /**
     * Returns a SparkMongoCursor of all documents in this collection that match the supplied query.
     * The returned documents only contain the fields supplied in the fieldsToReturn parameter. This reduces the document size when being returned.
     * @param query  a Mongo query
     * @param fields the fields to return
     * @example var results = Spark.metaCollection('metatest').find({"metatest1" : {"$gt" : 1}}, {"metatest" : 1});
     */
    find(query: JSON, fields: JSON): SparkMongoCursor
    /**
     * Returns the first document from the collection according to natural order (which reflects the order of documents on the disk)
     * @returns A JSON object
     * @example var results = Spark.metaCollection('metatest').findOne();
     */
    findOne(): JSON
    /**
     * Returns one document that satisfies the specified query criteria.
     * If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk.
     * @param query a Mongo query
     * @example var result = Spark.metaCollection('metatest').findOne({"metatest1" : {"$gt" : 1}}
     */
    findOne(query: JSON): JSON
    /**
     * Returns one document that satisfies the specified query criteria.
     * If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk.
     * The returned documents only contain the fields supplied in the fieldsToReturn parameter. This reduces the document size when being returned.
     * @param query a Mongo query
     * @param fields the fields to return
     * @example var result = Spark.metaCollection('metatest').findOne({"metatest1" : {"$gt" : 1}}, {"metatest" : 1});
     */
    findOne(query: JSON, fields: JSON): JSON
    /**
     * Returns one document that satisfies the specified query criteria.
     * If multiple documents satisfy the query, this method returns the first document according to the natural order which reflects the order of documents on the disk.
     * The returned documents only contain the fields supplied in the fieldsToReturn parameter. This reduces the document size when being returned.
     * @param query a Mongo query
     * @param fields the fields to return
     * @param orderBy the order clause
     * @example var result = Spark.metaCollection('metatest').findOne({"metatest1" : {"$gt" : 1}}, {"metatest" : 1});
     */
    findOne(query: JSON, fields: JSON, orderBy: JSON): JSON
    aggregate(firstOp: JSON, additionalOps: JSON[]): JSON
    /**
     * Return a list of the indexes for this collection. Each object in the list is the "info document" from MongoDB
     * @returns list of index documents
     * @example var indexes = Spark.metaCollection('metatest').getIndexInfo();
     */
    getIndexInfo(): JSON
    /**
     * Gets the error (if there is one) from the previous operation on this connection.
     * @returns a JSON object with error and status information
     * @example var errors = Spark.metaCollection('metatest').getLastError();
     */
    getLastError(): JSON
}
