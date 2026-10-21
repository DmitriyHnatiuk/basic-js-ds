const { NotImplementedError } = require('../lib');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode
	}

	getWay(data, currentData) {
		return data < currentData ? "left" : "right";
	}

	getNode(way, startNode = this.rootNode) {
		if (!startNode) return null;

		let current = startNode;

		while (current[way]) {
			current = current[way];
		}
		return current;
	}

	searchNode(data) {
		let current = this.rootNode;
		let parent = null;

		while (current && current.data !== data) {
			parent = current;
			current = current[this.getWay(data, current.data)];
		}
		return { current, parent };
	}

	add(data) {
		const newNode = new Node(data);

		if (!this.rootNode) {
			this.rootNode = newNode;
			return;
		};

		let current = this.rootNode;

		while (true) {
			if (data === current.data) return;
			const way = this.getWay(data, current.data);
			if (!current[way]) {
				current[way] = newNode;
				return;
			}
			current = current[way]
		}
	}

	find(data) {
		return this.searchNode(data).current;
	}

	has(data) {
		return Boolean(this.find(data))
	}

	remove(data) {
		let { current, parent } = this.searchNode(data);

		if (!current) return;

		if (current.left && current.right) {
			let subNode = this.getNode("left", current.right);

			const { parent: subParent } = this.searchNode(subNode.data, current);

			current.data = subNode.data;

			current = subNode;
			parent = subParent;
		}

		const child = current.left || current.right;

		if (!parent) {
			this.rootNode = child;
			return
		}

		if (parent.left === current) {
			parent.left = child;
		} else {
			parent.right = child;
		}
	}

	min() {
		const node = this.getNode('left');
		return node ? node.data : null;
	}

	max() {
		const node = this.getNode('right');
		return node ? node.data : null;
	}
}

module.exports = {
	BinarySearchTree
};