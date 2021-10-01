'use strict';

var GetIntrinsic = require('get-intrinsic');
var $original = GetIntrinsic('%ArrayIteratorPrototype%', true);

var CreateMethodProperty = require('es-abstract/2021/CreateMethodProperty');
var DefinePropertyOrThrow = require('es-abstract/2021/DefinePropertyOrThrow');
var HasOwnProperty = require('es-abstract/2021/HasOwnProperty');
var IsCallable = require('es-abstract/2021/IsCallable');
var OrdinaryObjectCreate = require('es-abstract/2021/OrdinaryObjectCreate');
var hasSymbols = require('has-symbols')();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var Proto = $original;
if (!Proto) {
	var IteratorProto = {};
	Proto = OrdinaryObjectCreate(IteratorProto);
}

if (!HasOwnProperty(Proto, 'next') || !IsCallable(Proto.next)) {
	var next = require('./next'); // eslint-disable-line global-require
	CreateMethodProperty(Proto, 'next', next);
}

if (hasToStringTag && !HasOwnProperty(Proto, Symbol.toStringTag)) {
	DefinePropertyOrThrow(Proto, Symbol.toStringTag, {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': 'Array Iterator',
		'[[Writable]]': false
	});
}

module.exports = Proto;
