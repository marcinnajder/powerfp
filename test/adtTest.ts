import * as assert from "assert";
import { Option, node, emptynode, some, isUnion, none, matchUnion, ExhaustiveMatchTypedObj, MatchTypedObj, Option_none } from "../src/index";

describe('adt', function () {
  const n = none as Option<string>;
  const s = some("hej") as Option<string>;


  it('isUnion', function () {
    const n = none as Option<string>;
    const s = some("hej") as Option<string>;

    assert.equal(isUnion(n, "none"), true);
    assert.equal(isUnion(n, "some"), false);
    assert.equal(isUnion(s, "none"), false);
    assert.equal(isUnion(s, "some"), true);
  });


  it('matchUnion with functions', function () {
    const matchObj: ExhaustiveMatchTypedObj<Option<string>, string> = {
      "none": _ => "NONE",
      "some": ({ value }) => `SOME(${value})`
    }
    assert.equal(matchUnion(n, matchObj), "NONE");
    assert.equal(matchUnion(s, matchObj), "SOME(hej)");

    delete matchObj["none"];
    assert.throws(() => matchUnion(n, matchObj));
  });

  it('matchUnion with values', function () {
    const matchObj: ExhaustiveMatchTypedObj<Option<string>, string | undefined> = {
      "none": "NONE",
      "some": undefined
    }
    assert.equal(matchUnion(n, matchObj), "NONE");
    assert.equal(matchUnion(s, matchObj), undefined);

    delete matchObj["none"];
    assert.throws(() => matchUnion(n, matchObj));
  });


  it('matchUnion with wildcard', function () {
    const matchObj: MatchTypedObj<Option<string>, string> = {
      "none": _ => "NONE",
      "_": o => "_"
    }
    assert.equal(matchUnion(n, matchObj), "NONE");
    assert.equal(matchUnion(s, matchObj), "_");
  });

  // it('other ... ', function () {
  //   // console.log((none as Option<string>).map(x => x.length));
  //   // console.log(some("hej").map(x => x.length));
  //   // console.log(some("hej"));

  //   // console.log(JSON.stringify(ok(123).map(x => x * 1000)));
  //   // console.log(JSON.stringify(error(false)));

  //   // console.log(JSON.stringify(empty));
  //   // console.log(JSON.stringify(cons(111, cons(1, empty))));
  //   // console.log(JSON.stringify(node(111, emptynode, emptynode)));
  // });

});


