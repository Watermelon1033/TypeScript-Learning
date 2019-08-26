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
// - {color: string; area: number} 为返回值的类型注解 
function createSquare(config:SquareConfig): {color:string; area:number} {
    let newSquare = {color: 'white', area: 100};
    // - 判断传入的 config 参数中是否存在 color 属性，如果存在，就把 color 属性赋值给
    //   newSquare.color
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