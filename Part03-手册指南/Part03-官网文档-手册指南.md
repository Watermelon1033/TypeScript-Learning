# TypeScript 官网文档 -- 手册指南
> TypeScript 并不是一个完全新的语言，它是 JavaScript 的超集，为 JavaScript 的生态增加了
  类型机制(类型注解)，并最终将代码编译为纯粹的 js 代码。




## 内容(Content)
##  1. 基础类型 Basic Types


##  2. 变量声明 Variable Declarations
- 略


##  4. 类 Classes
- > 介绍: 传统的 JavaScript 程序使用"函数"和"基于原型的继承"来创建可重用的组件，但熟悉
  面向对象方式的程序员，他们用的是基于类的继承并且对象是由类构建出来的。 从 ECMAScript 6 
  开始，JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许
  开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行。
- **类**
    + 每个类都有一个名为 [[Construct]] 的内部方法，通过关键字 new 调用那些不含 
      [[Construct]] 的方法会导致程序抛出错误。--《深入理解ES6》
      (Tip: TypeScript 文档[接口--> 类类型] 说 constructor 方法为类的静态方法，
      但是看不到内部源码，所以不知如何实现的。)
    + 示例:
      ```typescript
        class Greeter {
            greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }
            greet() {
                return "Hello, " + this.greeting;
            }
        }
        let greeter = new Greeter("world");
      ```  
- **继承 (Inheritance)**
    + TypeScript 中称 子类为"派生类"，子类的父类为 "基类"。
    + 示例:
      ```typescript
        class Animal {
            name: string;
            constructor(theName: string) {
                this.name = theName;
            }
            // - move() 方法接受一个类型为 number 的参数，并赋值默认值为 0 
            move(distanceInMeters: number = 0) {
                console.log(`${this.name} moved ${distanceInMeters}`);
            }
        }
        class Snake extends Animal {
            constructor(name: string) {
                super(name);
            }
            move(distanceInMeters = 5) {
                // - slither ['slɪðə] --v.(使)滑行；(使)滑动
                console.log("Slithering...");
                // - 调用父类的方法
                super.move(distanceInMeters);
            }
        }
        class Horse extends Animal {
            constructor(name: string) {
                super(name);
            }
            move(distanceInMeters = 45) {
                // - gallop ['gæləp] --n.疾驰；飞奔。--v.飞驰；急速进行
                console.log("Galloping...");
                super.move(distanceInMeters);
            }
        }

        let sam = new Snake("Sammy the Python");
        // - 注意: 此处即使 tom 被声明为 Animal 类型, (Tip: 私以为说是添加类型注解为 Animal 更
        //   合适) 但因为它的值时 Horse，调用 tom.move(34) 时，它会调用 Horse 里重写的方法。
        let tom: Animal = new Horse("Tommy the Palomino");
        sam.move();
        tom.move(34);
      ```
- **公共、私有 与 受保护的修饰符 (Public, private, and protected modifiers)**
    + 默认为 `public`
        - 在 TypeScript 里，类的成员(属性和方法)默认为 public。你也可以明确的将一个成员
          标记为 public. 我们用下面的方式来重写上面的 Animal 类:
          ```typescript
            class Animal {
                public name: string;
                public constructor(theName: string) {
                    this.name = theName;
                }
                public move(distanceInMeters: number) {
                    console.log(`${this.name} moved ${distanceInMeters}`);
                }
            }
          ```
    + 理解 `private`
        - 当成员被标记成 private 时，就不能在声明它的类的外部访问。比如:
        ```typescript
            class Animal {
                private name: string;
                constructor(theName: string) {
                    this.name = theName;
                }
            }
            // new Animal("Cat").name;     // 错误: "name" 是私有的。
        ```
    + 理解 `protected`
- **`readonly` 修饰符**
    + 参数属性(Parameter properties)
- **存取器 (Accessors)** (Tip: 即访问器属性)
    + TypeScript 支持通过 getters/setters 来截取对 对象成员的访问。
      ```typescript
        let passcode = "secret passcode";
        class Employee {
            private _fullName: string;
            get fullName(): string {
                return this._fullName;
            }
            set fullName(newName: string) {
                if (passcode && passcode == "secret passcode") {
                    this._fullName = newName;
                } 
                else {
                    console.log("Error: Unauthorized update of employee!");
                }
            }
        }
        let employee = new Employee();
        employee.fullName = "Bob Smith";
        if (employee.fullName) {
            console.log(employee.fullName);    
        }
      ```
- **静态属性**
    + 静态属性存在于类本身而不是类的实例上
      ```typescript
        class Grid {
            // - static 为给类添加的的静态属性
            static origin = {x: 0, y: 0};
            constructor(public scale: number) {}
            // - 方法接受一个 point 的参数，参数为一个对象，包含 x 和 y 两个属性，每个属性
            //   都是 number 类型
            calculateDistanceFromOrigin(point: {x: number; y: number}) {
                let xDist = (point.x - Grid.origin.x);
                let yDist = (point.y - Grid.origin.y);
                return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
            }
        }
        let grid1 = new Grid(1.0);  // 1x scale
        let grid2 = new Grid(5.0);  // 5x scale
        console.log(grid1.calculateDistanceFromOrigin({x: 10, y: 10}));
        console.log(grid2.calculateDistanceFromOrigin({x: 10, y: 10}));
      ```
- **抽象类 (Abstract Classes)** (Tip: Dart 中也有抽象类)
    + 抽象类作为其他派生类的基类使用。它们一般不会直接被实例化。不同于接口(interface), 
      抽象类可以包含成员的实现细节。 `abstract` 关键字是用于定义抽象类和在抽象类内部定义
      抽象方法。
      ```typescript
        abstract class Animal {
            abstract makeSound(): void;
            move(): void {
                // - roam [rəʊm] --v.漫游；闲逛；徜徉
                console.log("roaming the earth 漫游地球...");
            }
        }
      ```
    + 抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。抽象方法的语法与接口方法相似。
      两者都是定义方法签名单不包含方法体。然而，抽象方法必须包含 abstract 关键字并且可以
      包含访问修饰符。
      ```typescript
        abstract class Department {
            constructor(public name: string) {}
            printName(): void {
                console.log("Department name:" + this.name);        
            }
            abstract printMeeting(): void;  // - 必须在派生类中实现
        }
        class AccountingDepartment extends Department {
            constructor() {
                super("Account and Auditing");
            }
            printMeeting(): void {
                console.log("The Accounting Department meets each Monday at 10am.");
            }
            generateReports(): void {
                console.log("Generating accounting reports...");
            }
        }
        // - 允许创建一个对抽象类型的引用
        let department: Department;

        // - 错误不能使用 new 创建抽象类的实例
        // department = new Department();

        // - 允许对一个抽象类的子类进行实例化和赋值
        department = new AccountingDepartment();
        department.printName();
        department.printMeeting();

        // - 错误: 方法在声明的抽象类中不存在
        // department.generateReports();
      ```
- **高级技巧**
    + *构造函数*
        - 当你在 TypeScript 里声明了一个类的时候，实际上同时声明了很多东西。首先就是类
          的实例。
          ```typescript
            class Greeter {
                greeting: string;
                constructor(message: string) {
                    this.greeting = message;
                }
                greet() {
                    return "Hello, " + this.greeting;
                }
            }
            // - 我们使用 Greeter 作为 Greeter 类的实例类型。
            // - Tip: 单独定义 greeter 添加类型注解，就是为了 TS 的语法实现
            let greeter: Greeter;
            greeter = new Greeter("world");
            console.log(greeter.greet());
          ```
        - 下面我们来看上面的代码被编译成 js 后是什么样子：let Greeter 被赋值为构造函数。
          当我们调用 new 并执行了这个函数后，便会得到一个类的实例。这个构造函数也包含了类
          的所有静态属性。换个说法，就是我们认为类具有"实例部分" 和 "静态部分" 两个部分。
          (Tip: 类就是构造函数的语法糖，当然包含构造函数的 实例部分 和 静态属性方法... )
          ```javascript
            let Greeter = (function() {
                function Greeter(message) {
                    this.greeting = message;
                }
                Greeter.prototype.greet = function() {
                    return "Hello, " + this.greeting;
                };
                return Greeter;
            })();
            let greeter;
            greeter = new Greeter("world");
            console.log(greeter.greet());
          ```
        - 我们来稍微改下一下这个例子，看看别的不同：
          ```typescript
            // - Tip: 注意 Greeter 类中没有定义 constructor(). 个人认为在声明类的
            //   语法糖中 constructor 可能并不是必须的，
            class Greeter {
                static standardGreeting = "Hello, there";
                greeting: string;
                greet() {
                    if (this.greeting) {
                        return "Hello, " + this.greeting;
                    }
                    else {
                        return Greeter.standardGreeting;
                    }
                }
            }
            let greeter1: Greeter;
            greeter1 = new Greeter();
            console.log(greeter1.greet());

            // - 创建一个叫 greeterMaker 的变量。 
            // - 英文原文: This variable will hold the class itself or said 
            //   another way its constructor function. Here we use 
            //   `typeof Greeter`, that is "give me the type of the Greeter 
            //   class itself" rather than the instance type. Or,more precisely,
            //   "give me the type of the symbol called Greeter", which is the
            //   type of the constructor function. This type will contain all 
            //   of the static members of Greeter along with the constructor 
            //   that creates instances of the `Greeter` class. We show this 
            //   by using `new` on `greeterMaker`, creating new instances 
            //   of `Greeter` and invoking them as before.
            // - 翻译: 这个变量将保存类本身, 或者说是构造函数的另一种表示方式. 我们使用 
            //   typeof Greeter 是为了取得 Greeter 类本身的类型，而不是实例类型. 
            //   或者更确切的说，"告诉我 Greeter 标识符的类型"，也即是构造函数的类型。
            //   这种类型包含了 Greeter 类的所有静态类型以及可以创建 Greeter 类实例
            //   的构造函数。我们通过 new greeterMaker 来创建一个 Greeter 的新实例
            //   并像之前那样调用它们。 
            let greeterMaker: typeof Greeter = Greeter;
            greeterMaker.standardGreeting = "Hey there!";

            let greeter2: Greeter = new greeterMaker();
            console.log(greeter2.greet());
          ```
    + *把类当做接口使用*
        - 如上所讲，类定义会创建 2 个东西: "类的实例类型" 和 "一个构造函数"。因为类可以
          创建出类型，所以你能够在允许使用接口的地方使用类. 例：
          ```typescript
            class Point {
                x: number;
                y: number;
            }
            interface Point3d extends Point {
                z: number;
            }
            let point3d: Point3d = {x:1, y:2, z: 3};
          ```


##  5. 函数 Functions
1. **函数类型**
    + 为函数定义类型
        - 函数声明
          ```typescript
            function add(x: number, y: number): number {
                return x + y;
            }
          ```
        - 函数表达式
          ```typescript
            let myAdd = function(x: number, y: number): number {
                return x + y;
            }
          ```
        - 箭头函数:
          ```typescript
            let yourAdd = (x: number, y: number): number => {
                return x + y;
            }
          ```
    + 书写完整函数类型
        - 函数类型包含 2 部分: "参数类型" 和 "返回值类型"。当写出完整函数类型的时候，这两
          部分都是需要的。我们以参数列表的形式写出参数类型，为每个参数指定一个名字和类型。
          ```typescript
            // - 注意: myAdd 后是冒号, 也就是说 
            //   `myAdd: (x: number, y: number) => number` 这是一体的
            let myAdd: (x: number, y: number) => number = 
                function(x: number, y: number): number {return x + y;}
          ```
        - 这个名字只是为了增加可读性。我们也可以这么写:
          ```typescript
            let myAdd: (baseValue: number, increment: number) => number = 
                function(x: number, y: number): number {return x + y;}
          ```
          只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确。
        - 第二部分是返回值类型，对于返回值，我们在函数和返回值类型之前使用 ( =>) 符号，
          使之清晰明了。 如之前提到的，返回值类型是函数类型的必要部分，如果函数没有返回
          任何值，你也必须指定返回值类型为 `void` 而不能留空。
    + 推断类型
        - 上面的 "书写完整函数类型" 的注释写起来真是想吐槽，所以我们可以这样，在赋值语句
          的一边指定类型另一边不指定类型，ts 编译器会自动识别出类型:
          ```typescript
            // - myAdd has the full function type
            let myAdd = function(x:number, y:number): number {return x + y;}
          ```
          ```typescript
            // - 省略右边
            let myAdd: (baseValue: number, increment: number) => number =  
                function(x, y) {return x + y;}
          ```
        - 这叫做 "按上下文归类"，是类型推论的一种。
2. **可选参数和默认参数**
    + 可选参数: 在参数名旁使用 ? 实现可选参数的功能：
      ```typescript
        function buildName(firstName: string, lastName?: string) {
            if (lastName)
                return firstName + " " + lastName;
            else
                return firstName;
        }
        let result1 = buildName("Bob");  // works correctly now
        let result2 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
        let result3 = buildName("Bob", "Adams");  // ah, just right
      ```
    + 默认参数
      ```typescript
        function buildName(firstName: string, lastName = "Smith") {
            return firstName + " " + lastName;
        }
        let result1 = buildName("Bob");  // works correctly now, returns "Bob Smith"
        let result2 = buildName("Bob", undefined);  // still works, also returns "Bob Smith"
        let result3 = buildName("Bob", "Adams", "Sr.");  // error, too many parameters
        let result4 = buildName("Bob", "Adams");      // ah, just right
      ```  
3. **剩余参数**
    + ```typescript
        // - Tip: 这个功能真的不是鸡肋吗？ ...restOfName: string[] 这里给剩余参数
        //   增加了一个类型注释，即规定剩余参数是一个数组，但数组的每一项值都为 string 值
        //   ，在 js 这样的动态语言中，值的类型可以多种多样，这样直接限制死了，真的合适吗？
        function buildName(firstName: string, ...restOfName: string[]) {
            return firstName + " " + restOfName.join(" ");
        }
        let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
      ```
    + 剩余参数会被当做个数不限的可选参数。 可以一个都没有，同样也可以有任意个。 编译器创建
      参数数组，名字是你在省略号（ ...）后面给定的名字，你可以在函数体内使用这个数组。 
    + 这个省略号也会在带有剩余参数的函数类型定义上使用到：
      ```typescript
        function buildName(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
        }
        let buildNameFun: (fname: string, ...rest: string[]) => 
            string = buildName;
      ```
4. **this**
    + this 和 箭头函数
    + this 参数
    + this 参数在回调函数里
5. **重载**    

##  6. 泛型 Generics

##  7. 枚举 Enums
- 1、数字枚举
- 2、字符串枚举
- 3、反向映射
- ```typescript
    // - 1、数字枚举
    enum OrderStatus { 
        Start = 1,
        Unpaid,
        Shipping,
        Shipped,
        Complete,
    }
    // OrderStatus:  {
    //   '1': 'Start',
    //   '2': 'Unpaid',
    //   '3': 'Shipping',
    //   '4': 'Shipped',
    //   '5': 'Complete',
    //   Start: 1,
    //   Unpaid: 2,
    //   Shipping: 3,
    //   Shipped: 4,
    //   Complete: 5
    // }
    console.log("OrderStatus: ", OrderStatus);
    
    // - 2、字符串枚举 
    enum OrderSta {
        Start= "Start",
        Unpaid= "Unpaid",
        Shipping= "Shipping",
        Shipped= "Shipped",
        Complete= "Complete",
    }
    // OrderSta:  {
    //   Start: 'Start',
    //   Unpaid: 'Unpaid',
    //   Shipping: 'Shipping',
    //   Shipped: 'Shipped',
    //   Complete: 'Complete'
    // }
    console.log("OrderSta: ", OrderSta);
  ```

##  8. 类型推论 Type Inference

##  9. 类型兼容性 Type Compatibility

##  10. 高级类型 Advanced Types

##  11. Symbols

##  12. 迭代器和生成器 Iterators and Generators

##  13. 模块 Modules

##  14. 命名空间 Namespaces

##  15. 命名空间和模块 Namespaces and Modules

##  16. 模块解析 Module Resolution

##  17. 声明合并 Declaration Merging

##  18. JSX

##  19. 装饰器 Decorators

##  20. Mixins

##  21. 三斜线指令 Triple-Slash Directives

##  22. JavaScript 文件类型检查 -- Type Checking JavaScript Files

##  23. 实用类型 Utility Types
- > TypeScript provides several utility types to facilitate common type 
    transformations. These utilities are available globally.
    TypeScript 提供了几种实用程序类型，以方便常见的类型转换。这些实用程序可在全局使用。
- Table of contents 目录:
    1. Partial<T>
    1. Readonly<T>
    1. Record<K, T>
    1. Pick<T, K>
    1. Omit<T, K>
    1. Exclude<T, U>
    1. Extract<T, U>
    1. NonNullable<T>
    1. ReturnType<T>
    1. InstanceType<T>
    1. Required<T>
    1. ThisType<T>

