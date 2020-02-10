import * as assert from "assert";
import { optionMap, optionReturn, optionBind, compose, optionApply, none, Option, toOption, some } from "../src/index";
import { toString_, inc } from "./testsUtils";

it('option', function () {
  const toString_Option = compose(toString_, optionReturn);
  const incOption = compose(inc, optionReturn);
  const toString_InOption = optionReturn(toString_);
  const inc_InOption = optionReturn(inc);

  const s = optionReturn(1);
  const n = none;

  // success
  assert.deepEqual(optionMap(s, toString_), optionReturn("1"));
  assert.deepEqual(optionMap(toString_)(s), optionReturn("1"));
  assert.deepEqual(optionMap(s, inc), optionReturn(2));
  assert.deepEqual(optionMap(inc)(s), optionReturn(2));

  assert.deepEqual(optionBind(s, toString_Option), optionReturn("1"));
  assert.deepEqual(optionBind(toString_Option)(s), optionReturn("1"));
  assert.deepEqual(optionBind(s, incOption), optionReturn(2));
  assert.deepEqual(optionBind(incOption)(s), optionReturn(2));

  assert.deepEqual(optionApply(toString_InOption, s), optionReturn("1"));
  assert.deepEqual(optionApply(toString_InOption)(s), optionReturn("1"));
  assert.deepEqual(optionApply(inc_InOption, s), optionReturn(2));
  assert.deepEqual(optionApply(inc_InOption)(s), optionReturn(2));

  // failure
  assert.deepEqual(optionMap(n, toString_), n);
  assert.deepEqual(optionBind(n, toString_Option), n);
  assert.deepEqual(optionApply(toString_InOption, n), n);
  assert.deepEqual(optionApply(none as typeof toString_InOption, s), none);

  // toOption
  assert.deepEqual(toOption(null), none);
  assert.deepEqual(toOption(undefined), none);
  assert.deepEqual(toOption(0), some(0));
  assert.deepEqual(toOption(""), some(""));
  assert.deepEqual(toOption([1, 2, 3]), some([1, 2, 3]));
});
