/*
  Heap Data Structures
  MinHeap(min element at the top), MaxHeap(max element at the top)
*/

export class MinHeap {
  constructor() {
    this.capacity = 10;
    this.size = 0;
    this.heap = new Array(this.capacity);
  }

  getLeftChildIndex(parentIndex) { return parentIndex * 2 + 1; }
  getRightChildIndex(parentIndex) { return parentIndex * 2 + 2; }
  getParentIndex(childIndex) { return Math.floor((childIndex - 1) / 2); }

  hasLeftChild(index) { return this.getLeftChildIndex(index) < this.size; }
  hasRightChild(index) { return this.getRightChildIndex(index) < this.size; }
  hasParent(index) { return this.getParentIndex(index) >= 0; }

  getLeftChild(index) { return this.heap[this.getLeftChildIndex(index)]; }
  getRightChild(index) { return this.heap[this.getRightChildIndex(index)]; }
  getParent(index) { return this.heap[this.getParentIndex(index)]; }

  swap(indexOne, indexTwo) {
    const copy = this.heap[indexOne];
    this.heap[indexOne] = this.heap[indexTwo];
    this.heap[indexTwo] = copy;
  }

  ensureExtraCapacity() {
    if (this.size === this.capacity) {
      this.capacity *= 2;
      let doubleHeap = new Array(this.capacity);
      this.heap = doubleHeap.splice(0, 0, ...this.heap);
    }
  }

  peek() {
    if (this.size === 0) {
      console.log(this);
      // throw new Error('Heap is empty');
    }
    return this.heap[0];
  }

  poll() {
    if (this.size === 0) {
      // throw new Error('Heap is empty');
      console.log(this);
    }
    const minItem = this.heap[0];
    this.heap[0] = this.heap[this.size-1];
    this.size--; // or this.heap = this.heap.slice(0, this.size);
    this.heapifyDown();
    return minItem;
  }

  add(item) {
    this.ensureExtraCapacity();
    this.heap[this.size] = item;
    this.size++;
    this.heapifyUp();
  }

  // bubble last index(just added element) to the top
  heapifyUp() {
    let index = this.size - 1;
    while (this.hasParent(index) && this.getParent(index) > this.heap[index]) {
      let parentIndex = this.getParentIndex(index);
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapifyDown() {
    // zero element is the last now,
    // and we need to bubble it Down
    // compare with left and right children
    // select min
    let index = 0;
    while (this.hasLeftChild(index)) {
      let smallestChildIndex = this.getLeftChildIndex(index);
      if (this.hasRightChild(index) && this.getRightChild(index) < this.getLeftChild(index)) {
        smallestChildIndex = this.getRightChildIndex();
      }

      if (this.heap[index] >= this.heap[smallestChildIndex]) {
        this.swap(index, smallestChildIndex);
      } else {
        break;
      }

      index = smallestChildIndex;
    }
  }
}
