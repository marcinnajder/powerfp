import * as assert from "assert";
import { some, optionLiftA2, none, promiseLiftA2, observableLiftA2, f3, observableLiftA3 } from "../src/index";
import { add, numberStringEqual, delay, add3 } from "./testsUtils";
// import { interval, Observable } from "rxjs";
// import { take, skip } from "rxjs/operators";

it('applicative', async function () {
    {
        const a = some(1);
        const b = some(10);
        const n = none<number>();

        assert.deepEqual(optionLiftA2(add, a, b), some(1 + 10));
        assert.deepEqual(optionLiftA2(add, a, n), n);
        assert.deepEqual(optionLiftA2(add, n, b), n);

        assert.deepEqual(optionLiftA2(numberStringEqual, a, some("1")), some(true));
    }

    // {
    //     const a = interval(5000).pipe(take(1))
    //     const b = interval(5000).pipe(take(1))
    //     const c = interval(5000).pipe(take(1))
    //     const result = observableLiftA3(add3, a, b, c);
    //     result.subscribe(x => console.log("next", x));
    // }
});








