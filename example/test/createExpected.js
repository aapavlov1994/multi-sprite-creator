const fs = require('fs');
const path = require('path');

const outputPath = require.resolve('./expectedOutput');
const { create } = require('../../src');

const dir = path.resolve('../assets');
const images = fs.readdirSync(dir).map((img) => path.join(dir, img));

const options = {
  scale: 0.7,
  padding: 1,
  maxHeight: 500,
  maxWidth: 500,
};

const init = '/* eslint-disable */\nmodule.exports = [';

create(images, options).then((sprites) => {
  let output = sprites.reduce((acc, { map }) => (
    `${acc}\n${JSON.stringify(map)},`
  ), init);
  output = `${output}\n];`;
  fs.writeFileSync(outputPath, output);
});
