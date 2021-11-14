/**
 * @class
 * @typedef { AtlasImage }
 * @property { number } x
 * @property { number } y
 * @property { buffer } buffer
 * @property { string } path
 * @property { number } width
 * @property { number } height
 */
module.exports = class AtlasImage {
  /**
   * @constructor
   * @param { object } item
   * @param { number } item.width
   * @param { number } item.height
   * @param { string } item.path
   * @param { buffer } item.buffer
   * @param { object } item.fit
   * @param { number } item.fit.x
   * @param { number } item.fit.y
   * @param { number } padding
   */
  constructor(item, padding) {
    const {
      width, height, path, buffer,
    } = item;
    const { x, y } = item.fit;
    this.x = x;
    this.y = y;
    this.buffer = buffer;
    this.path = path;
    this.width = width - 2 * padding;
    this.height = height - 2 * padding;
  }
};
