/*

  Stack is a structure FILO or LIFO(Last In First Out)
  should has methods:
    - has - check if has element in stack
    - push - ad element to stack
    - pop - remove from stack and return top element
    - peek - just show top element
*/
class Stack {
  constructor() {
    this.container = [];
  }

  has(element) {
    return this.container.indexOf(element) > -1;
  }

  push(element) {
    this.container.push(element);
  }

  pop() {
    return this.container.pop();
  }

  peek() {
    return this.container[ this.container.length - 1 ];
  }
}
