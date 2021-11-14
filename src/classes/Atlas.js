/**
 * @class
 * @typedef { Atlas }
 * @property { AtlasImage[] } files
 * @property { number } width - atlas width
 * @property { number } height - atlas height
 */
module.exports = class Atlas {
  /**
   * @constructor
   * @param {GrowingPacker} packer - instance of GrowingPacker
   */
  constructor(packer) {
    this.files = [];
    this.width = packer.root.width;
    this.height = packer.root.height;
  }

  addImage(image) {
    this.files.push(image);
  }
};
