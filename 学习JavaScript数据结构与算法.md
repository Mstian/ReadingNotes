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

























