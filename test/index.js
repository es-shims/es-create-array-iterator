'use strict';

var test = require('tape');
var iterate = require('iterate-iterator');
var forEach = require('for-each');
var inspect = require('object-inspect');

var CreateArrayIterator = require('../');

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

test('CreateArrayIterator', function (t) {
	var arr = ['a', 'b', 'c'];

	forEach([
		undefined,
		null,
		true,
		false,
		42,
		NaN,
		0,
		-0,
		Infinity,
		'',
		'foo'
	], function (primitive) {
		t['throws'](
			function () { CreateArrayIterator(primitive, 'key'); },
			TypeError,
			inspect(primitive) + ' is not an Object'
		);
	});

	t['throws'](
		function () { CreateArrayIterator({}, 'bad'); },
		TypeError,
		'`kind` must be `key`, `value`, or `key+value`'
	);

	t.test('key', function (st) {
		var iterator = CreateArrayIterator(arr, 'key');
		st.ok(iterator, 'array iterator is truthy');
		st.deepEqual(iterate(iterator), [0, 1, 2], 'array yields keys');

		var objIterator = CreateArrayIterator({ 0: 'a', length: 2 }, 'key');
		st.ok(objIterator, 'object iterator is truthy');
		st.deepEqual(iterate(objIterator), [0, 1], 'object yields keys');

		st.end();
	});

	t.test('value', function (st) {
		var iterator = CreateArrayIterator(arr, 'value');
		st.ok(iterator, 'array iterator is truthy');
		st.deepEqual(iterate(iterator), ['a', 'b', 'c'], 'array yields values');

		var obj = { 0: 'a', 2: 'c', length: 3 };
		var expected = ['a', undefined, 'c'];
		if (!canDistinguishSparseFromUndefined) {
			// IE 6-8
			obj[1] = false;
			expected[1] = false;
		}
		var objIterator = CreateArrayIterator(obj, 'value');
		st.ok(objIterator, 'object iterator is truthy');
		st.deepEqual(iterate(objIterator), expected, 'object yields values');

		st.end();
	});

	t.test('key+value', function (st) {
		var iterator = CreateArrayIterator(arr, 'key+value');
		st.ok(iterator, 'array iterator is truthy');
		st.deepEqual(iterate(iterator), [[0, 'a'], [1, 'b'], [2, 'c']], 'array yields entries');

		var objIterator = CreateArrayIterator({ 0: 'a', length: 2 }, 'key+value');
		st.ok(objIterator, 'object iterator is truthy');
		st.deepEqual(iterate(objIterator), [[0, 'a'], [1, undefined]], 'object yields entries');

		st.end();
	});

	t.end();
});
