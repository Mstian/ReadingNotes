#### 第一章 原型模式和基于原型继承的JavaScript对象系统

1. 使用克隆的原型模式

   原型模式是用于创建对象的一种模式，原型创建对象不需要关心对象的具体类型，而是找到一个对象，通过克隆来创建一个一模一样的对象。

2. 原型编程范型的一些规则

   + 所有的数据都是对象
   + 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型并克隆它
   + 对象会记住它的原型
   + 如果对象无法响应某个请求，它会把这个请求委托给它自己的原型。



#### 第二章 this call 和apply

1. this的指向

   + 作为对象的方法使用（this指向该对象）
   + 作为普通函数调用（this指向全局对象，浏览器中的js指向window，严格模式下指向undefined）
   + 构造器调用（this指向构造器返回的对象）
   + call和apply方法调用（this指向方法的第一个参数）

2. 丢失的this

   ```javascript
   var obj = {
   	name: 'lisa',
   	sayName: function() {
   		console.log(this.name);
   	}
   }
   obj.sayName(); // lisa
   
   var getName = obj.sayName();
   getName(); // undefined
   ```

   上述代码getName方法调用数据this指向中的第二种了，不属于第一种情况。this的指向不是在定义的时候就规定的而是在运行时才产生的。

3. call和apply

   参考：https://www.jianshu.com/p/3e025042ac2e

#### 第三章 闭包和高阶函数

1. 闭包原理

   ```javascript
   var func = function () {
       var a = 1;
       return function () {
           a++;
           console.log(a);
       }
   }
   
   let foo = func();
   foo(); // 2
   foo(); // 3
   foo(); // 4
   ```

   当执行var foo = func() 时，foo指向了一个匿名函数的引用，它可以访问到func被调用时产生的环境，而局部变量a一直处在这个环境中，既然局部变量所在的环境还能被外界访问，这个局部变量就有了不被销毁的理由。在这里产生了一个闭包结构，局部变量的生命周期被延续了。

   闭包的作用：

   + 封装变量
   + 延续局部变量的寿命

2. 高阶函数

   定义：函数可以作为参数传递；函数可以作为返回值输出。满足两个条件之一即为高阶函数。

3. 高阶函数实现AOP

   AOP（面向切面编程）主要作用是把一些跟核心业务逻辑模块无关的功能抽离出来，这些逻辑包括日志统计，安全控制，异常处理等。目的是保持业务逻辑模块的纯净和高内聚性。

   

   >闭包参考：https://www.jianshu.com/p/af0f1a11679a

   
#### 第四章 单例模式
定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

```javascript
let createInstance = function(val) {
    return val;
}

let ProxySingleton = (function() {
    let instance = null;
    return function(val) {
        if (!instance) {
          instance = createInstance(val);
        }
        return instance;
    }
})();

// 测试
let a = ProxySingleton('a');
let b = ProxySingleton('b');
console.log(a, b); // a a
console.log(a === b); // true

```
单例模式实现有很多种，尤其是在JavaScript中，一个全局变量就可以实现单例模式，但是为了私有化变量，减少全局变量，可以使用闭包加代理的方式，核心就是将业务逻辑和单例逻辑分开实现，将单例变量存在闭包中实现隔离。



#### 第五章 策略模式

定义：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

将不变的部分和变化的部分隔开是每个设计模式的主题。策略模式的目的就是将算法的使用与算法的实现分离开来。

一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。

JavaScript中的策略模式

```javascript
// 策略类
var strategies = {
    "S": function(salary){
        return salary * 4;
    },
    "A": function(salary){
        return salary * 3;
    },
    "B": function(salary){
		return salary * 2;
    }
}

// 环境类
function caculateBonus(type, salary) {
    return strategies[type](salary);
}

// 经理奖金
let CEOBONUS = caculateBonus('S', 1000); // 4000

// 员工奖金
let STAFFBONUS = caculateBonus('A', 500); // 1500

```

策略模式优缺点：

+ 策略模式利用组合、委托和多态等技术和思想，可以有效地避免多重条件选择语句。
+ 策略模式提供了对开发-封闭原则的完美支持，将算法封装在独立的strategy中，使得它们易于切换，易于理解，易于扩展。
+ 策略模式中的算法也可以复用在系统的其他地方，从而避免许多重复的复制粘贴工作。
+ 策略模式需要增加更多策略类或策略对象。
+ 要使用策略模式，必须要了解所有的strategy,必须了解各个strategy之间的不同点，这样才能选择一个合适的strategy。

业务中经常会给同一组数据绑定不同的方法比如：查看，删除，开始，暂停等。同一个函数`handleClick('check')`,`handleClick('delete')`,`handleClick('start')`根据不同的参数执行不同的操作，一般情况下我会采用if判断进行操作。

```javascript
function handleClick(type){
    if (type === 'check') {
        // 执行查看逻辑
    } else if (type === 'delete') {
        // 执行删除逻辑       
    }
}
```



可以用策略模式实现易维护扩展的代码

```javascript
// 策略类
let strategies = {
    check: () => {
        // 查看逻辑
    },
    delete: () => {
        // 删除逻辑
    }
}

// 环境类
function handleCustomClass(type) {
    strategies[type]();
}
```

这样就可以将复杂的逻辑放在策略类中单独处理，而不用维护长长的handleClick()函数的逻辑了。

小结：

在JavaScript语言的策略模式中，策略类往往被函数所替代，这时策略模式就成为一种“隐形”的模式。

   

   





