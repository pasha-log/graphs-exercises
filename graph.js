class Node {
	constructor(value, adjacent = new Set()) {
		this.value = value;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	// this function accepts a Node instance and adds it to the nodes property on the graph
	addVertex(vertex) {
		this.nodes.add(vertex);
	}

	// this function accepts an array of Node instances and adds them to the nodes property on the graph
	addVertices(vertexArray) {
		vertexArray.forEach((v) => {
			this.nodes.add(v);
		});
	}

	// this function accepts two vertices and updates their adjacent values to include the other vertex
	addEdge(v1, v2) {
		v1.adjacent.add(v2);
		v2.adjacent.add(v1);
	}

	// this function accepts two vertices and updates their adjacent values to remove the other vertex
	removeEdge(v1, v2) {
		v1.adjacent.delete(v2);
		v2.adjacent.delete(v1);
	}

	// this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
	removeVertex(vertex) {
		let nodes = [ ...this.nodes ];
		nodes.forEach((n) => {
			if (n.adjacent.has(vertex)) this.removeEdge(n, vertex);
			if (n === vertex) nodes.splice(nodes.indexOf(n), 1);
		});
		this.nodes.clear();
		this.addVertices(nodes);
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch(start) {
		let nodesArray = [];
		let toVisitStack = [ start ];
		let seen = new Set(toVisitStack);
		while (toVisitStack.length) {
			let currentNode = toVisitStack.pop();
			nodesArray.push(currentNode.value);
			for (let neighbor of currentNode.adjacent) {
				if (!seen.has(neighbor)) {
					toVisitStack.push(neighbor);
					seen.add(neighbor);
				}
			}
		}
		return nodesArray;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start) {
		let nodesArray = [];
		let toVisitQueue = [ start ];
		let seen = new Set(toVisitQueue);
		while (toVisitQueue.length) {
			let currentNode = toVisitQueue.shift();
			nodesArray.push(currentNode.value);
			for (let neighbor of currentNode.adjacent) {
				if (!seen.has(neighbor)) {
					toVisitQueue.push(neighbor);
					seen.add(neighbor);
				}
			}
		}
		return nodesArray;
	}
}

module.exports = { Graph, Node };
