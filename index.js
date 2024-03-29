'use strict';

var $TypeError = require('es-errors/type');

var callBind = require('call-bind');
var callBound = require('call-bind/callBound');
var OrdinaryObjectCreate = require('es-abstract/2023/OrdinaryObjectCreate');
var Type = require('es-abstract/2023/Type');

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
	var iterator = OrdinaryObjectCreate($ArrayIteratorPrototype);
	SLOT.set(iterator, '[[IteratedArrayLike]]', array);
	SLOT.set(iterator, '[[ArrayLikeNextIndex]]', 0);
	SLOT.set(iterator, '[[ArrayLikeIterationKind]]', kind);
	return iterator;
};
