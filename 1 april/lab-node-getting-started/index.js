class SortedList {
  constructor() {
    this.items = [];
    this.length = 0;
  }
  add(x) {
    this.items.push(x);
    this.length++;
    this.items.sort((a, b) => a - b);
  }
  get(idx) {
    if (idx >= this.length) throw new Error("OutOfBounds");
    return this.items[idx];
  }
  max() {
    if (this.length === 0) throw new Error("EmptySortedList");
    return Math.max(...this.items);
  }
  min() {
    if (this.length === 0) throw new Error("EmptySortedList");
    return Math.min(...this.items);
  }
  avg() {
    if (this.length === 0) throw new Error("EmptySortedList");
    return this.sum() / this.length;
  }

  sum() {
    let sum = 0;
    for (let i = 0; i < this.length; i++) {
      sum += this.items[i];
    }
    return sum;
  }
}

module.exports = SortedList;
