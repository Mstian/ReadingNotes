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

   

   

   





