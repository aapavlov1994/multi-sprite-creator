const fs = require('fs');
const path = require('path');
const expectedOutput = require('./expectedOutput');
const { create } = require('../../src');

const dir = path.resolve('./example/assets');
const images = fs.readdirSync(dir).map((img) => path.join(dir, img));

const options = {
  scale: 0.7,
  padding: 1,
  maxHeight: 500,
  maxWidth: 500,
};

create(images, options)
  .then((sprites) => {
    const result = sprites.every((sprite, index) => {
      const { map } = sprite;
      const testedRes = JSON.stringify(map);
      const exp = JSON.stringify(expectedOutput[index]);
      return testedRes === exp;
    });
    if (result) console.log('Test passed.');
    else throw new Error('Test failed.');
  });
