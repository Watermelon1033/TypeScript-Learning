var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c);

var ListOfNames;
(function (ListOfNames) {
    ListOfNames[ListOfNames["Inderk"] = 0] = "Inderk";
    ListOfNames[ListOfNames["John"] = 1] = "John";
    ListOfNames[ListOfNames["Jane"] = 2] = "Jane";
})(ListOfNames || (ListOfNames = {}));
var Indrek = ListOfNames[0];
console.log(Indrek);
