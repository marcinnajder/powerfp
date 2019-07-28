// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html

import * as assert from "assert";
import { curry, curryOnly } from "../src/index";
import { add3 } from "./testsUtils";


function obj(x: string, y: boolean, z: number) {
    return { x, y, z };
}

it('curry', function () {
    const addC = curry(add3);

    const result1 = add3(1, 2, 3);
    assert.equal(addC(1, 2, 3), result1);
    assert.equal(addC(1, 2)(3), result1);
    assert.equal(addC(1)(2)(3), result1);
    assert.equal(addC()(1)(2)(3), result1);
    assert.equal(addC(1)(2, 3), result1);

    const objC = curry(obj);
    const result2 = obj("", true, 2);
    assert.deepEqual(objC("", true, 2), result2);
    assert.deepEqual(objC("", true)(2), result2);
    assert.deepEqual(objC("")(true)(2), result2);
    assert.deepEqual(objC()("")(true)(2), result2);
    assert.deepEqual(objC("")(true, 2), result2);
});

it('curryOnly', function () {
    const addC = curryOnly(add3);

    const result1 = add3(1, 2, 3);
    assert.equal(addC(1)(2)(3), result1);
    assert.equal(typeof addC(1), "function");
    assert.equal(typeof addC(1)(2), "function");
    assert.equal(typeof addC(1)(2)(3), "number");

    const objC = curryOnly(obj);
    const result2 = obj("", true, 2);
    assert.deepEqual(objC("")(true)(2), result2);
});



/// ------------------------------------------------

/*
// there is a problem while currying generic function
function identity<T>(a:T) : T{
	return a;
}
const identityC = curry(identity);  // unfortunately inferred type is  cf2<unknown,unknown>


// found solution is to use generic factory function
var identityCF =  <T>() => curry<T,T>(identity);
var mapCF =  <T,R>() => curry<f<T,R>,T[],R[]>(map);

// it works but type inference does not work and types must be set manually
var array = mapCF<string,number>()( s => s.length)(["asd"]);

// ... ans still 'map' does not play nicely with pipe operator :()
// maybe using manually the lambda is the best option
pipe(
	[1,2,3,4],
	mapCF<number, number>()(s => s +1),
	reverse // type error :/
);


const map = <T,R>(f: f<T,R>, items: T[]): R[] => items.map(f);
const filter = <T>(f: f<T,boolean>, items: T[]): T[] => items.filter(f);
const reduce = <T, A>(f: f3<A,T,A>, init: A, items: T[]): A => items.reduce(f, init);
const reverse = <T>(items: T[]): T[] => items.reverse();




// function makeF__() : <T>(item: T) => T[] {
//     return x => new Array().map( _ => x);
// }
*/