# TypeScript 官网文档
> TypeScript 并不是一个完全新的语言，它是 JavaScript 的超集，为 JavaScript 的生态增加了
  类型机制(类型注解)，并最终将代码编译为纯粹的 js 代码。

# 手册指南

##  1. 基础类型 Basic Types
1. 布尔值 Boolean
    
    + `typescript let isDone: boolean = false;`
1. 数字 Number
    
    + `typescript let num: number = 37;`
1. 字符串 String
    
    + `typescript let name: string = 'Gene';`
1. 数组 Array
    + typescript 有 2 种方式可以定义数组:
        1. `typescript let list: number[] = [1, 2, 3]; `
        2. `typescript let list: Array<number> = [1, 2, 3];`
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
    - ```typescript
        enum Color {Red, Green, Blue}
        let c: Color = Color.Green;
        ```
    - 默认情况下，从 0 开始为元素编号。你也可以手动的指定成员的数值。例如，我们将上面的
        例子改成从 1 开始编号:
    - ```typescript
        enum Color {Red = 1, Green, Blue}
        let c: Color = Color.Green;
        ```
    - 或者，全部都采用手动赋值:
    - ```typescript
        enum Color {Red = 1, Green = 2, Blue = 4}
        let c: Color = Color.Green;
      ```
    - 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。例如，我们知道数值为 2，但是
        不确定它映射到 Color 里的哪个名字，我肯可以查找相应的名字：
    - ```typescript
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
            readonly x:; number;
            readonly y: number;
        }
        let p1: Point = {x: 10, y: 20};
        p1.x = 5;   // error 
      ```
    + TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变
      方法去掉了，因此可以确保数组创建后再也不能被修改:
      ```typescript
        let a: number[] = [1, 2, 3, 4];
        let ro: ReadonlyArray<number> = a;
        ro[0] = 12; // error
        ro.push(5); // error
        a = ro; // error
      ```
    + 上面代码的最后一行，可以看到就算把整个 ReadonlyArray 赋值给一个普通数组也是不可的。
      但是可以使用类型断言重写:  ```typescript a = ro as number[]```    
    + `readonly` vs `const`: 作为变量使用 const, 若作为属性则使用 readonly.
- **额外的属性检查**
    + 略
- **函数类型**
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
        }

        // - 对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。比如，
        //   我们使用下面的代码重写上面的例子:
        let mySearch: SearchFunc;
        mySearch = function(src: string, sub: string): boolean {
            let result = src.search(sub);
            return result > -1;
        }

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
            name； string;
        }
        class Dog extends Animal {
            breed: string;
        }
        // - 错误: 使用数值型的字符串索引，有时会得到完全不同的 Animal
        interface NotOkay {
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
- **类类型**
- **继承接口**
- **混合类型**
- **接口继承类**

##  4. 类 Classes

##  5. 函数 Functions

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
