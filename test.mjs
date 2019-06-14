import {strict as assert} from 'assert';

import test from 'testit';
import truncatedList from '.';

test('create a list of items from an iterable object', () => {
	assert.equal(truncatedList(['a', 'b', 'c'], 3), `* a
* b
* c`);
});

test('truncate the list to the specified number of lines', () => {
	assert.equal(truncatedList(new Set(['1', '2', '3', '4', '5']), 2), `* 1
* 2
  ... and 3 more`);
});

test('return an empty string when the object includes no values', () => {
	assert.equal(truncatedList(new Map(), Number.MAX_SAFE_INTEGER), '');
});

test('throw an error when it takes a non-iterable value', () => {
	assert.throws(() => truncatedList(/^/u, 1), {
		name: 'TypeError',
		message: 'Expected an iterable object except for string, but got /^/u (regexp).'
	});

	assert.throws(() => truncatedList(null, 1), {
		name: 'TypeError',
		message: 'Expected an iterable object except for string, but got null.'
	});
});

test('throw an error when the iterable object includes a non-string value', () => {
	assert.throws(() => truncatedList(['1', Object], 1), {
		name: 'TypeError',
		message: 'Expected every value of the given iterable object to be a string, but included [Function: Object].'
	});
});

test('throw an error when the iterable object includes an empty string', () => {
	assert.throws(() => truncatedList([''], 1), {
		message: 'Expected every value of the given iterable object to be a non-empty string, but included \'\' (empty string).'
	});
});

test('throw an error when the iterable object includes a multiline string', () => {
	assert.throws(() => truncatedList(['x\ny'], 1), {
		message: 'Expected every value of the given iterable object to be a single-line string, but included a multiline string \'x\\ny\'.'
	});
});

test('throw an error when it takes a string', () => {
	assert.throws(() => truncatedList('abc', 1), {
		name: 'TypeError',
		message: 'Expected an iterable object except for string, but got \'abc\' (string).'
	});
});

test('throw an error when the second argument is not a positive finite integer', () => {
	assert.throws(() => truncatedList([], Buffer.alloc(0)), {
		name: 'TypeError',
		message: 'Expected a maximum number of list items (positive integer), but got a non-number value <Buffer >.'
	});

	assert.throws(() => truncatedList([], 0), {
		name: 'TypeError',
		message: 'Expected a maximum number of list items (positive integer), but got a non-positive value 0.'
	});

	assert.throws(() => truncatedList([], Infinity), {
		name: 'TypeError',
		message: 'Expected a maximum number of list items (positive integer), but got Infinity.'
	});

	assert.throws(() => truncatedList([], Number.MAX_SAFE_INTEGER + 1), {
		name: 'TypeError',
		message: 'Expected a maximum number of list items (positive integer), but got a too large number.'
	});

	assert.throws(() => truncatedList([], 1.1), {
		name: 'TypeError',
		message: 'Expected a maximum number of list items (positive integer), but got a non-integer number 1.1.'
	});
});

test('throw an error when it takes no arguments', () => {
	assert.throws(() => truncatedList(), {
		name: 'RangeError',
		message: 'Expected 2 arguments (<Iterable<string>>, <integer>), but got no arguments instead.'
	});
});

test('throw an error when it takes too many arguments', () => {
	assert.throws(() => truncatedList([], 0, ''), {
		name: 'RangeError',
		message: 'Expected 2 arguments (<Iterable<string>>, <integer>), but got 3 arguments instead.'
	});
});
