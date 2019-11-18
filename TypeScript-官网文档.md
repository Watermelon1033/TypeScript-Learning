# TypeScript 官网文档
> TypeScript 并不是一个完全新的语言，它是 JavaScript 的超集，为 JavaScript 的生态增加了
  类型机制(类型注解)，并最终将代码编译为纯粹的 js 代码。

# 手册指南

##  1. 基础类型 Basic Types
1. 布尔值 Boolean
    + `let isDone: boolean = false;`
1. 数字 Number
    + `let num: number = 37;`
1. 字符串 String
    
    + `let name: string = 'Gene';`
1. 数组 Array
    + typescript 有 2 种方式可以定义数组:
        1. `let list: number[] = [1, 2, 3]; `
        2. `let list: Array<number> = [1, 2, 3];`
1. 元祖 Tuple
    + 元祖类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。例如:
    + ```typescript
        // - Declare a tuple type 声明一个元祖类型
        let x: [string, number];
        // - 初始化 Initialize it
        x = ['Hello', 10];
        console.log(x[0].substr(1));
        
        // - 当访问一个越界的元素，会使用联合类型代替:
        // OK, 字符串可以赋值给 (string | number) 类型
        x[3] = 'world'; 
        
        // OK, 'string' 和 'number' 都有 toString
        console.log(x[5].toString()); 

        // Error, 布尔不是 (string | number) 类型
        // x[6] = true;
      ```
1. 枚举 Enumerable
    - enum 类型是对 Javascript 标准数据类型的一个补充。像 C# 等其它语言一样，使用枚举
        类型可以为一组数值赋予友好的名字。
      ```typescript
        enum Color {Red, Green, Blue}
        let c: Color = Color.Green;
      ```
    - 默认情况下，从 0 开始为元素编号。你也可以手动的指定成员的数值。例如，我们将上面的
        例子改成从 1 开始编号:
      ```typescript
        enum Color {Red = 1, Green, Blue}
        let c: Color = Color.Green;
      ```
    - 或者，全部都采用手动赋值:
      ```typescript
        enum Color {Red = 1, Green = 2, Blue = 4}
        let c: Color = Color.Green;
      ```
    - 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为 2，但是
        不确定它映射到 Color 里的哪个名字，我肯可以查找相应的名字：
      ```typescript
        enum Color {Red = 1, Green, Blue}
        let colorName: string = Color[2];
        console.log(colorName); // Green
      ```
1. Any
    - 对于不确定的数据类型我们可以使用 any 类型来标记
    - ```typescript
        let notSure: any = 4;
        notSure = 'maybe a string instead';
        notSure = false;    // okay, definitely a boolean
      ```
    - 在对代码进行改写的时候，any 类型是十分有用的，它允许你在编译时可选地包含或移除
        类型检查。你可以能认为 Object 有相似的作用，就像它在其他语言中那样。但是 Object
        类型的变量只允许你给它赋任意值——但是却不能在它上面调用任意的方法，即便它真的有这些
        方法。例如:
    - ```typescript
        let notSure: any = 4;
        notSure.ifItExists(); // okay, ifItExists might exist at runtime
        notSure.toFixed();  // okay, toFixed exists (but the compiler doesn't check)

        let prettySure: Object = 4;
        // prettySure.toFixed();   // Error: Property 'toFixed' doesn't exist on type 'Object'.
      ```
    - 当你只知道一部分数据的类型时，any 类型也是有用的。比如你有一个数组，它包含上了不同
        类型的数据:
    - ```typescript
        let list: any[] = [1, true, 'free'];
        list[1] = 100;
      ```
1. Unknow 类型
    - 任何使用 any 类型的地方推荐使用 unknow 类型代替它。
    - > [new-unknow-top-type](https://www.typescriptlang.org/docs/handbook/
    release-notes/typescript-3-0.html#new-unknown-top-type)
        比 any 更加安全的类型
1. Void
    - 某种程度上来说， void 类型像是与 any 类型相反，它表示没有任何类型。当一个函数没有
        返回值时，你通常会见到其返回值类型是 void:
    - ```typescript
        // - void [vɒɪd] --adj.空的，无效的。--n.空间，空虚。--v.废止
        function warnUser(): void {
            console.log('This is my warning message');
        }
      ```
    - 声明一个 void 类型的变量没有什么大用，因为你只能为它赋予 undefined 和 null;  
    - ```typescript
        let unusable: void = undefined; 
        ```
1. Null 和 Undefined
    - Typescript 里，undefined 和 null 两者各自有自己的类型分别叫做 undefined 和 
        null. 和 void 相似，它们本身的类型用处不是很大:
    - ```typescript
        // Not much else we can assign to these variables!
        let u: undefined = undefined;
        let u: null = null;
      ```
    - 默认情况下，null 和 undefined 是所有类型的子类型，就是说你可以把 null 和 
        undefined 赋值给 number 类型的变量.  (Tip: 是所有类型的子类型，那也就是说
        可以赋值给其他类型，比如 string/boolean...等等) 
    - 然而，当你指定了 `--strictNullChecks` 标记， null 和 undefined 只能赋值给
        void 和它们各自。浙能避免很多常见的问题。也许在某处你想传入一个 string 或 null 
        或 undefined, 你可以使用联合类型 `string | null | undefined`. 再次说明，
        稍后我们会介绍联合类型。
    > Note: 我们鼓励尽可能第使用 `--strictNullChecks`，但是在本手册里我们假设这个
        标记是关闭的。  
1. Never
    - `never` 类型表示的是那些永不存在的类型值。例如: never 类型是那些总是会抛出异常
        或 根本就不会有返回值的"函数表达式" 或 "箭头函数"的返回值类型；变量也可能是 
        never 类型，当变量被永不为真的类型所约束时。
    - never 类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是 never 的
        子类型 或 可以赋值给 never 类型 (除了 never 本身)。即使 any 也不可以赋值给
        never。 下面是一些返回 never 类型的函数。  
    - ```typescript
        // - 返回 never 的函数必须存在无法达到的终点
        function error(message: string): never {
            throw new Error(message);
        }

        // - 推断的返回值类型为 never
        function fail() {
            return error('Something failed');
        }

        // - 返回 never 的函数必须存在无法达到的终点
        function infiniteLoop(): never {
            while(true) {}
        }
      ```
1. Object
    - 和 JavaScript 中的语法一样， Object 为复杂数据类型 (引用类型)，即除 6 种基本
        数据类型外的类型。 下面为 6 种基本数据类型:  
        + undefined 未定义
        + null 空值
        + number 
        + boolean
        + string
        + symbol
    - 使用 object 类型，就可以更好的表示像 Object.create 这样的 API。例如:
    - ```typescript
        // - declare [dɪ'kleə] --v.声明，宣布，申报
        // - 声明一个函数, 参数只接受 object | null，并且没有返回值
        declare function create(o: object | null): void;
        create({prop: 0});  // OK
        create(null);   // OK
        // create(42);     // Error
        // create('string');   // Error
        // create('false');   // Error
        // create('undefined');   // Error
      ```
1. 类型断言
    - 通过类型断言你可以告诉编辑器，"相信我，我知道自己在干什么"。类型断言好比其他语言里
        的类型转换，但是不进行特殊的数据检查和解构。它没有运行时的影响，只是在编译阶段起
        作用。TypeScript 会假设你，已经进行了必要的检查。
    - 类型断言有 2 中形式:   
    - ```typescript
        // - 第 1 种形式: "尖括号" 语法。
        let someValue: any = 'this is a string';
        let strLength: number = (<string>someValue).length;
        
        // - 第 2 种形式: as 语法。
        let strLength02: number = (someValue as string).length;
      ```
    - 上面 2 种形式是等价的，选择由你所好；然而，当你在 TypeScript 里使用 JSX 时，只
        有 as 语法是被允许的。
1. 关于 let 
    
    - 尽可能地使用 let 来代替 var 吧。  

##  2. 变量声明 Variable Declarations
- 略

##  3. 接口 Interfaces
- > Typescript 的核心原则之一是**对值所具有的的结构进行类型检查。**, 它有时被称为 
  "鸭式变型法" 或 "结构性子类型化"。在 TypeScript 里，
  **接口的作用就是: 为这些类型命名和为你的代码或第 3 方代码定义契约。**
- **接口初探**
    + ```typescript
        interface LabelledValue {
            label: string;
        }
        function printLabel(labelObj: LabelledValue) {
            console.log(labelObj.label);
        }
        let myObj = {
            'label': 'Hello Interface'
        };
        printLabel(myObj);
      ```
    + 上面的 LabelledValue 接口就好比一个名字，它代表了有一个 label 属性且类型为
      string 的对象。我们只关注值的外形，只要传入的对象满足上述必要条件，那么它就是被
      允许的。 <br/>
    + 另外，类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。
- **可选属性**
    + 接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。可选属性在
      应用 "option bags (选择袋)" 模式时很常用，即给函数传入的参数对象中只有部分属性
      赋值了。下面是应用了 "option bags" 的例子:
      ```typescript
        // - Q: 为什么接口后的花括号内属性之间是分号？ 
        // - A: 这个问题搜遍了 google 都没有找到答案，我个人理解为 "属性: 类型注解" 是对
        //   要添加 "类型判断" 对象的一种外形上的约束，这种约束规则是以单个 "属性: 值" 的
        //   形式添加的，也即是说这种规则相当于是对属性和值的一种判断语句，既然是判断语句
        //   那么上下语句之间肯定是用分号分割的。
        interface SquareConfig {
            // - color 和 width 都为可选属性
            color?: string;
            width?: number;
        }
        // - 接口 SquareConfig 为参数的类型注解； 
        // - {color: string; area: number} 为返回值的类型注解。
        function createSquare(config:SquareConfig): {color:string; area:number} {
            let newSquare = {color: 'white', area: 100};
            // - 判断传入的 config 参数中是否存在 color 属性，如果存在，就把 color 属性
            //   赋值给 newSquare.color
            if (config.color) {
                newSquare.color = config.color;
            }
            // - 因为 config 参数中没有传入 width 所以此 if 语句不会执行。
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }
        let mySquare = createSquare({color: 'black'});
        console.log(mySquare);
      ```
    + 带有可选属性的接口与普通的接口定义差不多，只是在可选属性名字定义的后面加一个 ? 符号。 
- **只读属性**
    + 一些对象属性只能在对象刚创建的时候修改其值。可以在属性名前用 readonly 来指定只读属性:
      ```typescript
        interface Point {
            // - 作为属性则使用 readonly
            readonly x: number;
            readonly y: number;
        }
        let p1: Point = {x: 10, y: 20};
        // p1.x = 5;   // error 
      ```
    + TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变
      方法去掉了，因此可以确保数组创建后再也不能被修改:
      ```typescript
        let a: number[] = [1, 2, 3, 4];
        let ro: ReadonlyArray<number> = a;
        // ro[0] = 12; // error
        // ro.push(5); // error
        // a = ro; // error
      ```
    + 上面代码的最后一行，可以看到就算把整个 ReadonlyArray 赋值给一个普通数组也是不可的。
      但是可以使用类型断言重写:  ```typescript a = ro as number[]```    
    + `readonly` vs `const`: 作为变量使用 const, 若作为属性则使用 readonly.
- **额外的属性检查**
    + 略
- **函数类型(的接口)**
    + 接口能够描述 JavaScript 中对象拥有的各种各样的外形。除了描述带有属性的普通对象外，接
      口也可以描述函数类型。
    + 为了使用接口表示函数类型，我们需要给接口定义一个调用签名。它就像是一个只有参数列表和
      返回值类型的函数定义。参数列表里的每个参数都需要名字和类型: 
      ```typescript
        // - 函数类型的接口: 就像是一个只有参数列表和返回值类型的函数定义。
        interface SearchFunc {
            (source: string, subString: string): boolean;
        }

        // - 这样定义后，我们可以像使用其他接口一样使用这个函数类型的接口。下例展示了创建
        //   一个函数类型的变量，并将一个同类型的函数赋值给这个变量。
        let mySearch: SearchFunc;
        mySearch = function(source: string, subString: string) {
            let result = source.search(subString);
            return result > -1;
        };

        // - 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。比如，
        //   我们使用下面的代码重写上面的例子:
        let mySearch: SearchFunc;
        mySearch = function(src: string, sub: string): boolean {
            let result = src.search(sub);
            return result > -1;
        };

        // - 函数的参数会逐个进行检查，要求对应位置上的参数类型是兼容的。如果不想指定类型，
        //   TypeScript 的类型系统会推断出参数类型，因为函数直接赋值给了 SearchFunc 
        //   类型变量。函数的返回值类型是通过其返回值推断出来的 (此例是 false 和 true)。
        //   如果让这个函数返回数字或字符串，类型检查器会警告函数的返回值类型与 SearchFunc
        //   接口中的定义不匹配。
        let mySearch: SearchFunc;
        mySearch = function(src, sub) {
            let result = src.search(sub);
            return result > -1;
        }
      ``` 
- **可索引的类型**
    + 与使用接口描述函数类型差不多，我们可以描述那些能够 "通过索引得到" 的类型，比如 a[10]
      或 ageMap["daniel"]. 可索引类型具有一个 "索引签名"，它描述了对象索引的类型，还有
      相应的索引返回值类型。让我门看一个例子：
      ```typescript
        // - 定义一个 StringArray 接口，具有索引签名。这个索引签名表示了当用 number 去
        //   索引 StringArray 时会得到 string 类型的返回值。
        interface StringArray {
            [index: number]: string;
        }
        let myArray: StringArray;
        myArray = ['Bob', 'Fred'];
        let myStr: string = myArray[0];
      ```  
    + TypeScript 支持 2 种索引签名: 字符串 和 数字。可以同时使用 2 种类型的索引，但是数字
      索引的返回值必须是字符串索引返回值类型的子类型。这是因为当使用 number 来索引时，js 会
      将它转换成 string 然后再去索引对象。也就是说用 100 (一个 number) 去索引等同于使用
      "100" (一个字符串 string) 区索引，因此 2 者需要保持一致。 
      ```typescript
        class Animal {
            name: string;
        }
        class Dog extends Animal {
            breed: string;
        }
        // - 错误: 使用数值型的字符串索引，有时会得到完全不同的 Animal
        interface NotOkay {
      	    // - 数字索引的返回值必须是字符串索引返回直类型的子类型。因为 Dog 是 Animal
	        //   类的子类，所以这里是错误的，此处 Animal 和 Dog 互换即可。
            [x: number]: Animal;
            [x: string]: Dog;
        }
      ```  
    + 字符串索引签名能够很好的描述 dictionary (字典) 模式，并且它们也会确保所有属性与其
      返回值类型相匹配。因为字符串索引声明了 obj.prototype 和 obj['property'] 两种形式
      都可以。下面的例子里， name 的类型与字符串索引类型不匹配，所以类型检查器给出了一个错误
      提示：
      ```typescript
        interface NumberDictionary {
            [index: string]: number;
            length: number;
            // - 错误，`name` 的类型与索引类型返回值的类型不匹配
            name: string;
        }
      ```
    + 最后，你可以将**索引签名设置为只读**，这样就防止了给索引赋值:
      ```typescript
        interface ReadonlyStringArray {
            readonly [index: number]: string;
        }
        let myArray: ReadonlyStringArray = ["Alice", "Bob"];
        myArray[2] = "Mallory"; // error
      ``` 
- **类类型**
    + *实现接口 (implementing an interface)*
        + implement ['ɪmplɪm(ə)nt]  --vt.实现，执行. --n.工具，设备
        + 与 C# 或 Java 里接口的基本作用一样，TypeScript 也能够用它来明确的强制一个类去
          符合某种契约。
          ```typescript
            interface ClockInterface {
                currentTime: Date;
            }
            // - 强制 Clock 类符合 ClockInterface 接口的契约
            class Clock implements ClockInterface {
                currentTime: Date;
                constructor(h: number, m: number) { }
            }
          ```
        + 你也可以在接口中描述一个方法，在类里实现它，如同下面的 setTime 方法一样:
          ```typescript
            interface ClockInterface {
                currentTime: Date;
                setTime(d: Date);
            }
            class Clock implements ClockInterface {
                currentTime: Date;
                setTime(d: Date) {
                    this.currentTime = d;
                }
                constructor(h: number, m: number) { }
            }
          ```
        + 接口描述了类的公共部分，而不是公共和私有 2 部分。它不会帮你检查类是否具有某些私有
          成员。  
    + *区分: 类的"静态部分"与"实例部分"的不同*
      (Difference between the static and instance sides of classes)
        - 当你操作类和接口的时候，你要知道类是具有 2 个类型的: 静态部分的类型 和 实例的类型
          。当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误: 
          来看下面的示例:
        - 上面一段的第一句可以用下面这段白话理解: 
        - (PS: 我们都知道给构造函数添加的方法有原型上的方法(构造函数的实例可以继承，也可称为
          实例方法) 和给构造函数本身添加的 "静态方法", 由于 ES6 推出了构造函数的语法糖
          即"类"，所以给构造函数本身添加的方法也称为类的静态方法。)
          ```typescript
            interface ClockConstructor {
                // - 这里会报错，因为当一个类实现一个接口时，只对其实例部分进行类型检查。
                //   constructor 存在于类的静态部分，所以不在检查的范围。
                new (hour: number, minute: number);
            }
            class Clock implements ClockConstructor {
                currentTime: Date;
                constructor(h: number, m: number) {}
            }
          ```      
        - *(PS: 划重点)* 因此，我们应该直接操作类的静态部分。看下面的例子，我们定义了 
          2个接口，ClockConstructor 为构造函数所用, ClockInterface 为实例方法所用。
          为了方便我们再定义一个构造函数 createClock, 它用传入的类型创建实例。看示例:  
          ```typescript
            // - ClockConstructor 接口为构造函数所用
            interface ClockConstructor {
                new (hour: number, minute: number): ClockInterface;
            }
            // - ClockInterface 接口为实例方法所用
            interface ClockInterface {
                tick();
            }
            function createClock(ctor: ClockConstructor, hour: number, 
                minute: number): ClockInterface {
                return new ctor(hour, minute);
            }
            class DigitalClock implements ClockInterface {
                constructor(h: number, m:number) {}
                tick() {
                    console.log('beep beep');
                }
            }
            // - analog ['ænəlɒɡ] --adj.模拟的，类比的。 --n.类比
            class AnalogClock implements ClockInterface {
                construct(h: number, m: number) {}
                tick() {
                    console.log('tick tock');
                }
            }
            // - 因为 createClock 的第一个参数是 ClockConstructor 类型，在
            //   createClock(AnalogClock, 7, 32)里，会检查 AnalogClock 是否符合
            //   构造函数签名。
            let digital = createClock(DigitalClock, 12, 17);
            let analog = createClock(AnalogClock, 7, 32); 
          ```       
- **继承接口**
    + 和类一样，接口也可以相互继承。这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活
      地将接口分割到可重用的模块里。
      ```typescript
        interface Shape {
            color: string;
        }
        interface Square extends Shape {
            sideLength: number;
        }
        let square = <Square>{};
        square.color = 'blue';
        square.sideLength = 10;
      ```
    + 一个接口也可以继承多个接口，创建出多个接口的合成接口。
      ```typescript
        interface Shape {
            color: string;
        }
        interface PenStroke {
            penWidth: number;
        }
        interface Square extends Shape, PenStroke {
            sideLength: number;
        }
         let square = <Square>{};
        square.color = 'blue';
        square.sideLength = 10;
        square.penWidth = 5.0;
      ```  
- **混合类型**
    + 接口能描述 js 里丰富的类型。但是因为 js 其动态灵活的特点，有时你也希望一个对象可以同时
      具有上面提到的多种类型。
    + 一个例子就是，一个对象可以同时作为函数和对象使用，并带有额外的属性。
      ```typescript
        // - Counter 就可以看作是定义的一个函数类型的接口
        interface Counter {
            (start: number): string;
            interval: number;
            reset(): void;
        }
        // - Tip: 这个示例也真是...... 按照上面说 "对象可以同时作为函数和对象使用"，
        //   倒不如说 counter 就是一个函数，因为函数本身也是对象，所以在函数上定义属性和
        //   方法本身并没有什么特别的，只是我们在使用 JavaScript 时，一般规定在构造函数
        //   上才添加属性和方法，但是不要忘记了，没有 js 语法规定不可以在普通函数上定义
        //   属性和方法。
        function getCounter(): Counter {
            let counter = <Counter>function (start: number) {};
            counter.interval = 123;
            counter.reset = function() {};
            return counter;
        }
        let c = getCounter();
        // c(10);
        c.reset();
        c.interval = 5.0;
      ```
    + 在使用 JavaScript 第三方库的时候，你可能需要像上面那样去完整地定义类型。  
- **接口继承类**
    + 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。就好像接口声明了类中所有已
      存在的的成员，但并没有提供具体实现一样。接口同样会继承到类的 private 和 protected 
      成员。这意味着当你创建一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型
      只能被这个类或其子类所实现(implement)
    + 当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只有子类拥有特定属性时起作用。
      这个子类除了继承至基类外与基类没有任何关系。例:
      ```typescript
        // - (1)
        class Control {
            private state: any;
        }
        // - (2)
        interface SelectableControl extends Control {
            // - 当前接口描述了一个 select() 方法，此方法没有返回值
            select(): void;
        }
        // - (3)
        class Button extends Control implements SelectableControl {
            select() {}
        }
        // - (4)
        class TextBox extends Control {
            select() {}
        }
        // - 此处会报错，原因是在第 (2) 步，我们用 SelectableControl 接口继承了 
        //   Control 类，所以此接口隐式的含有了 Control 类的私有属性 state, 但是当前
        //   我们用 Image 类来实现 SelectableControl 接口时并没有定义 state 属性。
        class Image implements SelectableControl {
            select() {}
        }
        class Location {}
      ```  
    + 注释: (1)、定义一个 control 类，拥有一个私有属性 state
    + (2)、定义一个 SelectableControl 接口 继承 Control 类。 当前接口包含了 Control 
      类的所有成员，包括私有成员 state。 因为 state 是私有成员，所以只能够是 Control 的
      子类才能实现 SelectableControl 接口。(Tip: js 语法本身并没有私有属性)。因为只有
      Control 的子类才能拥有父类的私有属性，这对私有成员的兼容性是必需的。 实际上，
      SelectableControl 接口和拥有 select 方法的 Control 类是一样的。
    + (3)、定义一个 Button 子类继承于 Control 父类 并实现 SelectableControl 接口。
    + (4)、定义一个 Control 类的子类 TextBox。 Button 和 TextBox 类是
      SelectableControl 的子类 (因为他们都继承自 Control 并有 select 方法)，但 Image
      和 Location 类并不是这样的。


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


# 声明文件
1. 介绍
1. 结构
1. 举例
1. 规范
1. 深入
1. 模板
1. 发布
1. 使用


# 项目配置
1. tsconfig.json
1. 错误信息列表
1. 编译选项
1. 项目引用
1. MSBuild 编译选项
1. 构建工具集成
1. 每日构建
1. 





+ ```typescript
    
  ```
