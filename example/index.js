const fs = require('fs');
const path = require('path');
const getSprites = require('../src');

const dir = path.resolve('./assets');
const output = path.resolve('./output');
const images = fs.readdirSync(dir).map((img) => path.join(dir, img));

if (fs.existsSync(output)) {
  fs.readdirSync(output).forEach((img) => {
    fs.unlinkSync(path.resolve(output, img));
  });
} else fs.mkdirSync(output);

const options = {
  scale: 1,
  maxWidth: 500,
  maxHeight: 500,
};

getSprites(images, options)
  .then((sprites) => {
    console.log(sprites);
    sprites.forEach((sprite, index) => {
      const writeStream = fs.createWriteStream(path.resolve(output, `sprite${index}.png`));
      sprite.data.pipe(writeStream);
    });
  });
