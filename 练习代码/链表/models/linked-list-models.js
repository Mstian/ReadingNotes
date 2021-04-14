class Node{
    constructor(element) {
        this.element = element;
        this.next = undefined;
    }
}

class DoublyNode extends Node{
    constructor(element) {
        super(element);
        this.prev = undefined;
    }
}
exports.Node = Node;

exports.DoublyNode = DoublyNode;