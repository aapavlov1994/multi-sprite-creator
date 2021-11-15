const Pixelsmith = require('pixelsmith');
const Vinyl = require('vinyl');
const concat = require('concat-stream');
const through2 = require('through2');
const Sprite = require('./classes/Sprite');

/**
 * @param { Atlas }atlas
 * @returns {Promise<Sprite>}
 */
const getSprite = (atlas) => (
  new Promise((resolve) => {
    const { width, height, files } = atlas;
    const vinyls = files.map(({ buffer, path }) => new Vinyl({ contents: buffer, path }));

    const pixelsmith = new Pixelsmith();
    pixelsmith.createImages(vinyls, (err, images) => {
      const canvas = pixelsmith.createCanvas(width, height);
      images.forEach((image, index) => {
        const { x, y } = files[index];
        canvas.addImage(image, x, y);
      });
      const imageStream = through2();
      const exportStream = canvas.export({ format: 'png' });
      exportStream.pipe(imageStream);
      imageStream.pipe(concat({ encoding: 'buffer' }, (image) => {
        resolve(new Sprite(atlas, image));
      }));
    });
  })
);

/**
 * @param {Atlas[]} atlases
 * @returns {Promise<Sprite[]>}
 */
module.exports = function getSpritesData(atlases) {
  return Promise.all(atlases.map((atlas) => getSprite(atlas)));
};
