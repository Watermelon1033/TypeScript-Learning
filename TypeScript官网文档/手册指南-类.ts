// - 手册指南 -- 类

// - 下面我们来看一个复杂的例子: 
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

// - 存取器 (Accessor)
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

// - 静态属性
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


// - 抽象类
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


// - 高级技巧 - 构造函数
// - Tip: 注意 Greeter 类中没有定义 constructor(). 那么定义 Greeter 类
//   需要的 constructor() 方法 ts 在哪里定义的呢？ A: 即下面的
//   `let greeterMaker: typeof Greeter = Greeter `
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
//   class itself" rather than the instance type. Or, more precisely,
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
 
