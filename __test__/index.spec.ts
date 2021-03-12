import { transformFileBase } from "../src/utils/base";

const content = `const babel = require('babel')
const types = require('babel').types
const { parser, generate, } = require('babel')

const a = 123;
const b = 'sad';
const c= true;
function d() {}

exports.a = a
exports.b = b
exports.c = c
exports.d = d
export const e = 123

exports["default"] = "test"
module.exports = exports["default"]`

const expectStr = `import babel from 'babel';
import { types } from 'babel';
import { parser, generate } from 'babel';
const _a = 123;
const _b = 'sad';
const _c = true;

function _d() {}

export const a = _a;
export const b = _b;
export const c = _c;
export const d = _d;
export const e = 123;
export default "test";`

it("快照", () => {
  const { code } = transformFileBase(content)
  expect(code).toContain(expectStr)
});

