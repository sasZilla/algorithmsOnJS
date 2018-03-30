import { Trie } from '../data-structures/trie';

test("Trie should keem supply only words: MANY MY LIE A", () => {
  let trie = new Trie();
  trie.add('A');
  trie.add('MANY');
  trie.add('LIE');
  trie.add('MY');
  expect(trie.isWord('')).toBe(false);
  expect(trie.isWord('AA')).toBe(false);
  expect(trie.isWord('MAANY')).toBe(false);
  expect(trie.isWord('MANY')).toBe(true);
  expect(trie.isWord('LIE')).toBe(true);
  expect(trie.isWord('A')).toBe(true);
  expect(trie.isWord('MY')).toBe(true);
});
