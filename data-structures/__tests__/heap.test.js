import { MinHeap } from '../heap';

describe('Heap Data Structure', () => {
  let heap = new MinHeap();
  heap.add(5);
  heap.add(2);
  heap.add(3);
  heap.add(4);

  test('Add Element 1(min) to heap', () => {
    heap.add(1);
    expect(heap.size).toBe(5);
  });

  test('Peek Min from heap', () => {
    expect(heap.peek()).toBe(1);
    expect(heap.size).toBe(5);
  });

  test('Poll Min from heap', () => {
    expect(heap.poll()).toBe(1);
    expect(heap.size).toBe(4);
  });
});
