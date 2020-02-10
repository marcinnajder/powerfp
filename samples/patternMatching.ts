import { match, Option_some, Option, rest, ResultS, none, some, matchUnion, isUnion } from "../src/index";


function execute(f: Function) {
    console.log(f.toString(), "---->", f());
}

// https://docs.microsoft.com/pl-pl/dotnet/fsharp/language-reference/pattern-matching

// F# pattern matching samples

// ********* Constant Patterns ********* 

// let Three = 3
// let filter123 x =
//     match x with
//     | 1 | 2 | Three -> printfn "Found 1, 2, or 3!"
//     | var1 -> printfn "%d" var1

function filter123(x: number) {
    const tree = 3;
    return match(x,
        [1], [2], [tree, _ => "Found 1, 2, or 3!"],
        var1 => var1.toString(),
    );
}
execute(() => filter123(1));
execute(() => filter123(2));
execute(() => filter123(3));
execute(() => filter123(4));
console.log();


// type Color =
//     | Red = 0
//     | Green = 1
//     | Blue = 2

// let printColorName (color:Color) =
//     match color with
//     | Color.Red -> printfn "Red"
//     | Color.Green -> printfn "Green"
//     | Color.Blue -> printfn "Blue"
//     | _ -> ()


enum Color { Red, Green, Blue };

function printColorName(color: Color) {
    return match(color,
        [Color.Red, _ => console.log("red!")],
        [Color.Green, _ => console.log("green!")],
        [Color.Blue, _ => console.log("blue!")]
    );
}

execute(() => printColorName(Color.Blue));
execute(() => printColorName(Color.Green));
execute(() => printColorName(Color.Red));
console.log();


// ********* Identifier Patterns ********* 

// let printOption (data : int option) =
//     match data with
//     | Some var1  -> printfn "%d" var1
//     | None -> ()

function printOption(data: Option<number>) {
    return match(data,
        [{ type: "some" }, (cc) => console.log((cc as Option_some<number>).value)],  // todo: nawet jawnie nie mozna podac typu
        [{ type: "none" }, () => { }]
    );
}

execute(() => printOption(none));
execute(() => printOption(some(123)));
console.log();

// type PersonName =
//     | FirstOnly of string
//     | LastOnly of string
//     | FirstLast of string * string

// let constructQuery personName =
//     match personName with
//     | FirstOnly(firstName) -> printf "May I call you %s?" firstName
//     | LastOnly(lastName) -> printf "Are you Mr. or Ms. %s?" lastName
//     | FirstLast(firstName, lastName) -> printf "Are you %s %s?" firstName lastName

type PersonName =
    | { type: "firstOnly", firstName: string }
    | { type: "lastOnly", lastName: string }
    | { type: "firstLast", firstName: string, lastName: string };

function constructQuery(personName: PersonName) {
    matchUnion(personName, {
        firstOnly: ({ firstName }) => console.log(`May I call you ${firstName}?`),
        lastOnly: ({ lastName }) => console.log(`Are you Mr. or Ms. ${lastName}?`),
        firstLast: ({ firstName, lastName }) => console.log(`Are you ${firstName} ${lastName}`)
    });
}


execute(() => constructQuery({ type: "firstOnly", firstName: "marcin" }));
execute(() => constructQuery({ type: "firstLast", firstName: "marcin", lastName: "najder" }));
console.log();


// let matchShape shape =
//     match shape with
//     | Rectangle(height = h) -> printfn "Rectangle with length %f" h
//     | Circle(r) -> printfn "Circle with radius %f" r

// match shape with
//     | Rectangle(height = h; width = w) -> printfn "Rectangle with height %f and width %f" h w
//     | _ -> ()

type Shape =
    | { type: "Rectangle", height: number }
    | { type: "Circle", r: number };


function matchShape(shape: Shape) {
    matchUnion(shape, {
        Rectangle: ({ height }) => console.log(`Rectangle with length ${height}`),
        Circle: ({ r }) => console.log(`Circle with radius ${r}`),
    });
}

execute(() => matchShape({ type: "Rectangle", height: 10 }));
execute(() => matchShape({ type: "Circle", r: 20 }));
console.log();


//  ********* Variable Patterns *********

// let function1 x =
//     match x with
//     | (var1, var2) when var1 > var2 -> printfn "%d is greater than %d" var1 var2
//     | (var1, var2) when var1 < var2 -> printfn "%d is less than %d" var1 var2
//     | (var1, var2) -> printfn "%d equals %d" var1 var2


function variable(arg: [number, number]) {
    return match(arg,
        [([var1, var2]) => var1 > var2, ([var1, var2]) => console.log(`"${var1} is greater than ${var2}"`)],
        [([var1, var2]) => var1 < var2, ([var1, var2]) => console.log(`"${var1} is less than ${var2}"`)],
        ([var1, var2]) => console.log(`"${var1} equals ${var2}"`)
    );
}

execute(() => variable([10, 20]));
execute(() => variable([20, 10]));
execute(() => variable([10, 10]));
console.log();

// let detectZeroOR point =
//     match point with
//     | (0, 0) | (0, _) | (_, 0) -> printfn "Zero found."
//     | _ -> printfn "Both nonzero."

function detectZeroOR(arg: [number, number]) {
    return match(arg,
        [[0, 0]],
        [[, 0]],
        [[0, ,], () => console.log("Zero found.")],
        _ => console.log("Both nonzero.")
    );
}
execute(() => detectZeroOR([0, 0]));
execute(() => detectZeroOR([0, 20]));
execute(() => detectZeroOR([20, 10]));
console.log();


// let listLength list =
//     match list with
//     | [] -> 0
//     | [ _ ] -> 1
//     | [ _; _ ] -> 2
//     | [ _; _; _ ] -> 3
//     | _ -> List.length list


function listLength<T>(list: T[]) {
    return match(list,
        [[], () => 0],
        [[,], () => 1],
        [[, ,], () => 2],
        _ => list.length
    );
}
execute(() => listLength([]));
execute(() => listLength([1]));
execute(() => listLength([1, 1]));
execute(() => listLength([1, 1, 1, 1]));
console.log();

// let IsMatchByName record1 (name: string) =
//     match record1 with
//     | { MyRecord.Name = nameFound; MyRecord.ID = _; } when nameFound = name -> true
//     | _ -> false

type MyRecord = { name: string; id: number; }

function isMatchByName<T>(record1: MyRecord, name: string) {
    return match(record1,
        [r => r.name === name, () => true],
        _ => false
    );
}

execute(() => isMatchByName({ id: 1, name: "marcin" }, "marcin"));
execute(() => isMatchByName({ id: 1, name: "marcin" }, "marcin2"));
console.log();




// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// sum types


type ListType = "list" | "vector";
type MalFuncType = (args: MalType[]) => ResultS<MalType>;
type MapType = { [key: string]: MalType };
//export type KeyType = MalType_keyword | MalType_string_;
type MalType_with_meta = { meta: MalType };

type MalType =
    | { type: "number_"; value: number }
    | { type: "symbol"; name: string; meta: MalType }
    | { type: "list"; items: MalType[]; listType: ListType; meta: MalType }
    | { type: "nil" }
    | { type: "true_" }
    | { type: "false_" }
    | { type: "string_"; value: string }
    | { type: "keyword"; name: string }
    | { type: "fn"; fn: MalFuncType; meta: MalType }
    | { type: "atom"; mal: MalType }
    | { type: "map"; map: MapType; meta: MalType }
    ;


function print(mal: MalType) {
    return match(mal,
        [{ type: "symbol" }, () => "symbol"],
        [{ type: "list", items: [{ type: "nil" }] }, () => "list with only nil"],
        _ => "other mal type"
    );
}

execute(() => print({ type: "symbol", name: "a", meta: { type: "nil" } }));
execute(() => print({ type: "list", items: [{ type: "nil" }], listType: "list", meta: { type: "nil" } }));
execute(() => print({ type: "nil" }));
console.log();



// ----------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------

// simple values, tuples, records, arrays

const values = (n: number) =>
    match(n,
        [1, `wartosc 1`],
        [2, `wartosc 2`],
        [3], [4], [5, `wartosc 3 lub 4 lub 5`],
        [v => v > 10 && v < 20, v => `wartosc pomiedzy 10 a 20 a dokladnie ${v}`],
        v => `wartosc ${v}`
    );
execute(() => values(1));
execute(() => values(2));
execute(() => values(3));
execute(() => values(15));
execute(() => values(150));
console.log();


const tuples = (t: [number, string]) =>
    match(t,
        [[9, "a"], `pair of values (9,"a")`],
        [[9, ,], ([, b]) => `pair of values where first is 9`],
        [[, "a"], ([a]) => `pair of values where second is "a"`],
        [([a, b]) => a === b.length, ([a]) => `string value has length the same as first value`],
        v => `other pair of values ${v}`
    );

execute(() => tuples([9, "a"]));
execute(() => tuples([9, "b"]));
execute(() => tuples([99, "a"]));
execute(() => tuples([3, "aaa"]));
execute(() => tuples([3, "aaaa"]));
console.log();


type Person = {
    name: string;
    age?: number;
    address?: {
        city?: string;
        street?: string;
    };
    phones?: string[];
}

const records = (r: Person) =>
    match(r,
        [{ name: "marcin" }, `person with name 'marcin'`],
        [{ name: "lukasz", address: { city: "wroclaw" } }, `person with name 'marcin' from city 'wroclaw' `],
        [(({ age }) => age! > 30), `person is older than 30 `],
        p => "other person: " + JSON.stringify(p)
    );

execute(() => records({ name: "marcin" }));
execute(() => records({ name: "lukasz", address: { city: "wroclaw" } }));
execute(() => records({ name: "lukasz", age: 50 }));
execute(() => records({ name: "lukasz", age: 10 }));
console.log();



const arrays = (a: number[]) =>
    match(a,
        [[], `empty array`],
        [[888], `array with only one value 888`],
        [[, 999], `array with 2 values where second is 999`],
        [[0, 0, rest], `array with values 2 values '0' at the beginning`],
        a => "other array " + a
    );

execute(() => arrays([]));
execute(() => arrays([888]));
execute(() => arrays([1, 999]));
execute(() => arrays([1, 999, 1]));
execute(() => arrays([0,]));
execute(() => arrays([0, 0]));
execute(() => arrays([0, 0, 0]));
console.log();
