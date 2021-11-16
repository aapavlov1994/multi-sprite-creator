# multi-sprite-creator

Tool for creating sprites with width and height limitation

### Usage

`npm i multi-sprite-creator`

```javascript
const { create, calculate } = require('multi-sprite-creator');

const options = {
  scale: 0.7, // scale of assets
  padding: 1, // padding between images
  maxHeight: 500, // sprite height limit
  maxWidth: 500, // sprite width limit
};

// use array of paths
const imagesCollection = [
  'pathTo/img1.png',
  'pathTo/img2.png',
];
// or array of node buffers
const imagesCollection = [
  Buffer1,
  Buffer2,
];
// or collection of paths
const imagesCollection = {
  img1Name: 'pathTo/img1.png',
  img2Name: 'pathTo/img2.png',
};
// or collection of node buffers
const imagesCollection = {
  img1Name: Buffer1,
  img2Name: Buffer2,
};

// use this function if you want caclulate and create spritesheets
create(imagesCollection, options)
  .then((sprites) => {
    console.log(sprites); // sprites array
    sprites.forEach((sprite) => {
      console.log(sprite.width); // result width (<= maxWidth)
      console.log(sprite.height); // result height (<= maxHeight)
      console.log(sprite.map); // images coordinates, sizes, keys or imageNames
      console.log(sprite.image); // buffer ready to write
    });
  });

// use this function if you want only caclulate sprites maps (atlases)
calculate(imagesCollection, options)
  .then((atlases) => {
    console.log(atlases); // atlases array
    atlases.forEach((atlas) => {
      console.log(atlas.width); // result width (<= maxWidth)
      console.log(atlas.height); // result height (<= maxHeight)
      console.log(atlas.files); // images coordinates, sizes,  keys or imageNames, buffers
    });
  });
```
