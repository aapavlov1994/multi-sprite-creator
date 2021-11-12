// based on
// https://github.com/gopherwood/node-bin-packing
// https://github.com/jsmarkus/node-bin-packing

module.exports = class GrowingPacker {
  constructor(width, height) {
    this.init(width, height);
  }

  init(w = Infinity, h = Infinity) {
    this.max = {
      x: 0, y: 0, w, h,
    };
    this.node = undefined;
  }

  size() {
    return { w: this.root.w, h: this.root.h };
  }

  overMaxSize(w, h) {
    return w > this.max.w || h > this.max.h;
  }

  fit(blocks) {
    let n; let block;
    const len = blocks.length;
    let w = len > 0 ? blocks[0].w : 0;
    let h = len > 0 ? blocks[0].h : 0;

    w = Math.min(w, this.max.w);
    h = Math.min(h, this.max.h);

    this.root = {
      x: 0, y: 0, w, h,
    };
    this.nofit = [];
    this.overmax = [];

    for (n = 0; n < len; n += 1) {
      block = blocks[n];
      this.node = this.findNode(this.root, block.w, block.h);
      if (this.node) block.fit = this.splitNode(block.w, block.h);
      else block.fit = this.growNode(block.w, block.h);

      if (!block.fit) {
        if (this.overMaxSize(block.w, block.h)) this.overmax.push(block);
        else this.nofit.push(block);
      }
    }
  }

  findNode(root, w, h) {
    if (root.used) return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    if ((w <= root.w) && (h <= root.h)) return root;
    return null;
  }

  splitNode(w, h) {
    const { node } = this;
    node.used = true;
    node.down = {
      x: node.x, y: node.y + h, w: node.w, h: node.h - h,
    };
    node.right = {
      x: node.x + w, y: node.y, w: node.w - w, h,
    };

    return node;
  }

  growNode(w, h) {
    // dont allow it to grow beyond the max
    const canGrowRight = (h <= this.root.h) && (this.root.w + w <= this.max.w);
    const canGrowDown = (w <= this.root.w) && (this.root.h + h <= this.max.h);
    // attempt to keep square-ish by growing right when height is much greater than width
    const shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w));
    // attempt to keep square-ish by growing down  when width  is much greater than height
    const shouldGrowDown = canGrowDown && (this.root.w >= (this.root.h + h));

    if (shouldGrowRight) return this.growRight(w, h);
    if (shouldGrowDown) return this.growDown(w, h);
    if (canGrowRight) return this.growRight(w, h);
    if (canGrowDown) return this.growDown(w, h);
    return null; // need to ensure sensible root starting size to avoid this happening
  }

  growRight(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: {
        x: this.root.w, y: 0, w, h: this.root.h,
      },
    };
    this.node = this.findNode(this.root, w, h);
    if (this.node) return this.splitNode(w, h);
    return null;
  }

  growDown(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down: {
        x: 0, y: this.root.h, w: this.root.w, h,
      },
      right: this.root,
    };
    this.node = this.findNode(this.root, w, h);
    if (this.node) return this.splitNode(w, h);
    return null;
  }
};
