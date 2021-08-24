// class Queue{
//     constructor() {
//         this.items = {};
//         this.count = 0;
//         this.lowsetCount = 0;
//     }
//     enqueue(ele) {
//         this.items[this.count] = ele;
//         this.count ++;
//     }
//     dequeue() {
//         if(this.isEmpty()) {
//             return;
//         }
//         const result = this.items[this.lowsetCount];
//         delete this.items[this.lowsetCount];
//         this.lowsetCount ++;
//         return result; 
//     }
//     peek() {
//         if(this.isEmpty()) {
//             return;
//         }
//         return this.items[this.lowsetCount];
//     }
//     isEmpty() {
//         return this.count - this.lowsetCount === 0;
//     }
//     size() {
//         return this.count - this.lowserCount;
//     }
//     clear() {
//         this.items = {};
//         this.count = 0;
//         this.lowsetCount = 0;
//     }
// }



// let queue = new Queue();
// queue.enqueue(2);
// queue.clear();
// console.log(queue);


class Deque{
    constructor () {
        this.count = 0;
        this.lowsetCount = 0;
        this.items = {};
    }
    isEmpty() {
        return this.count - this.lowsetCount === 0;
    }
    clear() {
        this.count = 0;
        this.lowsetCount = 0;
        this.items = {};
    }
    size() {
        return this.count - this.lowsetCount;
    }
    addFront(ele) {
        if(this.isEmpty()) { // 当双端队列为空时
            this.addBack(ele);
        } else if(this.lowsetCount > 0) {
            this.lowsetCount --;
            this.items[this.lowsetCount] = ele;
        } else {
            for(let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i-1];
            }
            this.count ++;
            this.lowsetCount = 0;
            this.items[0] = ele;
        }
    }
    addBack(ele) {
        this.items[this.count] = ele;
        this.count ++;
    }
    removeFront() {
        let result = this.items[this.lowsetCount];
        delete this.items[this.lowsetCount];
        this.lowsetCount ++;
        return result;
    }
    removeBack() {
        this.count --;
        let result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    peekFront() {
        return this.items[this.lowsetCount];
    }
    peekBack() {
        return this.items[this.count - 1];
    }
}


let deque = new Deque();

deque.addFront(0);
deque.addFront(1);
deque.addBack(2);
deque.removeFront();
deque.removeBack();

console.log(deque.peekFront());

