interface SquareConfig {
    // - color 和 width 都为可选属性
    color?: string;
    width?: number;
}

// - 接口 SquareConfig 为参数的类型注解；
// - {color: string; area: number} 为返回值的类型注解 
function createSquare(config: SquareConfig): { color: string; area: number } {
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


// - 3.6 可索引的类型
(function() {
    interface StringArray {
        [index: number]: string;
    }
    let myArray: StringArray = ['Bob', 'Fred'];
    console.log(myArray[0]);     // => "Bob"

    // - 字符串索引 -- 约束对象
    interface StringObject {
        // - key 的类型为 string, 一般都代表是对象. 返回值也必须是 string
        [index: string]: string;
    }
    let obj:StringObject = {name: 'ccc', gender:'male'};
    console.log(obj['name']);


    class Animal {
        // - Animal 类有一个字符串类型的属性 name
        name: string;
    }
    class Dog extends Animal {
        breed: string
    }
    interface isOkay {
        [index: number]: Dog;
        // [val: string]: Animal;
    }

    let one = new Dog()
    one.name = "TaiDi";
    one.breed = "Unknown";

    let two = new Dog();
    two.name = "ErHa";
    two.breed = "Unknown also";

    let dogs = [one, two];

    let okDogs:isOkay = dogs;
    
    console.log("狗的名字: " + okDogs[1].name + ". 品种: " + okDogs[1].breed);

})();



interface ClockConstructor {
    new(hour: number, minute: number);
}
interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
    tick();
}

function createClock(
    ctor: ClockConstructor,
    hour: number,
    minute: number
): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {}
    tick() {
        console.log('beep beep');
    }
}


class AnalogClock implements ClockInterface {
    construct(h: number, m: number) {}
    tick() {
        console.log('tick tick');
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// // - 接口继承类
// (function () {
//     // - (1)
//     class Control {
//         private state: any;
//     }

//     // - (2)
//     interface SelectableControl extends Control {
//         // - 当前接口描述了一个 select() 方法，此方法没有返回值
//         select(): void;
//     }

//     // - (3)
//     class Button extends Control implements SelectableControl {
//         select() {
//         }
//     }

//     // - (4)
//     class TextBox extends Control {
//         select() {
//         }
//     }

// })();