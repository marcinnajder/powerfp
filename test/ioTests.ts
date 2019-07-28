import * as assert from "assert";
import { ioMap, ioReturn, ioBind, compose, ioApply, none, IO, ioDo } from "../src/index";
import { toString_, inc } from "./testsUtils";

it('io', function () {
  const toString_IO = compose(toString_, ioReturn);
  const incIO = compose(inc, ioReturn);
  const toString_InIO = ioReturn(toString_);
  const inc_InIO = ioReturn(inc);

  const s = ioReturn(1);

  assert.deepEqual(ioMap(s, toString_)(), ioReturn("1")());
  assert.deepEqual(ioMap(toString_)(s)(), ioReturn("1")());
  assert.deepEqual(ioMap(s, inc)(), ioReturn(2)());
  assert.deepEqual(ioMap(inc)(s)(), ioReturn(2)());

  assert.deepEqual(ioBind(s, toString_IO)(), ioReturn("1")());
  assert.deepEqual(ioBind(toString_IO)(s)(), ioReturn("1")());
  assert.deepEqual(ioBind(s, incIO)(), ioReturn(2)());
  assert.deepEqual(ioBind(incIO)(s)(), ioReturn(2)());

  assert.deepEqual(ioApply(toString_InIO, s)(), ioReturn("1")());
  assert.deepEqual(ioApply(toString_InIO)(s)(), ioReturn("1")());
  assert.deepEqual(ioApply(inc_InIO, s)(), ioReturn(2)());
  assert.deepEqual(ioApply(inc_InIO)(s)(), ioReturn(2)());
});




// node ./dist/cjs_es6/test/ioTests.js
// console.log(__filename, "->", __filename + "__");
// copyFile(__filename, __filename + "__")();
// copyFileWithDo(__filename, __filename + "__")();


function fs_writeFile(filePath: string, text: string): IO<void> {
  return () => require("fs").writeFileSync(filePath, text);
}

function fs_readFile(filePath: string): IO<string> {
  return () => require("fs").readFileSync(filePath, "utf8");
}

function copyFile(fromPath: string, toPath: string): IO<void> {
  const textIO: IO<string> = fs_readFile(fromPath);
  return ioBind(textIO, text => {
    const upper = text.toUpperCase();
    return fs_writeFile(toPath, upper);
  });
}

function copyFileWithDo(fromPath: string, toPath: string): IO<void> {
  return ioDo(function* () {
    const text: string = yield fs_readFile(fromPath);
    const upper = text.toUpperCase();
    return fs_writeFile(toPath, upper);
  });
}


