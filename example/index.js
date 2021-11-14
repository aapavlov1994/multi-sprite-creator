const fs = require('fs');
const path = require('path');
const { create: createSprites } = require('../src');

const dir = path.resolve('./assets');
const output = path.resolve('./output');
const images = fs.readdirSync(dir).map((img) => path.join(dir, img));

if (fs.existsSync(output)) {
  fs.readdirSync(output).forEach((img) => {
    fs.unlinkSync(path.resolve(output, img));
  });
} else fs.mkdirSync(output);

const options = {
  scale: 0.7,
  padding: 1,
  maxHeight: 500,
  maxWidth: 500,
};

createSprites(images, options)
  .then((sprites) => {
    sprites.forEach((sprite, index) => {
      const spritePath = path.resolve(output, `sprite${index}.png`);
      fs.writeFileSync(spritePath, sprite.image, { encoding: 'utf8' });
      const mapJSON = JSON.stringify(sprite.map);
      fs.writeFileSync(path.resolve(output, `map${index}.json`), mapJSON, { encoding: 'utf8' });
    });
    console.log('Sprites and maps created successfully.');
  });
