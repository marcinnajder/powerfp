// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html

import * as assert from "assert";
import { curry } from "../src/index";

function add(a: number, b: number, c: number) {
    return a + b + c;
}

function obj(x: string, y: boolean, z: number) {
    return { x, y, z };
}


it('curry', function () {
    const addC = curry(add);

    const result1 = add(1, 2, 3);
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
