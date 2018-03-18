/**
 * An iterator over database results. Performing a queryItems() SparkDataCursor thus:
 * var cursor = api.queryItems( query );if( cursor.hasNext() ) {var obj = cursor.next();}
 */
interface SparkDataCursor {
    /**
     * Checks if there is another object available.
     */
    hasNext(): boolean
    /**
     * Returns the object the cursor is at and moves the cursor ahead by one.
     */
    next(): SparkDataItem
}
