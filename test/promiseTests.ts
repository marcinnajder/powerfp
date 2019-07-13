import * as assert from "assert";
import { promiseMap, promiseReturn, promiseBind, compose, promiseApply } from "../src/index";
import { toString_, inc } from "./testsUtils";

it('promise', async function () {
  const toString_Promise = compose(toString_, promiseReturn);
  const incPromise = compose(inc, promiseReturn);
  const toString_InPromise = promiseReturn(toString_);
  const inc_InPromise = promiseReturn(inc);

  const p = promiseReturn(1);

  assert.equal(await promiseMap(p, toString_), "1");
  assert.equal(await promiseMap(toString_)(p), "1");
  assert.equal(await promiseMap(p, inc), 2);
  assert.equal(await promiseMap(inc)(p), 2);

  assert.equal(await promiseBind(p, toString_Promise), "1");
  assert.equal(await promiseBind(toString_Promise)(p), "1");
  assert.equal(await promiseBind(p, incPromise), 2);
  assert.equal(await promiseBind(incPromise)(p), 2);

  assert.equal(await promiseApply(toString_InPromise, p), "1");
  assert.equal(await promiseApply(toString_InPromise)(p), "1");
  assert.equal(await promiseApply(inc_InPromise, p), 2);
  assert.equal(await promiseApply(inc_InPromise)(p), 2);
});
