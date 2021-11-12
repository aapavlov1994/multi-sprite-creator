const Pixelsmith = require('pixelsmith');
const Vinyl = require('vinyl');

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
      resolve({
        width,
        height,
        map: atlas.files,
        data: canvas.export({ format: 'png' }),
      });
    });
  })
);

module.exports = function getSpritesData(atlases) {
  return Promise.all(atlases.map((atlas) => getSprite(atlas)));
};
