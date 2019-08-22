# TypeScript 基础篇
- [文章来源](https://github.com/MuYunyun/blog/blob/master/BasicSkill/typescript/TypeScript%E5%9F%BA%E7%A1%80%E7%AF%87.md)
- 《TypeScript 实战指南》笔记

## 数据类型

#### String 类型
- 一个保存字符串的文本，类型声明为 string。类型声明可大写也可小写。
- ```typescript
    let name: string = 'Mu';
    let name2: String = 'Jack';
  ```

#### Boolean 类型 

#### Number 类型

#### Array 类型

#### Tuple 类型

#### 枚举 enumerable 
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
  
#### Any 类型

#### Void 类型

#### Unknow 类型

#### Never 类型


## 函数
#### 为函数定义类型
#### 可选参数和默认参数
#### 


## 类
#### 类
#### 继承
#### 存储器


## 接口
#### 接口
#### 可选属性
#### 函数类型
#### 可索引类型
#### 类类型
#### 继承接口


## 模块


## 泛型
#### 初探泛型

## 
