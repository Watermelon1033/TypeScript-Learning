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




// + **区分: 类的"静态部分"与"实例部分"的不同**
//   (Difference between the static and instance sides of classes)
// - 当你操作类和接口的时候，你要知道类是具有 2 个类型的: 静态部分的类型 和 实例的类型
//   。当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误:
//   来看下面的示例:
// - 上面一段的第一句可以用下面这段白话理解: 
// - (PS: 我们都知道给构造函数添加的方法有原型上的方法(构造函数的实例可以继承，也可称为
//   实例方法) 和给构造函数本身添加的 "静态方法", 由于 ES6 推出了构造函数的语法糖
//   即"类"，所以给构造函数本身添加的方法也称为类的静态方法。)
interface ClockConstructor {
    // - Clock 类内部的 constructor 存在于类的静态部分(即: 类的静态方法)，
    //   所以不在接口的检查范围内。
    new(hour: number, minute: number);
}

// - 这里会报错，因为当一个类实现一个接口时，只对其实例部分进行类型检查。constructor
//   存在于类的静态部分，所以不在检查的范围。
// class Clock implements ClockConstructor {
//     currentTime: Date;
//     constructor(h: number, m: number) {}
// }

// - *(PS: 划重点)* 因此，我们应该直接操作类的静态部分。看下面的例子，我们定义了 
//   2个接口，ClockConstructor 为构造函数所用, ClockInterface 为实例方法所用。
//   为了方便我们再定义一个构造函数 createClock, 它用传入的类型创建实例。看示例:  

// - ClockConstructor 接口为构造函数所用
interface ClockConstructor {
    new(hour: number, minute: number): ClockInterface;
}

// - ClockInterface 接口为实例方法所用
interface ClockInterface {
    tick();
}

function createClock(ctor: ClockConstructor, hour: number, minute: number):
    ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) {
    }

    tick() {
        console.log('beep beep');
    }
}

// - analog ['ænəlɒɡ] --adj.模拟的，类比的。 --n.类比
class AnalogClock implements ClockInterface {
    construct(h: number, m: number) {
    }

    tick() {
        console.log('tick tock');
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// - 接口继承类
(function () {
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
        select() {
        }
    }

    // - (4)
    class TextBox extends Control {
        select() {
        }
    }

})();