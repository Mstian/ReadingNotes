const {defaultEquals} = require("./utils");
const {Node, DoublyNode} = require("./models/linked-list-models");
class LinkedList{
    constructor(equalsFn = defaultEquals) {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = equalsFn;
    }
    push(element){
        const node = new Node(element);
        let current;
        if(this.head == null) {
            this.head = node;
        } else {
            current = this.head;
            while(current.next != null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count ++;
    }
    removeAt(index) {
        // 检查越界
        if(index < 0 || index > this.count) {
            return undefined;
        }
        let current = this.head;
        if(index === 0) {
            this.head = current.next;
        } else {
            let previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
        }
        this.count --;
        return current.element;
    }
    getElementAt(index) {
        // 检查越界
        if(index < 0 || index > this.count) {
            return undefined;
        }
        let current = this.head;
        for (let i = 0; i < index; i++ ) {
            current = current.next;
        }
        return current;
    }
    insert(element, index) {
        // 检查越界
        if(index < 0 || index > this.count) {
            return undefined;
        }
        const node = new Node(element);
        if(index === 0) {
            const current = this.head;
            node.next = current;
            this.head = node;
        } else {
            let previous = this.getElementAt(index - 1);
            let current = previous.next;
            previous.next = node;
            node.next = current;
        }
        this.count ++;
        return true;
    }
    indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.count - 1; i++ ) {
            if(this.equalsFn(element, current.element)) {
                return i;
            }
            current = current.next;
        }
        return -1;
    }
    remove(element){
        const index = this.indexOf(element);
        return this.removeAt(index);
    }
    size(){
        return this.count;
    }
    isEmpty() {
        return this.size() === 0
    }
    getHead() {
        return this.head;
    }
    toString() {
        if(this.head == null) {
            return "";
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for(let i = 0; i < this.size() - 1; i++) {
            objString = `${objString},${current.element}`;
            current = current.next;
        }
        return objString;
    }
}

// let list = new LinkedList();
// list.push(1);
// list.push(2);


class DoublyLinkedList extends LinkedList{
    constructor(equalsFn = defaultEquals){
        super(equalsFn);
        this.tail = undefined;
    }
    insert(element, index) {
        if(index < 0 || index > this.count) {
            return undefined;
        }
        const node = new DoublyNode(element);
        let current = this.head;
        if(index === 0) {
            if(this.head == undefined) {
                console.log('jj');
                this.head = node;
                this.tail = node;
            } else {
                node.next = this.head;
                current.prev = node;
                this.head = node;
            }
        } else if(index === this.count) {
            current = this.tail;
            current.next = node;
            node.prev = current;
            this.tail = node;
        } else {
            const previous = this.getElementAt(index - 1);
            current = previous.next;
            node.next = current;
            previous.next = node;
            current.prev = node;
            node.prev = previous;
        }
        this.count ++;
        return true;
    }
    removeAt(index){
        if(index < 0 || index >= this.count) {
            return undefined;
        }
        let current = this.head;
        if(index === 0) {
            this.head = current.next;
            if(this.count === 1) {
                this.tail = undefined;
            } else {
                this.head.prev = undefined;
            }
        } else if(index === this.count - 1) {
            current = this.tail;
            this.tail = current.prev;
            current.prev = undefined;
        } else {
            current = this.getElementAt(index);
            let previous = current.prev;
            previous.next = current.next;
            current.next.prev = previous;
        }
        this.count --;
        return current.element;
    }
}

let doublyList = new DoublyLinkedList();
doublyList.insert(1, 0);
doublyList.insert(2, 1);
doublyList.insert(3, 2);
doublyList.removeAt(1);
console.log(doublyList);