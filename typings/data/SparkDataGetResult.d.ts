/**
 * The result of a data api method
 */
interface SparkDataGetResult {
    /**
     * The document returned from the get method
     */
    document(): SparkDataItem
    /**
     * The error message, if an error occurred
     */
    error(): string
}
