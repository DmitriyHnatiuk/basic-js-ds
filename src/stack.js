// const { NotImplementedError } = require('../lib');

/**
 * Implement the Stack with a given interface via array.
 *
 * @example
 * const stack = new Stack();
 *
 * stack.push(1); // adds the element to the stack
 * stack.peek(); // returns the peek, but doesn't delete it, returns 1
 * stack.pop(); // returns the top element from stack and deletes it, returns 1
 * stack.pop(); // undefined
 *
 */
class Stack {
	#top = null;

	push(value) {
		this.#top = { value, next: this.#top };
	}

	pop() {
		if (!this.#top) return;

		const value = this.#top.value;
		this.#top = this.#top.next;
		return value;
	}

	peek() {
		return this.#top?.value;
	}
}


module.exports = {
	Stack,
};
