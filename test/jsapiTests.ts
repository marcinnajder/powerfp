import * as assert from "assert";
import { add, stringToLowerCase, stringToUpperCase, stringIndexOf, stringConcat, stringSplit, stringJoin, arrayMapF, pipe, arrayFilterF, arrayReduceF, arrayReverse } from "../src/index";

it('jsapi', function () {
    assert.equal(add(1, 2), 3);
    assert.equal(add(1)(2), 3);
    assert.equal(stringToLowerCase("abC"), "abc");
    assert.equal(stringToUpperCase("abC"), "ABC");
    assert.equal(stringIndexOf("b", "aabc"), 2);
    assert.equal(stringConcat("b", "a"), "ab");
    assert.deepEqual(stringSplit(",", "a,bb,ccc"), ["a", "bb", "ccc"]);
    assert.deepEqual(stringJoin(",", ["a", "bb", "ccc"]), "a,bb,ccc");

    assert.deepEqual(pipe(["a", "bb", "ccc"], _ => _.map(s => s.length)), [1, 2, 3]);
    assert.deepEqual(pipe(["a", "bb", "ccc"], arrayMapF<string, number>()(s => s.length)), [1, 2, 3]);
    assert.deepEqual(pipe(["a", "bb", "ccc"], arrayFilterF<string>()(s => s.length > 1)), ["bb", "ccc"]);
    assert.equal(pipe(["a", "bb", "ccc"], arrayReduceF<string, number>()((p, c) => p + c.length, 0)), 6);
    assert.deepEqual(arrayReverse(["a", "bb", "ccc"]), ["ccc", "bb", "a"]);
});


