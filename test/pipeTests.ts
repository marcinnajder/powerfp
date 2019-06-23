import * as assert from "assert";
import { map, filter, toarray } from "powerseq";
import { pipe } from "../src/index";

it('pipe', function () {
  const r1 = pipe(
    1,
    _ => _ + 2,
    _ => "a".repeat(_),
    _ => _.toUpperCase(),
  );

  assert.equal(r1, "AAA");

  const r2 = pipe(
    [1, 2, 3, 4],
    filter(x => x % 2 === 0),
    map(x => "a".repeat(x)),
    toarray()
  );

  assert.deepEqual(r2, ['aa', 'aaaa']);
});
