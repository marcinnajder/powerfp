import * as assert from "assert";
import { Option, node, emptynode, some, isUnion, none, matchUnion, ExhaustiveMatchTypedObj, MatchTypedObj, Option_none } from "../src/index";


it('adt', function () {
  //const a = some("hej");

  const n = none as Option<string>;
  const s = some("hej") as Option<string>;

  // isUnion
  assert.equal(isUnion(n, "none"), true);
  assert.equal(isUnion(n, "some"), false);
  assert.equal(isUnion(s, "none"), false);
  assert.equal(isUnion(s, "some"), true);

  // match

  const matchObj: ExhaustiveMatchTypedObj<Option<string>, string> = {
    "none": _ => "NONE",
    "some": ({ value }) => `SOME(${value})`
  }
  assert.equal(matchUnion(n, matchObj), "NONE");
  assert.equal(matchUnion(s, matchObj), "SOME(hej)");

  delete matchObj["none"];
  assert.throws(() => matchUnion(n, matchObj));

  // match with wildcard

  const matchObj2: MatchTypedObj<Option<string>, string> = {
    "none": _ => "NONE",
    "_": o => "_"
  }
  assert.equal(matchUnion(n, matchObj2), "NONE");
  assert.equal(matchUnion(s, matchObj2), "_");


  // console.log((none as Option<string>).map(x => x.length));
  // console.log(some("hej").map(x => x.length));
  // console.log(some("hej"));

  // console.log(JSON.stringify(ok(123).map(x => x * 1000)));
  // console.log(JSON.stringify(error(false)));

  // console.log(JSON.stringify(empty));
  // console.log(JSON.stringify(cons(111, cons(1, empty))));
  // console.log(JSON.stringify(node(111, emptynode, emptynode)));
});

