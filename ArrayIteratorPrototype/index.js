'use strict';

var GetIntrinsic = require('get-intrinsic');
var $original = GetIntrinsic('%ArrayIteratorPrototype%', true);

var CreateMethodProperty = require('es-abstract/2022/CreateMethodProperty');
var HasOwnProperty = require('es-abstract/2022/HasOwnProperty');
var IsCallable = require('es-abstract/2022/IsCallable');
var OrdinaryObjectCreate = require('es-abstract/2022/OrdinaryObjectCreate');
var setToStringTag = require('es-set-tostringtag');

var Proto = $original;
if (!Proto) {
	var IteratorProto = require('iterator.prototype'); // eslint-disable-line global-require
	Proto = OrdinaryObjectCreate(IteratorProto);
}

if (!HasOwnProperty(Proto, 'next') || !IsCallable(Proto.next)) {
	var next = require('./next'); // eslint-disable-line global-require
	CreateMethodProperty(Proto, 'next', next);
}

setToStringTag(Proto, 'Array Iterator');

module.exports = Proto;
