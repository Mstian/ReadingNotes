#### 第一章 Node简介

##### Node特点：

1. 异步I/O
2. 事件与回调函数
3. 单线程
4. 跨平台

##### Node的应用场景

1. I/O密集型：I/O密集的优势主要在于Node利用事件循环的处理能力
2. 关于CPU密集型业务：CPU密集型应用给Node带来的挑战主要是，由于javascript单线程的原因，如果有长时间的计算（比如大循环），将会导致CPU时间片不能释放，使得后续I/O无法发起。但是适当调整和分解大型运算任务为多个小任务使得运算释放，不阻塞I/O。
3. 做中间层
4. 分布式应用

#### 第二章 模块机制

1. CommonJS规范

   CommonJS规范为JavaScript制定了一个美好的愿景-希望JavaScript能够在任何地方运行。

   AMD(RequireJS)和CMD(SeaJS)的区别

   1. 对于依赖的区别，AMD是**提前执行**，CMD是**延迟执行**。
   2. CMD推崇**依赖就近**，AMD推崇**依赖前置**。

   ```js
   // CMD
   define(function(require, exports, module){
   	var a = require('./a');
   	a.doSomeThing();
   	// ......
   	var b = require('./b');
   	b.doSomeThing();
   })
   
   // AMD
   define(['./a', './b'], function(a, b) {
   	a.doSomeThing();
   	// ......
   	b.doSomeThing();
   })
   
   ```

   | 方案 | 优势                   | 劣势       | 特点                           |
   | ---- | ---------------------- | ---------- | ------------------------------ |
   | AMD  | 速度快                 | 会浪费资源 | 预先加载依赖，直到使用时才执行 |
   | CMD  | 只有真正需要才加载依赖 | 性能较差   | 直到使用时才定义依赖           |

2. Node中模块实现

   过程：（1）路径分析 （2）文件定位（3）编译执行

   模块分类：1. Node提供的模块 **核心模块** 2. 用户编写的模块 **文件模块**

   核心模块特点：在Node源代码编译中编译进二进制执行文件，Node进程启动时，部分核心模块被直接加载进内存中，在引用时文件定位和编译执行两步可省略，并且在路径分析中优先判断，所以加载速度快。

   文件模块在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程，速度比核心模块慢。

   路径分析和模块定位

   1. 模块标识符分析：（核心模块: http fs）（.或..开始的相对路径模块）（以/开始的绝对路径文件模块）（非路径形式的文件模块-自定义模块）
   2. 加载速度排名：缓存中模块 > 核心模块 > 路径形式的文件模块 > 自定义模块
   3. 文件扩展名分析：CommonJS允许在标识符中不包含文件扩展名，这种情况下Node会按.js .json .node 的次序补足扩展名
   4. 目录分析和包：require()分析扩展名之后，可能没有查找到对应文件，可能会得到一个目录，此时Node会将目录当做一个包来处理。分析过程，首先Node会在当前目录下查找package.json，取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将进入扩展名分析步骤。如果main指定的文件名错误，或者就没有package.json文件，Node会将index当做默认的文件名，然后依次查找index.js、index.json、index.node。如果没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。（模块路径是Node在定位文件模块的具体文件时制定的查找策略，是一个由路径组成的数组）

   模块编译：
   
   对于不同的文件扩展名，其载入的方法也不同
   
   + .js文件：通过fs模块同步读取文件后编译执行
   + .node文件：C/C++编写的扩展文件，通过dlopen()方法加载最后编译生成的文件。
   + .json文件：通过fs模块同步读取文件后，用JSON.parse()解析返回结果。
   + 其他扩展名文件：它们都被当做.js文件载入
   
   每一个编译成功的模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二次引入的性能。
   
   JavaScript模块的编译：
   
   require、exports、module这3个变量在每个模块中都有，但是在模块文件中并未定义，那么从何而来？还有`__dirname`、`__filename`如果把直接定义模块的过程放在浏览器端，会存在污染全局变量的情况。
   
   事实上，在编译的过程中，Node对获取的JavaScript文件内容进行了`头尾包装`在头部添加了`（function(exports, require, module, __filename, __dirname){\n） `，在尾部添加了`\n`.
   
   正常的JavaScript文件会被包装成如下的样子：
   
   ```javascript
   (function(exports, require, module, __filename, __dirname) {
   	var Math = require('math');
   	exports.area = function(radius) {
   		return Math.PI * radius * radius;
   	}
   })
   ```
   
   这样每个模块文件之间都进行了作用域隔离。包装之后的代码会通过vm原生模块runInThisContext()方法执行（类似eval，只是具有明确上下文，不污染全局），返回一个具体的function对象。
   
   这就是这些变量并没有定义在每个模块文件中却存在的原因。在执行之后，模块的exports属性被返回给了调用方。exports属性上的任何方法和属性都可以被外部调用，但是模块中的其余变量或属性则不可直接调用。