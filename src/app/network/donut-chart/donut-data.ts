/**
 * Donut is an interface which describes an item that could be used for donut chart statistics.
 *
 * @export
 * @interface DonutData
 */
export interface DonutData {
  /**
   * Tag name like #awesomejs
   *
   * @type {string}
   * @memberof Tag
   */
  getName: () => string;

  /**
   * Frequency is an aggregated frequency for the whole network
   *
   * @type {number}
   * @memberof Tag
   */
  getFreq: () => number;
}
