# JavaScript 的原型模式和 TypeScript 中的类


## Catalog
1. ES5 中的 "仿类结构" 和 "自定义类型的继承"
2. ES6 中的 "类" 和 "是用派生类进行继承"
3. TypeScript 中的接口(interface)抽象类




## New Words




## Content
### 1. ES5 中的 "仿类结构" 和 "自定义类型的继承"
- > Hint: 本章笔记来自《深入理解ES6》第 9 章
- (1) ES5 中的近类结构为 -- 自定义类型: 首先创建一个构造函数,
  然后定义另外一个方法赋值给构造函数的原型。代码如下:
    + (1) 创建自定义类型的最常见方式，就是组合使用构造函数模式与原型模式;
    + (2) 构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性。
  
  ```js
    // (1)
    function PersonType(name) {
        this.name = name;
    }
    // (2)
    PersonType.prototype.sayName = function () {
        console.log(this.name);  // Nicholas
    };

    let person = new PersonType("Nicholas");
    person.sayName();
    console.log(person instanceof PersonType);  // true
    console.log(person instanceof Object);      // true
  ```
- (2) ES5 中实现自定义类型的继承是个繁琐的过程. 严格的继承要求有多个步骤. 如下:
  ```js
    function Rectangle(length, width) {
        this.length = length;
        this.width = width;
    }
    Rectangle.prototype.getArea = function() {
        return this.length * this.width;
    }
    function Square(length) {
        Rectangle.call(this, length, length);
    }
    Square.prototype = Object.create(Rectangle.prototype, {
        constructor: {
            // - 这种写法等价于: Square.prototype.constructor = Square
            value: Square,
            enumerable: true,
            writable: true,
            configurable: true
        }
    });
    var square = new Square(3);
    console.log(square.getArea());              // 9
    console.log(square intanceof Square);       // true
    console.log(square instanceof Rectangle);   // true
  ```

### 2. ES6 中的 "类" 和 "是用派生类进行继承"
- > Hint: 本章笔记来自《深入理解ES6》第 9 章
- (1) 要声明一个类，首先编写 `class` 关键字，紧跟着的是类的名字，
  其他部分的语法类似于对象字面量的简写形式，但是 **不需要在类的各元素之间使用逗号分隔** 。
  
  每个类都有一个名为 `[[Construct]]` 的内部方法，通过关键字 `new`
  调用那些不含 `[[Construct]]` 的方法会导致程序抛出错误。
  
  类声明仅仅是基于已有自定义类型声明的语法糖.
  ```js
    class PersonClass {

        // - 等价于 PersonType 构造函数
        constructor(name) {         // {1}
            this.name = name;
        }

        // - 等价于 PersonType.prototype.sayName
        sayName() {
            console.log(this.name);
        }
    }

    let people = new PersonClass("Nicholas");
    person.sayName();                                   // "Nicholas"

    console.log(person instanceof PersonClass);         // true
    console.log(person instanceof Object);              // true

    console.log(typeof PersonClass);                    // "function"
    console.log(typeof PersonClass.prototype.sayName);  // "function"
- (2) 我们接着来看一下 ES6 中如何实现继承. 代码如下:
  ```js
    class Rectangle2 {
        constructor(length, width) {
            this.length = length;
            this.width = width;
        }
        getArea() {
            return this.length * this.width;
        }
    }

    // - Square2 类通过 extends 关键字继承 Rectangle2 类，在 Square2
    //   构造函数中通过 super() 调用 Rectangle2 构造函数并传入相应参数.
    //   继承自其他类的类被称为派生类 (derived classes)
    class Square2 extends Rectangle2 {
        constructor(length) {
            // - 与 Rectangle.call(this, length, length) 相同
            super(length, length);
        }
    }
    let square2 = new Square2(3);
    console.log(square2.getArea());                 // 9
    console.log(square2 instanceof Square2);        // true
    console.log(square2 instanceof Rectangle2);     // true
  ```



### 3. TypeScript 中的接口(interface)抽象类
- 我们先来看 TypeScript 官网文档 `03-接口` -- `3.7 类类型` 中关于在 TS
  中如何创建类和实现继承的代码:

  tip: 下面的代码就是使用 `interface` 关键字来创建完全抽象的类
  ```ts
    // - ClockConstructor 接口为构造函数所用
    interface ClockConstructor {                                // {1}
        new (hour: number, minute: number): ClockInterface;     // {2}
    }
    // - ClockInterface 接口为实例方法所用
    interface ClockInterface {                                  // {3}
        tick();                                                 // {4}
    }
    function createClock(                                       // {5}
        ctor: ClockConstructor, 
        hour: number, 
        minute: number
    ): clockInterface {                                         // {6}
        return new ctor(hour, minute);
    }
    // - tip: class 实现(implements) 接口, 是用单词 implement
    class DigitalClock implements clockInterface {              // {7}
        constructor(h: number, m: number) {};                   // {8}
        tick() {                                                // {9}
            console.log('beep beep');
        }
    }
    class AnalogClock implements ClockInterface {               // {10}
        constructor(h: number, m: number) {};                   // {11}
        tick() {                                                // {12}
            console.log('tick tick');
        }
    }
    
    // - 因为 createClock 的第一个参数是 ClockConstructor 类型, 在
    //   createClock(AnalogClock, 7, 32) 里, 会检查 AnalogClock 
    //   是否符合构造函数签名.
    let digital = createClock(DigitalClock, 12, 17);            // {13}
    let analog = createClock(AnalogClock, 7, 32);               // {14}
  ```
  我们来解说一下上面的代码:
    + (1) 首先是 `行{1}`, 我们都知道在 TypeScript 中类的概念是和 Java 中类似的,
      也就是说 **`interface` 关键字可以产生一个完全抽象的类.** (tip:
      不过多少还是有些不同的, TS 语法本身还要实现类型检查.) 
      `ClockConstructor` 接口中内定义了一个构造函数的调用声明
      `new(hour: number, minute: number)` 调用构造函数时接收 2 个
      number 类型的参数 `hour` 和 `minute`, 并返回一个 `ClockInterface` 接口.
    + (2) 可能你会纳闷? 为什么接口内部又返回了一个接口, 这是因为在 TS
      中类分为 2 个部分: "静态部分" 和 "实例部分"; 例如上面代码的 `行{8}` 和
      `行{11}` 都被归入到静态部分(即: 使用 `constructor()` 声明构造函数),
      如果对应 JS 语法就是用 `constructor()`, "实例部分" 对应 JS
      语法就是在构造函数内声明的属性和方法(即: `行{9}` 和 `行{12}`).
    + (3) `行{3}` 定义 `ClockInterface` 接口为实例方法所用, 内部有一个 `tick()`
      方法(tip: 只声明, 不做实现), 此方法在 `行{7}` 和 `行{10}` 声明的
      `DigitalClock` 类和 `AnalogClock` 类的内部实现.
    + (4) 我们接着来看一下 `行{5}` 这里声明了一个接受 3 个参数的 
      `createClock(ctor: ClockConstructor, hour: number, minute: number)`
      方法, 此处算是和 ES6 中定义类差别最大的部分, 不过综合下面的 `行{13}` 和 
      `行{14}` 的调用, 我们也可以理解, 这种写法本身也是为了实现类型检查而设计的,
      在组合使用静态语言中的 `interface` 接口得以实现.   
    + **Additional Info:** 在 Java 语言中可以使用抽象类来实现继承. 代码见:
      `《Javascript设计模式与编程实践》` 中 `1.2.4 使用继承来时态多态`
      一节中的代码 (tip: TS 实现在本仓库 `01-手册指南`--> `04-类.md` 中讲到).
      也可以使用接口 `interface` 实现相同的效果. 代码见:
      `《Javascript设计模式与编程实践》` 中的 `21.2 interface` 一节.
- 我们来看一下上面的 TS 代码编译成 JS 后是什么样:
  ```js
    function createClock(ctor, hour, minute) {
        return new ctor(hour, minute);
    }
    var DigitalClock = (function () {
        function DigitalClock(h, m) {}                          // {1} 
        DigitalClock.prototype.tick = function () {
            console.log('beep beep');
        };
        return DigitalClock;
    }());
    var AnalogClock = (function () {
        function AnalogClock() {}
        AnalogClock.prototype.construct = function (h, m) { };  // {2}
        AnalogClock.prototype.tick = function () {
            console.log('tick tick');
        };
        return AnalogClock;
    }());
    var digital = createClock(DigitalClock, 12, 17);
    var analog = createClock(AnalogClock, 7, 32);
  ```
  可以看出, 虽然上面的 JS 代码实现和此文章开头讲的 JS 实现不太相同, 但是差异不大,
  唯一最大的不同是 `行{2}` 给构造函数传递参数的方式, 这种写法在已知的 ES5 和 ES6
  语法中都没有出现过, ES5 的常规写法和 `行{1}` 是相同的, 即构造函数直接接收参数,
  不过运行代码后发现 `行{2}` 的写法也是不报错的.