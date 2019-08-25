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
        enum Color {Red = 1, Green, Blue};
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
        prettySure.toFixed();   // Error: Property 'toFixed' doesn't exist on type 'Object'.
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
        create(42);     // Error
        create('string');   // Error
        create('false');   // Error
        create('undefined');   // Error
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
- 接口初探
    + ```typescript
        // - Tip: 花括号里的 label: string; string 只是 label 属性的注解，
        //   并不是键值对。
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
      允许的。 
    + 另外，类型检查器不会去检查属性的顺序，只要相应的属性寸在并且类型也是对的就可以。
- 可选属性
    + 接口里的属性不全都是必需的。有些是只在某些条件下存在，或者根本不存在。可选属性在
      应用 "option bags (选择袋)" 模式是很常用，即给函数传入的参数对象中只有部分属性
      赋值了。下面是应用了 "option bags" 的例子:
    + ```typescript
        interface SquareConfig {
            color?: string;
            width?: number;
        }
      ```  
- 只读属性
- 额外的属性检查
- 函数类型
- 可索引的类型
- 类类型
- 继承接口
- 混合类型
- 接口继承类

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