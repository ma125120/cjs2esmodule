const babel = require('babel')
const types = require('babel').types
const { parser } = require('babel')

const a = 123;
const b = 'sad';
const c= true;
function d() {}

exports.a = a
exports.b = b
exports.c = c
exports.d = d

module.exports = a