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

const endTask = (message, code) => {
  console.log(message);
  process.exit(code);
};

try {
  create(images, options)
    .then((sprites) => {
      const result = sprites.every((sprite, index) => {
        const { map } = sprite;
        const testedRes = JSON.stringify(map);
        const exp = JSON.stringify(expectedOutput[index]);
        if (testedRes === exp) return true;
        const indexFail = testedRes.split('').findIndex((el, i) => testedRes[i] !== exp[i]);
        console.log('real', testedRes.slice(0, indexFail + 1));
        console.log('expected', exp.slice(0, indexFail + 1));
        return false;
      });
      if (result) endTask('Test passed.', 0);
      else endTask('Test failed.', 1);
    });
} catch (e) {
  endTask('Test failed with error', 1);
}
