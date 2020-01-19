'use strict';

var GetIntrinsic = require('es-abstract/GetIntrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var callBind = require('es-abstract/helpers/callBind');
var callBound = require('es-abstract/helpers/callBound');
var ObjectCreate = require('es-abstract/2019/ObjectCreate');
var Type = require('es-abstract/2019/Type');

var SLOT = require('internal-slot');
var hasSymbols = require('has-symbols')();

var $ArrayIteratorPrototype = require('./ArrayIteratorPrototype');

var $keys = callBound('Array.prototype.keys', true);
var $values = callBound('Array.prototype.values', true) || (hasSymbols && callBind(Array.prototype[Symbol.iterator]));
var $entries = callBound('Array.prototype.entries', true);

module.exports = function CreateArrayIterator(array, kind) {
	if (Type(array) !== 'Object') {
		throw new $TypeError('Assertion failed: `array` is not Object');
	}
	if (kind !== 'key+value' && kind !== 'key' && kind !== 'value') {
		throw new $TypeError('Assertion failed: `kind` is not ~key~, ~value~, or ~key+value~');
	}
	if (kind === 'key' && $keys) {
		return $keys(array);
	}
	if (kind === 'value' && $values) {
		return $values(array);
	}
	if (kind === 'key+value' && $entries) {
		return $entries(array);
	}
	var iterator = ObjectCreate($ArrayIteratorPrototype);
	SLOT.set(iterator, '[[IteratedObject]]', array);
	SLOT.set(iterator, '[[ArrayIteratorNextIndex]]', 0);
	SLOT.set(iterator, '[[ArrayIterationKind]]', kind);
	return iterator;
};
