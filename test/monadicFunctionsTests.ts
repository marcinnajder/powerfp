import * as assert from "assert";
import { forM, replicateM, filterM, reduceM, optionMonadOps, promiseMonadOps, liftM2, liftM3 } from "../src/index";
import { some, none, Option } from "../src/index";

describe('monadic functions', function () {

    describe('option', function () {

        it('forM_with_nonempty_array_and_some_option', function () {
            const result = forM(optionMonadOps, [1, 2], item => some(item.toString())) as Option<string[]>;

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, ["1", "2"]);
        });

        it('forM_with_empty_array_and_some_option', function () {
            const result = forM(optionMonadOps, [], (item: number) => some(item.toString())) as Option<string[]>;

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, []);
        });

        it('forM_with_nonempty_array_and_none_option', function () {
            const result = forM(optionMonadOps, [1, 2], item => item > 1 ? none : some(item.toString())) as Option<string[]>;

            assert.equal(result.type === "none", true);
        });


        it('replicateM_with_zero_iteration_and_some_option', function () {
            const result = replicateM(optionMonadOps, 0, some(2)) as Option<number[]>;
            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, []);
        });

        it('replicateM_with_two_iterations_and_some_option', function () {
            const result = replicateM(optionMonadOps, 2, some(2)) as Option<number[]>;
            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, [2, 2]);
        });

        it('replicateM_with_two_iterations_and_none_option', function () {
            const result = replicateM(optionMonadOps, 2, none) as Option<number[]>;
            assert.equal(result.type === "none", true);
        });

        // it('liftM_with_some_option', function () {
        //     const func = liftM<number, string>(optionMonadOps, n => n.toString());
        //     const result = func(some(2)) as Option<string>

        //     assert.equal(result.type === "some", true);
        //     assert.deepEqual(result.type === "some" && result.value, "2");
        // });

        it('liftM2_with_some_option', function () {
            const result = liftM2(optionMonadOps, (n1: number, n2: number) => (n1 + n2).toString(),
                some(2), some(1)) as Option<string>

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, "3");
        });

        it('liftM3_with_some_option', function () {
            const result = liftM3(optionMonadOps, (n1: number, n2: number, n3: number) => (n1 + n2 + n3).toString(),
                some(2), some(1), some(3)) as Option<string>

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, "6");
        });



        it('filterM_with_some_option', function () {
            const result = filterM(optionMonadOps, [1, 2, 3, 4, 5], item => some(item % 2 === 0)) as Option<number[]>;
            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, [2, 4]);
        });

        it('filterM_with_none_option', function () {
            const result = filterM(optionMonadOps, [1, 2, 3, 4, 5], item => none) as Option<number[]>;
            assert.equal(result.type === "none", true);
        });


        it('reduceM_with_some_option', function reduceM_with_some_option() {
            const result = reduceM(optionMonadOps, [1, 2, 3], (prev, item) => some(prev + item), 0) as Option<number>;

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, 1 + 2 + 3);
        });

        it('reduceM_with_none_option', function reduceM_with_none_option() {
            const result = reduceM(optionMonadOps, [1, 2, 3], (prev, item) => none, 0) as Option<number>;

            assert.equal(result.type === "none", true);
        });
    });

    describe('promise', function () {

        it('forM_with_nonempty_array_and_resolved_promise', async function () {
            const result = await (forM(promiseMonadOps, [1, 2], async item => {
                await setTimeotPromise(10);
                return item.toString();
            }) as Promise<string[]>);

            assert.deepEqual(result, ["1", "2"]);
        });

        it('forM_with_empty_array_and_resolved_promise', async function () {
            const result = await (forM(promiseMonadOps, [], async (item: number) => {
                await setTimeotPromise(10);
                return item.toString();
            }) as Promise<string[]>);

            assert.deepEqual(result, []);
        });

        it('forM_with_nonempty_array_and_rejescted_promise', async function () {
            try {
                const result = await (forM(promiseMonadOps, [1, 2], async (item: number) => {
                    await setTimeotPromise(10).then(_ => Promise.reject("rejected promise"));
                    return item.toString();
                }) as Promise<string[]>);

                assert.fail("Promise should me rejected.");
            }
            catch (err) {
                assert.equal(err, "rejected promise");
            }
        });
    });
});


function setTimeotPromise(timeout: number) {
    return new Promise<void>(function (resolve, reject) {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}


// // function guard<T, P extends Option<T>["type"]>(option: Option<T>, type: P) {
// //   if (option.type === type) {
// //     return option;
// //   }
// //   // return null;
// // }
