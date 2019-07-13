import * as assert from "assert";
import { Result, resultMap, resultReturn, resultBind, compose, resultApply, none, error, f, f2 } from "../src/index";
import { toString_, inc } from "./testsUtils";

it('result', function () {
  const toString_Result = compose(toString_, resultReturn);
  const incResult = compose(inc, resultReturn);
  const toString_InResult = resultReturn(toString_);
  const inc_InResult = resultReturn(inc);

  const s = resultReturn(1);
  const e = error(1);

  // success
  assert.deepEqual(resultMap(s, toString_), resultReturn("1"));
  assert.deepEqual(resultMap(toString_)(s), resultReturn("1"));
  assert.deepEqual(resultMap(s, inc), resultReturn(2));
  assert.deepEqual(resultMap(inc)(s), resultReturn(2));

  assert.deepEqual(resultBind(s, toString_Result), resultReturn("1"));
  assert.deepEqual(resultBind(toString_Result)(s), resultReturn("1"));
  assert.deepEqual(resultBind(s, incResult), resultReturn(2));
  assert.deepEqual(resultBind(incResult)(s), resultReturn(2));

  assert.deepEqual(resultApply(toString_InResult, s), resultReturn("1"));
  assert.deepEqual(resultApply(toString_InResult)(s), resultReturn("1"));
  assert.deepEqual(resultApply(inc_InResult, s), resultReturn(2));
  assert.deepEqual(resultApply(inc_InResult)(s), resultReturn(2));

  // failure
  assert.deepEqual(resultMap(e, toString_ as any as f<unknown, unknown>), e);
  assert.deepEqual(resultBind(e, toString_Result as any as f2<unknown, Result<unknown, number>>), e);
  assert.deepEqual(resultApply(toString_InResult, e as any as Result<Object, unknown>), e);
  assert.deepEqual(resultApply(error(Function) as typeof toString_InResult, s), error(Function));
});
