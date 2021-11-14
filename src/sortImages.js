// based on
// http://codeincomplete.com/posts/2011/5/7/bin_packing/example/
// https://github.com/gopherwood/spritesheet.js/blob/master/lib/sorter/sorter.js

const sorters = {
  width(a, b) { return b.width - a.width; },
  height(a, b) { return b.height - a.height; },
  max(a, b) { return Math.max(b.width, b.height) - Math.max(a.width, a.height); },
  min(a, b) { return Math.min(b.width, b.height) - Math.min(a.width, a.height); },
};

const sortByMultipleCriteria = (a, b, criteria) => {
  for (let i = 0; i < criteria.length; i += 1) {
    const diff = sorters[criteria[i]](a, b);
    if (diff !== 0) return diff;
  }
  return 0;
};

module.exports = function sortImages(images) {
  images.sort((a, b) => sortByMultipleCriteria(a, b, ['max', 'min', 'height', 'width']));
};
