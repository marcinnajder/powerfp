import * as assert from "assert";
import { arrayMap, arrayReturn, arrayBind, compose, arrayApply, none } from "../src/index";
import { toString_, inc } from "./testsUtils";

it('array', function () {
  const toString_Array = compose(toString_, arrayReturn);
  const incArray = compose(inc, arrayReturn);
  const toString_InArray = arrayReturn(toString_);
  const inc_InArray = arrayReturn(inc);

  const s = arrayReturn(1);


  assert.deepEqual(arrayMap(s, toString_), arrayReturn("1"));
  assert.deepEqual(arrayMap(toString_)(s), arrayReturn("1"));
  assert.deepEqual(arrayMap(s, inc), arrayReturn(2));
  assert.deepEqual(arrayMap(inc)(s), arrayReturn(2));

  assert.deepEqual(arrayBind(s, toString_Array), arrayReturn("1"));
  assert.deepEqual(arrayBind(toString_Array)(s), arrayReturn("1"));
  assert.deepEqual(arrayBind(s, incArray), arrayReturn(2));
  assert.deepEqual(arrayBind(incArray)(s), arrayReturn(2));

  assert.deepEqual(arrayApply(toString_InArray, s), arrayReturn("1"));
  assert.deepEqual(arrayApply(toString_InArray)(s), arrayReturn("1"));
  assert.deepEqual(arrayApply(inc_InArray, s), arrayReturn(2));
  assert.deepEqual(arrayApply(inc_InArray)(s), arrayReturn(2));

  // array with multiple items
  assert.deepEqual(arrayMap([1, 2, 3], toString_), ["1", "2", "3"]);
  assert.deepEqual(arrayBind([1, 2, 3], x => [x, x]), [1, 1, 2, 2, 3, 3]);
  assert.deepEqual(arrayApply([inc, (x: number) => x * 10], [1, 2]), [2, 3, 10, 20]);
});
