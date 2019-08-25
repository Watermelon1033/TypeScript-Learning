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
