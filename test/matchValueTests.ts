import { matchValue } from "../src/matchValue";
import * as assert from "assert";
import { rest } from "../src/match";

describe('matchValue', function () {

    it('primitive_values', function () {
        // number
        assert.equal(matchValue(1, 1), true);
        assert.equal(matchValue(1, 2 as any), false);
        // string
        assert.equal(matchValue("a", "a"), true);
        assert.equal(matchValue("a", "ab" as any), false);
        // boolean
        assert.equal(matchValue(false, false), true);
        assert.equal(matchValue(false, true as any), false);
        // null
        assert.equal(matchValue(null, null), true);
        assert.equal(matchValue(null, undefined as any), false);
        // undefined
        assert.equal(matchValue(undefined, undefined), true);
        assert.equal(matchValue(undefined, null as any), false);
        // Symbol
        const sym = Symbol();
        assert.equal(matchValue(sym, sym), true);
        assert.equal(matchValue(sym, Symbol() as any), false);

        // Nan
        assert.equal(matchValue(NaN, NaN), true);
        assert.equal(matchValue(NaN, 1), false);
    });

    it('array_values', function () {
        // wrong array type
        assert.equal(matchValue({}, []), false);

        // size - tuple
        assert.equal(matchValue([], []), true);
        assert.equal(matchValue([1], [1]), true);
        assert.equal(matchValue([1, 2], [1, 2]), true);
        assert.equal(matchValue([1, 2, 3], [1, 2]), false);
        assert.equal(matchValue([1], [1, 2]), false);

        // size - regular array
        const pattern2 = [1, 2, rest];
        assert.equal(matchValue([1, 2], pattern2), true);
        assert.equal(matchValue([1, 2, 3], pattern2), true);
        assert.equal(matchValue([1, 2, 3, 4], pattern2), true);
        assert.equal(matchValue([1], pattern2), false);
        assert.equal(matchValue([], pattern2), false);

        // size - regular array with only rest
        const pattern3 = [rest];
        assert.equal(matchValue([], pattern3), true);
        assert.equal(matchValue([1], pattern3), true);
        assert.equal(matchValue([1, 2], pattern3), true);

        // patterns without rest
        const pattern4 = [, , 1, , 5];
        assert.equal(matchValue([3, 3, 1, 3, 5], pattern4), true);
        assert.equal(matchValue([3, 3, 1, 3, 3], pattern4), false);
        assert.equal(matchValue([, , 1, , 5], pattern4), true);
        assert.equal(matchValue([1], [,]), true);
        assert.equal(matchValue([,], [,]), true);
        assert.equal(matchValue([], [,]), false);


        // // patterns with rest
        const pattern5 = [, , 1, rest];
        assert.equal(matchValue([3, 3, 1], pattern5), true);
        assert.equal(matchValue([3, 3, 1, 7], pattern5), true);
        assert.equal(matchValue([3, 3], pattern5), false);
        assert.equal(matchValue([rest, 1], [rest, 1]), true);
        assert.equal(matchValue([rest, 1], [rest, 1, 2]), false);
    });

    it('object_values', function () {
        // value is null or undefined
        assert.equal(matchValue(null, {} as any), false);
        assert.equal(matchValue(undefined, {} as any), false);

        const p1 = { name: "" } as any;
        const p2 = { name: "", age: 123 } as any;

        // lack of property        
        assert.equal(matchValue({}, p1), false);
        assert.equal(matchValue({ name: null }, p1), false);
        assert.equal(matchValue({ name: undefined }, p1), false);
        assert.equal(matchValue({ name: 1 }, {}), true);

        // single property        
        assert.equal(matchValue({ name: 1 }, p1), false);
        assert.equal(matchValue({ name: 1, age: 123 }, p1), false);
        assert.equal(matchValue({ name: "" }, p1), true);
        assert.equal(matchValue({ name: "", age: 123 }, p1), true);


        // many properties
        assert.equal(matchValue({ name: 1 }, p2), false);
        assert.equal(matchValue({ name: 1, age: 123 }, p2), false);
        assert.equal(matchValue({ name: "", age: 0 }, p2), false);
        assert.equal(matchValue({ name: "", age: 123 }, p2), true);
        assert.equal(matchValue({ name: "", age: 123, address: "" }, p2), true);

        // sub objects

        assert.equal(matchValue(
            { name: 1, o: { age: 1, address: "asd" } },
            { name: 1, o: { age: 1 } }), true);
        assert.equal(matchValue(
            { name: 1, o: { age: 2 } },
            { name: 1, o: { age: 1 } }), false);
        assert.equal(matchValue(
            { name: 1, o: {} },
            { name: 1, o: { age: 1 } }), false);
        assert.equal(matchValue(
            { name: 1, o: null },
            { name: 1, o: { age: 1 } } as any), false);

        assert.equal(matchValue(
            { name: 1, o: { address: ["a"] } },
            { name: 1, o: { address: ["a"] } }), true);
        assert.equal(matchValue(
            { name: 1, o: { address: ["a"] } },
            { name: 1, o: { address: [] } }), false);
        assert.equal(matchValue(
            { name: 1, o: { address: ["a"] } },
            { name: 1, o: { address: ["a", rest] } }), true);
        assert.equal(matchValue(
            { name: 1, o: { address: ["a", "b"] } },
            { name: 1, o: { address: ["a", rest] } }), true);
    });
});

