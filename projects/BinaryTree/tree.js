function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function () {
  if (this.root != null) {
    this.root.visit(this.root);
  }
};

Tree.prototype.search = function (val) {
  return this.root.search(val);
};

Tree.prototype.addValue = function (val) {
  var n = new Node(val);

  if (this.root == null) {
    this.root = n;
  } else {
    this.root.addNode(n);
  }
};

Tree.prototype.layout = function () {
  var spacingX = 50;
  var spacingY = 60;
  var margin = 30;
  var index = 0;
  var maxDepth = 0;

  function position(node, depth) {
    if (node == null) return;

    position(node.left, depth + 1);

    node.x = margin + index * spacingX;
    node.y = margin + depth * spacingY;

    index++;
    maxDepth = Math.max(maxDepth, depth);

    position(node.right, depth + 1);
  }

  position(this.root, 0);

  return {
    width: Math.max(640, index * spacingX + margin * 2),
    height: Math.max(360, maxDepth * spacingY + 100)
  };
};
