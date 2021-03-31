### 基本概念
##### 数组

+ 插入元素
  + 前插：`unshift()`
  + 后插：`push()`
+ 删除元素
  + 前删`shift()`
  + 后删`pop()`
+ 在任意位置添加或删除元素
  + `splice()`

对于JavaScript数组和对象，还可以用delete运算符删除数组中的元素，例如：`delete numbers[0]`等同于`numbers[0] = undefined`;

二维和多维数组

**矩阵**（二维数组，或数组的数组）



##### 栈

可以理解成一种具有特殊行为的数组

栈数据结构：栈是一种遵循`后进先出（LIFO）`原则的有序集合，新添加或待删除的元素都保存在栈的一端，称做作栈顶，另一端叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

栈也被用在编程语言的编译器和内存中保存变量，方法调用等，也被用于浏览器历史记录。

栈应该具有的一些方法：

`push(element)`：添加一个或几个新元素到栈顶

`pop()`：移除栈顶的元素，同时返回被移除的元素

`peek()`：返回栈顶的元素，不对栈做任何修改。

`isEmpty()`：查看栈是否为空

`clear()`：移除栈里的所有元素

`size()`：返回栈中元素个数

```javascript
class Stack {
	constructor() {
        this.items = [];
    }
    push(ele) {
        this.items.push(ele);
    }
    pop() {
        return this.items.pop();
    }
	peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    clear() {
        this.items = []
    }
}
```
##### 队列和双端队列

队列是遵循先进先出（FIFO）原则的一组有序的项，队列在尾部添加新元素，并从顶部移除元素，最新添加的元素必须排在队列的末尾。

队列中可用的一些方法：
`enqueue(ele)`：向队列末尾添加一个（或多个新的项）
`dequeue()`：移除队列的第一项，并返回被删除的元素。
`peek()`：返回队列中第一个元素。
`isEmpty()`：如果队列不包含任何元素，返回true,否则返回false.
`size()`：返回队列包含的元素个数，与数组的length属性类似。

```
class Queue{
    constructor() {
        this.items = {};
        this.count = 0;
        this.lowsetCount = 0;
    }
    enqueue(ele) {
        this.items[this.count] = ele;
        this.count ++;
    }
    dequeue() {
        if(this.isEmpty()) {
            return;
        }
        const result = this.items[this.lowsetCount];
        delete this.items[this.lowsetCount];
        this.lowsetCount ++;
        return result; 
    }
    peek() {
        if(this.isEmpty()) {
            return;
        }
        return this.items[this.lowsetCount];
    }
    isEmpty() {
        return this.count - this.lowsetCount === 0;
    }
    size() {
        return this.count - this.lowserCount;
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowsetCount = 0;
    }
}
```

双端队列是一种允许我们同时从前端和后端添加和移除元素的特殊队。

由于双端队列同时遵守了先进先出和后进先出原则，可以说是把队列和栈相结合的一种数据结构。

```
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
```
队列和双端队列解决问题。
1. 击鼓传花问题。
2. 回文检查器。

























