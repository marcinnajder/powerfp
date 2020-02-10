import * as assert from "assert";
import { some, optionDo, none } from "../src/index";

it('do', async function () {
    // success
    const result1 = optionDo<number>(function* () {
        const a: string = yield some(1).map(x => x.toString());
        const b: number = yield some(6);
        return some(parseInt(a) + b);
    })

    assert.deepEqual(result1, some(7));

    // success
    const result2 = optionDo<number>(function* () {
        const a: string = yield none;
        const b: number = yield some(6);
        return some(parseInt(a) + b);
    })

    assert.deepEqual(result2, none);
});

