/**
 * ## 手册指南
 * 1. 基础类型
 * 2. 变量声明
 * 3. 接口
 * 4. 类
 * 5. 函数
 * 6. 泛型
 * 7. 枚举
 * 8. 类型推论
 * 9. 类型兼容性
 * 10. 高级类型
 * 11. Symbols
 * 12. 迭代器和生成器
 * 13. 模块
 * 14. 命名空间
 * 15. 命名空间和模块
 * 16. 模块解析
 * 17. 声明合并
 * 18. JSX
 * 19. 装饰器
 * 20. Mixins
 * 21. 三斜线指令
 * 22. JavaScript 文件类型检查
 */

// - 类型注解
function greeter(person: string) {
    return "Hello, " + person;
}
let user = "Jane User";
console.log(greeter(user)); // Hello, Jane User


// - 3.接口: 我们使用接口来描述一个拥有 firstName 和 LastName 字段的对象。在 TypeScript
//   里，只要两个类型内部的结构兼容那么这两个类型就是兼容的。这允许我们在实现接口时候只要保证
//   了接口要求的结构就可以，不必明确地使用 implements 语句。
interface Person {
    firstName: string;
    lastName: string;
}
function greet(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
let usr = {
    firstName: "Jean",
    lastName: "Valjean"
};
console.log("greet: ", greet(usr)); // greet:  Hello, Jean Valjean


// - 4.类
(function() {
    class Student {
        fullName: string;
        // 在构造函数的参数上使用 public 等同于创建了同名的成员变量。
        constructor(public firstName, public middleInitial, public lastName) {
            this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
        }
    }
    
    // 这个示例不太明白，定义的
    interface Person {
        firstName: string;
        lastName: string;
    }

    function greet(person: Person) {
        return "Hello, " + person.firstName + " " + person.lastName;
    }
    let usr = new Student("Jean", ".M.", "Valjean");
    console.log("greet: ", greet(usr)); // greet:  Hello, Jean Valjean
    
})();

// - 5.函数：函数类型包含 2 个部分： 参数类型和返回值类型。当写出完整函数类型的时候，
//   这两部分都是需要的。
(function() {
    // 编译为 js 就是: let myAdd = function(x, y) {return x + y; }
    let myAdd:(x: number, y: number) => number 
        = function(x: number, y: number): number {return x + y;}

    // - this 参数
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }
    let deck: Deck = {
        suits: ['hearts', 'spades', 'clubs', 'diamonds'],
        cards: Array(52),
        // NOTE: The function now explicitly specifies that its callee must be
        // of type Deck
        createCardPicker: function(this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
                
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }
    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
})();


// - 6.泛型
(function() {
    // - 可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己
    //   的数据类型来使用组件。

    // - **类型变量**：我们需要一种方法使返回值得类型与传入参数的类型是相同的。这里，我们
    //   使用了 “类型变量”，它是一种特殊的变量，只用于表示类型而不是值。
    
    // - 我们给 identity 添加了 "类型变量 T"。T 帮助我们捕获用于传入的类型 (比如:string)
    //   ，之后我们就可以使用这个类型。之后我们再次使用了 T 当做返回值类型。现在我们可以知道
    //   参数类型与返回值类型是相同的了。这允许我们跟踪函数里使用的类型的信息。
    // - 我们把这个版本的 identity 函数叫做泛型函数，因为它可以适用于多个类型。
    function identity<T>(arg: T): T {
        return arg;
    }
    // - 第 1 种使用“泛型函数”的方法，传入所有的参数，包含类型参数。
    let output = identity<string>("myString");

    // - 第 2 种方法更普遍。利用了 类型推论--即编译器会根据传入的参数自动地帮助我们确定 
    //   T 的类型：
    let output2 = identity("myString2");

})();

// - 7.枚举
(function() {

    // - 运行时的枚举
    // 编译之后为：
    // var E;
    // (function (E) {
    //     E[E["X"] = 0] = "X";
    //     E[E["Y"] = 1] = "Y";
    //     E[E["Z"] = 2] = "Z";
    // })(E || (E = {}));
    enum E {
        X, Y, Z
    }
    function f(obj: {X: number}) {
        return obj.X;
    }
    console.log("f(E):", f(E));  // f(E): 0


    // - 反向映射: 根据下面生成的 js 代码可以看出， 枚举类型被编译成一个对象，它包含了
    //   正向映射（name -> value）和反向映射（value -> name）。引用枚举成员总会生成为
    //   对属性访问并且永远也不会内联代码。要注意的是，不会为字符串枚举成员生成反向映射。
    // var Enum;
    // (function (Enum) {
    //     Enum[Enum["A"] = 0] = "A";
    // })(Enum || (Enum = {}));
    enum Enum {
        A
    }
    let a = Enum.A;
    let nameOfA = Enum[a];


    // - 常量枚举


    // - 外部枚举
    // declare enum En {
    //     A = 1,
    //     B,
    //     C = 2
    // }

})();


// - 9.类型兼容性在: 类型兼容性用于确定一个类型是否能赋值给其他类型。
(function() {
    interface Named {
        name: string;
    }
    let x: Named;
    let y = {name: 'Alice', location: 'Seattle'};
    // x = y;
    // x:  { name: 'Alice', location: 'Seattle' }
    // console.log("x: ", x);

    // 类
    class Animal {
        feet: number;
        constructor(name: string, numFeet: number) {}
    }
    class Size {
        feet: number;
        constructor(numFeet: number) {}
    }

    let a: Animal;
    let s: Size;
    a = new Animal('elephant', 5);
    s = new Size(6);
    console.log(a == s);
})();



// - 10.高级类型
(function() {
    // - 交叉类型 (Intersection Types): 交叉类型是将多个类型合并为一个类型。这让我们
    //   可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。
    function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U>{};
        for (let id in first) {
            (<any>result)[id] = (<any>first)[id];
        }
        for (let id in second) {
            if (!result.hasOwnProperty(id)) {
                (<any>result)[id] = (<any>second)[id];
            }
        }
        return result;
    }
    class Person {
        constructor(public name: string){};
    }
    interface Loggable {
        log(): void;
    }
    class ConsoleLogger implements Loggable {
        log() {
            // ...
        }
    }
    let jim = extend(new Person('Jim'), new ConsoleLogger());
    let n = jim.name;
    console.log("n: ", n);
    jim.log();

})();
