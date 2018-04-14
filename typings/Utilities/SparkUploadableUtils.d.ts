/**
 * Provides utility methods to create and retrieve Uploadables.
 * e.g.
 * var uploadableUtils = Spark.getUploadableUtils();
 */
interface SparkUploadableUtils {
    /**
     * Uploads String data as an Uploadable
     * @validity All Scripts
     * @returns The uploadId if the upload was successful, or null otherwise
     */
    uploadString(stringData: string, player: SparkPlayer, fileName: string, metaData: JSON): string
    /**
     * Returns a previously uploaded String, or null otherwise
     * @validity All Scripts
     */
    retrieveString(uploadId: string): string
}
