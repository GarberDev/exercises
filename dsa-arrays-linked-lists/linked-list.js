class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  push(val) {
    let newNode = new Node(val);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  unshift(val) {
    let newNode = new Node(val);

    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    if (this.length === 0) this.tail = this.head;
    this.length += 1;
  }

  pop() {
    return this.removeAt(this.length - 1);
  }

  shift() {
    return this.removeAt(0);
  }

  getAt(idx) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Index error");
    }

    let currentNode = this.head;
    let count = 0;

    while (count < idx) {
      currentNode = currentNode.next;
      count++;
    }

    return currentNode.val;
  }

  setAt(idx, val) {
    if (idx >= this.length || idx < 0) {
      throw new Error("Invalid index");
    }

    let currentNode = this.head;
    let count = 0;

    while (count < idx) {
      currentNode = currentNode.next;
      count++;
    }

    currentNode.val = val;
  }

  insertAt(idx, val) {
    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    let currentNode = this.head;
    let previousNode = null;
    let count = 0;

    while (currentNode && count < idx) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      count++;
    }

    if (previousNode) {
      const newNode = new Node(val);
      newNode.next = currentNode;
      previousNode.next = newNode;
      this.length++;
    }
  }

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error("Invalid index");
    }

    if (idx === 0) {
      const removedNode = this.head;
      this.head = this.head.next;

      if (!this.head) {
        this.tail = null;
      }

      this.length--;
      return removedNode.val;
    }

    let currentNode = this.head;
    let previousNode = null;
    let count = 0;

    while (count < idx) {
      previousNode = currentNode;
      currentNode = currentNode.next;
      count++;
    }

    previousNode.next = currentNode.next;

    if (!previousNode.next) {
      this.tail = previousNode;
    }

    this.length--;
    return currentNode.val;
  }

  average() {
    if (this.length === 0) return 0;

    let total = 0;
    let current = this.head;

    while (current) {
      total += current.val;
      current = current.next;
    }

    return total / this.length;
  }
}

module.exports = LinkedList;
