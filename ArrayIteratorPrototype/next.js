'use strict';

var GetIntrinsic = require('get-intrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var CreateIterResultObject = require('es-abstract/2020/CreateIterResultObject');
var Get = require('es-abstract/2020/Get');
var ToLength = require('es-abstract/2020/ToLength');
var ToString = require('es-abstract/2020/ToString');
var Type = require('es-abstract/2020/Type');

var SLOT = require('internal-slot');
var isTypedArray = require('is-typed-array');
var typedArrayLength = require('typed-array-length');

var SLOT_O = '[[IteratedArrayLike]]';
var SLOT_I = '[[ArrayLikeNextIndex]]';
var SLOT_K = '[[ArrayLikeIterationKind]]';

module.exports = function next() {
	var O = this;
	if (
		Type(O) !== 'Object'
		|| !SLOT.has(O, SLOT_O)
		|| !SLOT.has(O, SLOT_I)
		|| !SLOT.has(O, SLOT_K)
	) {
		throw new $TypeError('%ArrayIteratorPrototype%.next requires that |this| be an Array Iterator instance');
	}
	var a = SLOT.get(O, SLOT_O);
	if (typeof a === 'undefined') {
		return CreateIterResultObject(a, true);
	}
	var index = SLOT.get(O, SLOT_I);
	var itemKind = SLOT.get(O, SLOT_K);
	var len = isTypedArray(a) ? typedArrayLength(a) : ToLength(Get(a, 'length'));
	if (index >= len) {
		SLOT.set(O, SLOT_O, void undefined);
		return CreateIterResultObject(void undefined, true);
	}
	SLOT.set(O, SLOT_I, index + 1);
	if (itemKind === 'key') {
		return CreateIterResultObject(index, false);
	}
	var elementKey = ToString(index);
	var elementValue = Get(a, elementKey);
	var result = itemKind === 'value' ? elementValue : [index, elementValue];
	return CreateIterResultObject(result, false);
};
