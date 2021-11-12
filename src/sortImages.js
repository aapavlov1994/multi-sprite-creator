// based on
// http://codeincomplete.com/posts/2011/5/7/bin_packing/example/
// https://github.com/gopherwood/spritesheet.js/blob/master/lib/sorter/sorter.js

const sorters = {
  w(a, b) { return b.w - a.w; },
  h(a, b) { return b.h - a.h; },
  max(a, b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h); },
  min(a, b) { return Math.min(b.w, b.h) - Math.min(a.w, a.h); },
};

const sortByMultipleCriteria = (a, b, criteria) => {
  for (let i = 0; i < criteria.length; i += 1) {
    const diff = sorters[criteria[i]](a, b);
    if (diff !== 0) return diff;
  }
  return 0;
};

module.exports = function sortImages(images) {
  images.sort((a, b) => sortByMultipleCriteria(a, b, ['max', 'min', 'h', 'w']));
};
