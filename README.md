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

// use this function if you want caclulate and create spritesheets
create(imagesPaths, options)
  .then((sprites) => {
    console.log(sprites); // sprites array
    sprites.forEach((sprite) => {
      console.log(sprite.width); // result width (<= maxWidth)
      console.log(sprite.height); // result height (<= maxHeight)
      console.log(sprite.map); // images coordinates, sizes, paths
      console.log(sprite.image); // buffer ready to write
    });
  });

// use this function if you want only caclulate sprites maps (atlases)
calculate(imagesPaths, options)
  .then((atlases) => {
    console.log(atlases); // atlases array
    atlases.forEach((atlas) => {
      console.log(atlas.width); // result width (<= maxWidth)
      console.log(atlas.height); // result height (<= maxHeight)
      console.log(atlas.files); // images coordinates, sizes, paths, buffers
    });
  });
```
