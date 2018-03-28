import { HashTable } from '../data-structures/hash-table';

test("HashTable should exist 'lion'", () => {
  let ht = new HashTable();
  ht.add('cat', 'KisKist');
  ht.add('dog', 'GavGav');
  ht.add('lion', 'RRR');
  expect(ht.lookup('lion')).toBe('RRR');
});
