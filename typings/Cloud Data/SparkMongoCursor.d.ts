/**
 * An iterator over database results. Doing a find() query on a collection returns a SparkMongoCursor thus:
 * var cursor = collection.find( query );if( cursor.hasNext() ) {var obj = cursor.next();}
 */
interface SparkMongoCursor {
    /**
     * Limits the number of elements returned.
     * @param count the limit to set
     * @example var cursor = collection.find( query ).skip( 1000 ).limit( 100 );
     */
    limit(count: number): SparkMongoCursor
    /**
     * Discards a given number of elements at the beginning of the cursor.
     * @param count the limit to set
     * @example var cursor = collection.find( query ).skip( 1000 ).limit( 100 );
     */
    skip(count: number): SparkMongoCursor
    /**
     * Counts the number of objects matching the query this does take limit/skip into consideration.
     * @example var size = collection.find( query ).size();
     */
    size(): number
    /**
     * Counts the number of objects matching the query this does take limit/skip into consideration.
     * @example var count = collection.find( query ).count();
     */
    count(): number
    /**
     * Sorts this cursor's elements. This method must be called before getting any object from the cursor.
     * @example var cursor = collection.find( query ).sort( {"field" : 1} ).limit( 100 )
     */
    sort(orderBy: JSON): SparkMongoCursor
    /**
     * Checks if there is another object available.
     * @example var cursor = collection.find( query ); if( cursor.hasNext() ) {var obj = cursor.next();}
     */
    hasNext(): boolean
    /**
     * Returns the object the cursor is at and moves the cursor ahead by one.
     * @returns a JSON object
     * @example var cursor = collection.find( query ); if( cursor.hasNext() ) {var obj = cursor.next();}
     */
    next(): JSON
    /**
     * Returns the element the cursor is at.
     * @returns a JSON object
     * @example var cursor = collection.find( query ); if( cursor.hasNext() ) {cursor.next(); var obj = cursor.curr();}
     */
    curr(): JSON
}
