/**
 * @typedef { Object } SpriteImageProps
 * @property { number } SpriteImageProps.width
 * @property { number } SpriteImageProps.height
 * @property { string } SpriteImageProps.path
 * @property { number } SpriteImageProps.x
 * @property { number } SpriteImageProps.y
 */

/**
 * @class
 * @typedef { Sprite }
 * @property { number } width - width of sprite
 * @property { number } height - height of sprite
 * @property { SpriteImageProps[] } map - list of images properties
 * @property { buffer } image - buffer ready for writing
 */
module.exports = class Sprite {
  /**
   * @constructor
   * @param {Atlas} atlas - instance of Atlas
   * @param {buffer} image - ready for writing buffer
   */
  constructor(atlas, image) {
    const { width, height, files } = atlas;
    const map = files.map((file) => ({
      width: file.width, height: file.height, path: file.path, x: file.x, y: file.y,
    }));
    this.width = width;
    this.height = height;
    this.map = map;
    this.image = image;
  }
};
