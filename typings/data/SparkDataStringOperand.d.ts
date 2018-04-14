/**
 * A Condition builder for string values
 */
interface SparkDataStringOperand {
    /**
     * Between values
     */
    between(low: JSON, high: JSON): SparkDataCondition
    /**
     * Equal to
     */
    eq(value: JSON): SparkDataCondition
    /**
     * Greater than
     */
    gt(value: JSON): SparkDataCondition
    /**
     * Equal to any item in the supplied values
     */
    in(values: string[]): SparkDataCondition
    /**
     * Less than
     */
    lt(value: JSON): SparkDataCondition
    /**
     * Not equal to
     */
    ne(value: JSON): SparkDataCondition
    /**
     * Starts with
     */
    startsWith(value: string): SparkDataCondition
}
