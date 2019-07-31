/**
 * ## 第 2 章：类型与函数
 *
 */


/**
 * ### 2.1.1 JavaScript 基本数据类型
 * - 6 种基本数据类型:
 *   + Undefined (未定义): Undefined类型，一个没有被赋值的变量会有一个默认值undefined.
 *   + Null (空值):        Null类型只有一个值: null。
 *   + Boolean (布尔值):   布尔类型表示一个逻辑实体，可以有两个值: true和false
 *   + Number (数字)
 *   + String (字符串)
 *   + Symbol (符号， ES6 中新增)
 * - 1 种复杂数据类型: Object
 */


/**
 * ### 2.1.2 TypeScript 的基本类型
 * - 作为 JS 的超集，TS 支持与 JS 几乎相同的数据类型。
 * 
 * 
 */

// - 声明 boolean 类型
let areYouOk: boolean = true;

// - 声明数字
let a: number  = 6;

// 模板字符串: 由 反引号（``）包围，使用 `$` 向子句中插入表达式。
let name01: string = `xiaoming`;
let name_2: string = 'Wang';
let age: number = 37;
let sentence: string = `Hello, my name is ${name01}.
    I'll be ${30 +1} years old next month.`;
console.log(sentence);

// TS 定义数组的两种方式
let list_01: number[] = [1, 2, 3];
let list_02: Array<number> = [4, 5, 6];


/** 
 * ### 2.1.3 变量声明 
 * - let / const
 * - 类型断言的两种方法
 */

 // - 类型断言的 2 种方法： 
 //     + (1). 尖括号
 //     + (2). as 关键字
 
 let oneString01: any = "this is a string";
 let string01Length: number = (<string>oneString01).length;

 let oneString02: any = "this is a string";
 let string02Length: number = (oneString02 as string).length;
 console.log("string02Length: " , string02Length);


 /**
  * ### 2.1.4 泛型
  *  - 1、泛型函数
  *  - 2、泛型变量
  */

// - 1、泛型函数
//   + 给函数的参数添加了泛型变量 T， T代表用户即将传入的类型。而在最后，我们还是用 T 作为
//     返回值得类型。这就达到了返回值和参数类型相同的目的，保持了函数表达式的准确性。
function hello<T>(arg: T): T {
    return arg;
}
//   + 怎么使用泛型函数？和上面的类型断言一样有 2 中选择：
//        - (1)、使用尖括号方式进行表达.  
// 指定 T 是 string 类型，并将它作为参数传递给函数。
let outputHello = hello<string>("Hello TypeScript");
//        - (2)、使用类型推断。（和正常的 js 调用一样）
let output = hello("Hello TypeScript");

// - 2、泛型变量



/**
 * ### 2.1.5 枚举 (enumerable)
 *  - 1、数字枚举
 *  - 2、字符串枚举
 *  - 3、反向映射
 */

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


// - 3、反向映射
enum Enume01{
    A
}
console.log(Enume01); // {'0': 'A', A: 0 }
console.log("Enume01.A: ", Enume01.A);  // 0
console.log("Enume01['0']: ", Enume01['0']);    // A
console.log("Enume01['A']: ", Enume01['A']);    // 0


/**
 * ### 2.1.6 Symbol 符号
 * 
 */



/**
 * ### 2.1.7 iterator 和 generator
 * - 1、iterator 迭代器
 * - 2、generator 生成器
 */
 // - 1、iterator
 //    + for...of 和 for...in 都可以迭代一个数组，但最明显的区别是它们用于迭代器的返回值
 //      并不相同，for...in 迭代的是对象的键，而 for...of 迭代的是对象的值。
 const arr = [233, 'Hello', true];
 for (let value of arr) {
     console.log("arr's value: ", value);
 } 
 for (let key in arr) {
     // arr's key:  0
     // arr's key:  1
     // arr's key:  2
     console.log("arr's key: ", key);
 }



 /**
  * ### 2.2.3 类型保护与区分类型
  * 
  */
 interface Teacher {
     teach(): void;
 }
 interface Student {
     learn(): void;
 }
 function getPerson(): Teacher | Student {
     return {} as Teacher;
 }
 const person = getPerson();
 function isTeacher(person: Teacher | Student): person is Teacher {
     return (<Teacher>person).teach !== undefined;
 }
 if (isTeacher(person)) {
     person.teach();
 } else {
     person.learn();
 }
