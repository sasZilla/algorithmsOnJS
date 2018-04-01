export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedList {
  constructor(value) {
    this.head = value ? new Node(value) : null;
  }

  append(value) {
    const node = new Node(value);

    if (this.head === null) {
      this.head = node;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }

  prepend(value) {
    const node = new Node(value);
    node.next = this.head;
    this.head = node;
  }

  deleteWithValue(value) {
    if (this.head === null) {
      return;
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next !== null) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  }
}
