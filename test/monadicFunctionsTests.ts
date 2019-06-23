import * as assert from "assert";
import { forM, replicateM, liftM, liftM2, filterM, reduceM, optionMonadOps, promiseMonadOps } from "../src/index";
import { some, none, Option } from "../src/index";

describe('monadic functions', function () {

    describe('option', function () {

        it('forM_with_nonempty_array_and_some_option', function () {
            const result = forM([1, 2], item => some(item.toString()), optionMonadOps) as Option<string[]>;

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, ["1", "2"]);
        });

        it('forM_with_empty_array_and_some_option', function () {
            const result = forM([], (item: number) => some(item.toString()), optionMonadOps) as Option<string[]>;

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, []);
        });

        it('forM_with_nonempty_array_and_none_option', function () {
            const result = forM([1, 2], item => item > 1 ? none() : some(item.toString()), optionMonadOps) as Option<string[]>;

            assert.equal(result.type === "none", true);
        });


        it('replicateM_with_zero_iteration_and_some_option', function () {
            const result = replicateM(0, some(2), optionMonadOps) as Option<number[]>;
            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, []);
        });

        it('replicateM_with_two_iterations_and_some_option', function () {
            const result = replicateM(2, some(2), optionMonadOps) as Option<number[]>;
            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, [2, 2]);
        });

        it('replicateM_with_two_iterations_and_none_option', function () {
            const result = replicateM(2, none(), optionMonadOps) as Option<number[]>;
            assert.equal(result.type === "none", true);
        });

        it('liftM_with_some_option', function () {
            const func = liftM<number, string>(n => n.toString(), optionMonadOps);
            const result = func(some(2)) as Option<string>

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, "2");
        });

        it('liftM2_with_some_option', function () {
            const func = liftM2((n1: number, n2: number) => (n1 + n2).toString(), optionMonadOps);
            const result = func(some(2), some(1)) as Option<string>

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, "3");

        });



        it('filterM_with_some_option', function () {
            const result = filterM([1, 2, 3, 4, 5], item => some(item % 2 === 0), optionMonadOps) as Option<number[]>;
            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, [2, 4]);
        });

        it('filterM_with_none_option', function () {
            const result = filterM([1, 2, 3, 4, 5], item => none(), optionMonadOps) as Option<number[]>;
            assert.equal(result.type === "none", true);
        });


        it('reduceM_with_some_option', function reduceM_with_some_option() {
            const result = reduceM([1, 2, 3], (prev, item) => some(prev + item), 0, optionMonadOps) as Option<number>;

            assert.equal(result.type === "some", true);
            assert.deepEqual(result.type === "some" && result.value, 1 + 2 + 3);
        });

        it('reduceM_with_none_option', function reduceM_with_none_option() {
            const result = reduceM([1, 2, 3], (prev, item) => none(), 0, optionMonadOps) as Option<number>;

            assert.equal(result.type === "none", true);
        });
    });

    describe('promise', function () {

        it('forM_with_nonempty_array_and_resolved_promise', async function () {
            const result = await (forM([1, 2], async item => {
                await setTimeotPromise(10);
                return item.toString();
            }, promiseMonadOps) as Promise<string[]>);

            assert.deepEqual(result, ["1", "2"]);
        });

        it('forM_with_empty_array_and_resolved_promise', async function () {
            const result = await (forM([], async (item: number) => {
                await setTimeotPromise(10);
                return item.toString();
            }, promiseMonadOps) as Promise<string[]>);

            assert.deepEqual(result, []);
        });

        it('forM_with_nonempty_array_and_rejescted_promise', async function () {
            try {
                const result = await (forM([1, 2], async (item: number) => {
                    await setTimeotPromise(10).then(_ => Promise.reject("rejected promise"));
                    return item.toString();
                }, promiseMonadOps) as Promise<string[]>);

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
