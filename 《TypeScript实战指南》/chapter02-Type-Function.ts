/**
 * ## 第 2 章：类型与函数
 *
 */


/**
 * > **2.1.1 JavaScript 基本数据类型**
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
 * 2.1.2 TypeScript 的基本数据类型
 *
 */
// 模板字符串: 由 反引号（``）包围，使用 `$` 向子句中插入表达式。
let name01: string = `xiaoming`;
let age: number = 37;
let sentence: string = `Hello, my name is ${name01}.
    I'll be ${30 +1} years old next month.`;
console.log(sentence);







