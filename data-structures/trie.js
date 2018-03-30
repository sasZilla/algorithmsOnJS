/*
  Trie Data Structure
  Useful for example for dictionaries

          [root]
          / | \
         M  L  A
        / \ \   \
       A  Y  I   *
      /    \  \
     N     *   E
    /           \
   Y             *
  /
 *

Words: MANY MY LIE A
Check if word exist should be O(1)
*/

const END_WORD_SYMBOL = Symbol('*');

class Node {
  constructor(letter) {
    this.letter = letter;
    this.children = [];
  }

  findNextNodeByLetter(letter) {
    return this.children.find((n) => n.letter === letter);
  }

  findEndNode() {
    return this.children.find((n) => n.letter === END_WORD_SYMBOL)
  }
}

export class Trie {
  constructor() {
    this.root = new Node();
  }

  add(word) {
    let node = this.root;
    while (word.length > 0) {
      let letter = word.charAt(0);
      let nextNode = node.findNextNodeByLetter(letter);
      if (!nextNode) {
        nextNode = new Node(letter);
        node.children.push(nextNode);
      }
      node = nextNode;
      word = word.substr(1);
    }
    if (!node.findEndNode()) {
      node.children.push(new Node(END_WORD_SYMBOL));
    }
  }

  isWord(word) {
    let node = this.root;
    while (word.length) {
      let letter = word.charAt(0);
      let nextNode = node.findNextNodeByLetter(letter);
      if (!nextNode) {
        return false;
      }
      node = nextNode;
      word = word.substr(1);
    }
    if (node.findEndNode()) {
      return true;
    }
    return false;
  }

  print() {
    // TODO: print all dictionary
  }
}
