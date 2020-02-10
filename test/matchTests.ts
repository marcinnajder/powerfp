import { matchValue } from "../src/matchValue";
import * as assert from "assert";
import { rest, match } from "../src/match";

it('match', function () {

    // no cases
    assert.throws(() => match(1));

    // matching simple values
    assert.equal(match(2 as number, [1, 11], [2, 22]), 22);
    assert.throws(() => match(3 as number, [1, 11], [2, 22]));

    // missing result
    assert.equal(match(1 as number, [1], [2, 22], [3, 33]), 22);
    assert.throws(() => match(1 as number, [1], [2], [3]));

    // wildcard
    assert.equal(match(1 as number, [0, 0], () => 1000, [1, 11]), 1000);

    // patterns and results as functions
    assert.equal(match(2 as number, [v => v === 1, n => 10 + n], [v => v === 2, n => 20 + n]), 22);
});

