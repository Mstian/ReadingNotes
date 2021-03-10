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

#### 代理模式

代理模式是为对象提供一个代用品或占位符，以便控制对它的访问。

代理的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求作出一些处理之后，再把请求转交给本体对象。

比如图片预加载的案例：
```
var myImage = (function() {
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function() {
    var img = new Image;
    img.onload = function() {
        myImage.setSrc(this.src);
    };
    return {
        setSrc: function(src) {
            myImage.setSrc('file:// /c:img.jpg');  // loading图
            img.src = src;
        }
    }
})();

proxyImage.setSrc('http://image.com'); // 实际网络图片
```
代理模式的意义在于减少本体对象承担的责任，为了更好的适应单一职责原则。

#### 发布订阅模式
发布订阅模式又叫观察者模式（书中这么说的，但是这块是有其他异议的），它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。

```
var event = {
    clientList: {},
    listen: function(key, fn) { // 订阅
        if(!this.clientList[key]){
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trriger: function() { // 发布
        let key = Array.prototype.shift(arguments);
        let fns = this.clientList[key];
        if(!fns || fns.length === 0) {
            return false;
        }
        for(let i = 0; i < fns.length; i++) {
            fns[i].apply(this, arguments);
        }        
    },
    remove: function(key, fn) {
        let fns = this.clientList[key];
        if(!fns || fns.length === 0){
            return false;
        }
        if(!fn) {
            fns.length = 0;
        } else {
            for(let i = 0; i<fns.length; i++) {
                if(fns[i] === fn) {
                    fns.splice(i, 1);
                }
            }
        }
    }
}
```
发布订阅模式订阅者必须先订阅一个消息，随后才能接收到发布者发布的消息。如果顺序反过来，发布者先发布一条消息，而在此之前并没有对象来订阅它，这条消息将石沉大海。

发布订阅模式的优点：时间上解耦，对象之前的解耦。缺点：消耗时间，内存，对象之间关系被深埋，导致程序难以跟踪维护。

#### 装饰者模式
装饰者模式可以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
这种给对象动态的增加职责的方式称为装饰者模式。
跟继承相比，装饰者是一种更灵活轻便的做法，这是一种“即用即付”的方式。

```
var plane = {
    fire: function(){
        console.log('发射普通子弹');
    }
}

var missileDecotor = function() {
    console.log('发射导弹');
}

var atomDecotor = function() {
    console.log("发射原子弹");
}

var fire1 = plane.fire;

plane.fire = funciton() {
    fire1();
    missileDecotor();
}

var fire2 = plane.fire();

plane.fire = function() {
    fire2();
    atomDecotor();
}

plane.fire();

```
用AOP装饰函数
```
Function.prototype.before = function(beforeFn) {
    var self = this;
    return function() {
        beforeFn.apply(this, arguments);
        return self.apply(this, argumrnts);
    }
}
```

#### 设计模式之单一职责原则
单一职责原则SRP体现为：一个对象（方法）只做一件事。
SRP的优点是降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度，这有助于代码的复用，也有利于进行单元测试。当一个职责需要变更的时候，不会影响到其他的职责。

SRP缺点：增加编写代码复杂度，当按照职责把对象分解成更小的粒度之后，实际上也增大了这些对象之间相互联系的难度。


#### 设计模式之最少知识原则
最少知识原则（LKP）说的是一个软件实体应当尽可能少地与其他实体发生相互作用。
封装在很大程度上表达的是数据的隐藏，同时封装也用来限制变量的作用域。


#### 设计模式之开放封闭原则
开放封闭（OCP）的思想是当需要改变一个程序的功能或者给这个程序增加新功能的是时候，可以使用增加代码的方式，但是不允许改变程序的源代码。
遵守开放封闭原则最明显的就是找出程序中将要发生变化的地方，然后把变化封装起来。

分离变化的方式：
放置挂钩
回调函数


### 圣斗士不会被同样的招数击倒第二次

#### 代码重构

1. 提炼函数
2. 合并重复的条件片段
3. 把条件分支语句提炼成函数
4. 合理使用循环
5. 提前让函数退出代替嵌套条件分支
6. 传递对象参数代替过长的参数列表
7. 尽量减少参数数量
8. 少用三目运算符
9. 合理使用链式调用
10. 分解大型类
11. 用return退出多重循环



