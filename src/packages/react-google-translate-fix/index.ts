/**
 * https://github.com/facebook/react/issues/11538
 * https://bugs.chromium.org/p/chromium/issues/detail?id=872770
 */
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function<T extends Node>(oldChild: T): T {
    if (oldChild.parentNode !== this) {
      if (console) {
        console.error('Cannot remove a child from a different parent', oldChild, this);
      }
      return oldChild;
    }
    return originalRemoveChild.call(this, oldChild) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function<T extends Node>(newChild: T, refChild: Node | null): T {
    if (refChild && refChild.parentNode !== this) {
      if (console) {
        console.error(
          'Cannot insert before a reference node from a different parent',
          refChild,
          this
        );
      }
      return newChild;
    }
    return originalInsertBefore.call(this, newChild, refChild) as T;
  };
}

export {};
