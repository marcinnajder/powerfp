import * as assert from "assert";
import { map, filter, toarray } from "powerseq";
import { compose } from "../src/index";

it('compose', function () {
  const add2 = (n: number) => n + 2;

  assert.equal(compose(add2)(1), 3);

  const f1 = compose(
    add2,
    _ => "a".repeat(_),
    _ => _.toUpperCase(),
  );

  assert.equal(f1(1), "AAA");

  const f2 = compose(
    filter<number>(x => x % 2 === 0),
    map(x => "a".repeat(x)),
    toarray()
  );

  assert.deepEqual(f2([1, 2, 3, 4]), ['aa', 'aaaa']);
});
