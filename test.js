'use strict';

const truncatedList = require('.');
const test = require('tape');

test('truncatedList()', t => {
  t.equal(
    truncatedList(['a', 'b', 'c'], 3),
    `* a
* b
* c`,
    'should create a list of items from an iterable object.'
  );

  t.equal(
    truncatedList(new Set(['1', '2', '3', '4', '5']), 2),
    `* 1
* 2
  ... and 3 more`,
    'should truncate the list to the specified number of lines.'
  );

  t.equal(
    truncatedList(new Map(), Number.MAX_SAFE_INTEGER),
    '',
    'should return an empty string when the object includes no values.'
  );

  t.throws(
    () => truncatedList(null, 1),
    /TypeError.*Expected an iterable object except for string, but got null\./,
    'should throw an error when it takes a falsy value.'
  );

  t.throws(
    () => truncatedList('abc', 1),
    /TypeError.*Expected an iterable object except for string, but got 'abc' \(string\)\./,
    'should throw an error when it takes a string.'
  );

  t.throws(
    () => truncatedList(/^/, 1),
    /TypeError.*Expected an iterable object except for string, but got \/\^\/ \(regexp\)\./,
    'should throw an error when it takes a non-iterable object.'
  );

  t.throws(
    () => truncatedList([], Buffer.alloc(0)),
    /TypeError.*Expected a maximum number of list items \(positive integer\), but got a non-number value <Buffer >\./,
    'should throw an error when it takes a non-number threshold.'
  );

  t.throws(
    () => truncatedList([], 0),
    /TypeError.*Expected a maximum number of list items \(positive integer\), but got a non-positive value 0\./,
    'should throw an error when it takes a non-positive threshold.'
  );

  t.throws(
    () => truncatedList([], Infinity),
    /TypeError.*Expected a maximum number of list items \(positive integer\), but got Infinity\./,
    'should throw an error when it takes an infinite threshold.'
  );

  t.throws(
    () => truncatedList([], Number.MAX_SAFE_INTEGER + 1),
    /TypeError.*Expected a maximum number of list items \(positive integer\), but got a too large number\./,
    'should throw an error when it takes a too large number.'
  );

  t.throws(
    () => truncatedList([], 1.1),
    /TypeError.*Expected a maximum number of list items \(positive integer\), but got a non-integer number 1\.1\./,
    'should throw an error when it takes a non-integer number.'
  );

  t.throws(
    () => truncatedList(['1', Object], 1),
    /TypeError.*Expected every value of the given iterable object to be a string, but included \[Function: Object]\./,
    'should throw an error when the iterable object includes a non-string value.'
  );

  t.throws(
    () => truncatedList([''], 1),
    /Error.*Expected every value of the given iterable object to be a non-empty string, but included '' \(empty string\)\./,
    'should throw an error when the iterable object includes an empty string.'
  );

  t.throws(
    () => truncatedList(['x\ny'], 1),
    /Error.*Expected every value of the given iterable object to be a single-line string, but included a multiline string 'x\\ny'\./,
    'should throw an error when the iterable object includes a multiline string.'
  );

  t.end();
});
