'use strict';

var GetIntrinsic = require('es-abstract/GetIntrinsic');
var $original = GetIntrinsic('%ArrayIteratorPrototype%', true);

var CreateMethodProperty = require('es-abstract/2019/CreateMethodProperty');
var DefinePropertyOrThrow = require('es-abstract/2019/DefinePropertyOrThrow');
var HasOwnProperty = require('es-abstract/2019/HasOwnProperty');
var IsCallable = require('es-abstract/2019/IsCallable');
var ObjectCreate = require('es-abstract/2019/ObjectCreate');
var hasSymbols = require('has-symbols')();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var Proto = $original;
if (!Proto) {
	var IteratorProto = {};
	Proto = ObjectCreate(IteratorProto);
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
