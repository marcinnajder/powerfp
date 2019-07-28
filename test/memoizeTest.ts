import * as assert from "assert";
import { memoize } from "../src/index";


it('memoize', function () {
  let counter = 0;
  const addM = memoize(function add(a: number, b: number) {
    counter++;
    return a + b;
  });

  assert.deepEqual(addM(1, 3), 4);
  assert.deepEqual(counter, 1);
  assert.deepEqual(addM(1, 4), 5);
  assert.deepEqual(counter, 2);
  assert.deepEqual(addM(1, 4), 5);
  assert.deepEqual(counter, 2);
});

