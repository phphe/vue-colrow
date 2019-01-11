/*!
 * vue-colrow v1.1.1
 * (c) 2019-present phphe <phphe@outlook.com>
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.vueColrow = {})));
}(this, (function (exports) { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var f = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$1 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$1
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$2 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$2
	};

	var dP = Object.defineProperty;

	var f$3 = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f$3
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var gOPN = _objectGopn.f;
	var gOPD$1 = _objectGopd.f;
	var dP$1 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base = $Number;
	var proto = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys = _descriptors ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++) {
	    if (_has(Base, key = keys[j]) && !_has($Number, key)) {
	      dP$1($Number, key, gOPD$1(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	var _global$1 = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core$1 = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1$1 = _core$1.version;

	var _aFunction$1 = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx$1 = function (fn, that, length) {
	  _aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject$1 = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject$1 = function (it) {
	  if (!_isObject$1(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails$1 = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors$1 = !_fails$1(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$3 = _global$1.document;
	// typeof document.createElement is 'object' in old IE
	var is$1 = _isObject$1(document$3) && _isObject$1(document$3.createElement);
	var _domCreate$1 = function (it) {
	  return is$1 ? document$3.createElement(it) : {};
	};

	var _ie8DomDefine$1 = !_descriptors$1 && !_fails$1(function () {
	  return Object.defineProperty(_domCreate$1('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive$1 = function (it, S) {
	  if (!_isObject$1(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject$1(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP$2 = Object.defineProperty;

	var f$4 = _descriptors$1 ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject$1(O);
	  P = _toPrimitive$1(P, true);
	  _anObject$1(Attributes);
	  if (_ie8DomDefine$1) try {
	    return dP$2(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp$1 = {
		f: f$4
	};

	var _propertyDesc$1 = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide$1 = _descriptors$1 ? function (object, key, value) {
	  return _objectDp$1.f(object, key, _propertyDesc$1(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty$1 = {}.hasOwnProperty;
	var _has$1 = function (it, key) {
	  return hasOwnProperty$1.call(it, key);
	};

	var PROTOTYPE$2 = 'prototype';

	var $export$1 = function (type, name, source) {
	  var IS_FORCED = type & $export$1.F;
	  var IS_GLOBAL = type & $export$1.G;
	  var IS_STATIC = type & $export$1.S;
	  var IS_PROTO = type & $export$1.P;
	  var IS_BIND = type & $export$1.B;
	  var IS_WRAP = type & $export$1.W;
	  var exports = IS_GLOBAL ? _core$1 : _core$1[name] || (_core$1[name] = {});
	  var expProto = exports[PROTOTYPE$2];
	  var target = IS_GLOBAL ? _global$1 : IS_STATIC ? _global$1[name] : (_global$1[name] || {})[PROTOTYPE$2];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has$1(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx$1(out, _global$1)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE$2] = C[PROTOTYPE$2];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx$1(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export$1.R && expProto && !expProto[key]) _hide$1(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export$1.F = 1;   // forced
	$export$1.G = 2;   // global
	$export$1.S = 4;   // static
	$export$1.P = 8;   // proto
	$export$1.B = 16;  // bind
	$export$1.W = 32;  // wrap
	$export$1.U = 64;  // safe
	$export$1.R = 128; // real proto method for `library`
	var _export$1 = $export$1;

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined$1 = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	var _stringWs$1 = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space$1 = '[' + _stringWs$1 + ']';
	var non$1 = '\u200b\u0085';
	var ltrim$1 = RegExp('^' + space$1 + space$1 + '*');
	var rtrim$1 = RegExp(space$1 + space$1 + '*$');

	var exporter$1 = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails$1(function () {
	    return !!_stringWs$1[KEY]() || non$1[KEY]() != non$1;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim$1) : _stringWs$1[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export$1(_export$1.P + _export$1.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim$1 = exporter$1.trim = function (string, TYPE) {
	  string = String(_defined$1(string));
	  if (TYPE & 1) string = string.replace(ltrim$1, '');
	  if (TYPE & 2) string = string.replace(rtrim$1, '');
	  return string;
	};

	var _stringTrim$1 = exporter$1;

	var $parseInt = _global$1.parseInt;
	var $trim$1 = _stringTrim$1.trim;

	var hex = /^[-+]?0[xX]/;

	var _parseInt = $parseInt(_stringWs$1 + '08') !== 8 || $parseInt(_stringWs$1 + '0x16') !== 22 ? function parseInt(str, radix) {
	  var string = $trim$1(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

	// 18.2.5 parseInt(string, radix)
	_export$1(_export$1.G + _export$1.F * (parseInt != _parseInt), { parseInt: _parseInt });

	var _parseInt$1 = _core$1.parseInt;

	var _parseInt$2 = _parseInt$1;

	var $parseFloat = _global$1.parseFloat;
	var $trim$2 = _stringTrim$1.trim;

	var _parseFloat = 1 / $parseFloat(_stringWs$1 + '-0') !== -Infinity ? function parseFloat(str) {
	  var string = $trim$2(String(str), 3);
	  var result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

	// 18.2.4 parseFloat(string)
	_export$1(_export$1.G + _export$1.F * (parseFloat != _parseFloat), { parseFloat: _parseFloat });

	var _parseFloat$1 = _core$1.parseFloat;

	var _parseFloat$2 = _parseFloat$1;

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var ENDS_WITH = 'endsWith';
	var $endsWith = ''[ENDS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /* , endPosition = @length */) {
	    var that = _stringContext(this, searchString, ENDS_WITH);
	    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
	    var len = _toLength(that.length);
	    var end = endPosition === undefined ? len : Math.min(_toLength(endPosition), len);
	    var search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	var toString$1 = {}.toString;

	var _cof$1 = function (it) {
	  return toString$1.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject$1 = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof$1(it) == 'String' ? it.split('') : Object(it);
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject$1 = function (it) {
	  return _iobject$1(_defined$1(it));
	};

	var _library$1 = true;

	var _redefine$1 = _hide$1;

	// 7.1.4 ToInteger
	var ceil$1 = Math.ceil;
	var floor$1 = Math.floor;
	var _toInteger$1 = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor$1 : ceil$1)(it);
	};

	// 7.1.15 ToLength

	var min$2 = Math.min;
	var _toLength$1 = function (it) {
	  return it > 0 ? min$2(_toInteger$1(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max$1 = Math.max;
	var min$3 = Math.min;
	var _toAbsoluteIndex$1 = function (index, length) {
	  index = _toInteger$1(index);
	  return index < 0 ? max$1(index + length, 0) : min$3(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes$1 = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject$1($this);
	    var length = _toLength$1(O.length);
	    var index = _toAbsoluteIndex$1(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _shared$1 = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global$1[SHARED] || (_global$1[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core$1.version,
	  mode: _library$1 ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id$1 = 0;
	var px$1 = Math.random();
	var _uid$1 = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$1 + px$1).toString(36));
	};

	var shared$1 = _shared$1('keys');

	var _sharedKey$1 = function (key) {
	  return shared$1[key] || (shared$1[key] = _uid$1(key));
	};

	var arrayIndexOf$1 = _arrayIncludes$1(false);
	var IE_PROTO$2 = _sharedKey$1('IE_PROTO');

	var _objectKeysInternal$1 = function (object, names) {
	  var O = _toIobject$1(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO$2) _has$1(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has$1(O, key = names[i++])) {
	    ~arrayIndexOf$1(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys$1 = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys$1 = Object.keys || function keys(O) {
	  return _objectKeysInternal$1(O, _enumBugKeys$1);
	};

	var _objectDps$1 = _descriptors$1 ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject$1(O);
	  var keys = _objectKeys$1(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp$1.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$4 = _global$1.document;
	var _html$1 = document$4 && document$4.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$3 = _sharedKey$1('IE_PROTO');
	var Empty$1 = function () { /* empty */ };
	var PROTOTYPE$3 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict$1 = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate$1('iframe');
	  var i = _enumBugKeys$1.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html$1.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict$1 = iframeDocument.F;
	  while (i--) delete createDict$1[PROTOTYPE$3][_enumBugKeys$1[i]];
	  return createDict$1();
	};

	var _objectCreate$1 = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty$1[PROTOTYPE$3] = _anObject$1(O);
	    result = new Empty$1();
	    Empty$1[PROTOTYPE$3] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$3] = O;
	  } else result = createDict$1();
	  return Properties === undefined ? result : _objectDps$1(result, Properties);
	};

	var _wks$1 = createCommonjsModule(function (module) {
	var store = _shared$1('wks');

	var Symbol = _global$1.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid$1)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var def = _objectDp$1.f;

	var TAG = _wks$1('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has$1(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide$1(IteratorPrototype, _wks$1('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate$1(IteratorPrototype, { next: _propertyDesc$1(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined$1(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$4 = _sharedKey$1('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has$1(O, IE_PROTO$4)) return O[IE_PROTO$4];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks$1('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library$1 && typeof IteratorPrototype[ITERATOR] != 'function') _hide$1(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library$1 || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide$1(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine$1(proto, key, methods[key]);
	    } else _export$1(_export$1.P + _export$1.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject$1(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	var TO_STRING_TAG = _wks$1('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = _global$1[NAME];
	  var proto$1 = Collection && Collection.prototype;
	  if (proto$1 && !proto$1[TO_STRING_TAG]) _hide$1(proto$1, TO_STRING_TAG, NAME);
	  _iterators[NAME] = _iterators.Array;
	}

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined$1(that));
	    var i = _toInteger$1(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var $at = _stringAt(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	_iterDefine(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks$1('toStringTag');
	// ES3 wrong here
	var ARG = _cof$1(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof$1(O)
	    // ES3 arguments fallback
	    : (B = _cof$1(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var ITERATOR$1 = _wks$1('iterator');

	var core_getIteratorMethod = _core$1.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
	    || it['@@iterator']
	    || _iterators[_classof(it)];
	};

	var core_getIterator = _core$1.getIterator = function (it) {
	  var iterFn = core_getIteratorMethod(it);
	  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
	  return _anObject$1(iterFn.call(it));
	};

	var getIterator = core_getIterator;

	var getIterator$1 = getIterator;

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables$1 = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep$1 = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators$1 = {};

	var def$1 = _objectDp.f;

	var TAG$2 = _wks('toStringTag');

	var _setToStringTag$1 = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG$2)) def$1(it, TAG$2, { configurable: true, value: tag });
	};

	var IteratorPrototype$1 = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype$1, _wks('iterator'), function () { return this; });

	var _iterCreate$1 = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype$1, { next: _propertyDesc(1, next) });
	  _setToStringTag$1(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject$1 = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$5 = _sharedKey('IE_PROTO');
	var ObjectProto$1 = Object.prototype;

	var _objectGpo$1 = Object.getPrototypeOf || function (O) {
	  O = _toObject$1(O);
	  if (_has(O, IE_PROTO$5)) return O[IE_PROTO$5];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto$1 : null;
	};

	var ITERATOR$2 = _wks('iterator');
	var BUGGY$1 = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR$1 = '@@iterator';
	var KEYS$1 = 'keys';
	var VALUES$1 = 'values';

	var returnThis$1 = function () { return this; };

	var _iterDefine$1 = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate$1(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY$1 && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS$1: return function keys() { return new Constructor(this, kind); };
	      case VALUES$1: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES$1;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR$2] || proto[FF_ITERATOR$1] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo$1($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag$1(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR$2] != 'function') _hide(IteratorPrototype, ITERATOR$2, returnThis$1);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES$1) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY$1 || VALUES_BUG || !proto[ITERATOR$2])) {
	    _hide(proto, ITERATOR$2, $default);
	  }
	  // Plug for library
	  _iterators$1[NAME] = $default;
	  _iterators$1[TAG] = returnThis$1;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES$1),
	      keys: IS_SET ? $default : getMethod(KEYS$1),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY$1 || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator$1 = _iterDefine$1(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep$1(1);
	  }
	  if (kind == 'keys') return _iterStep$1(0, index);
	  if (kind == 'values') return _iterStep$1(0, O[index]);
	  return _iterStep$1(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators$1.Arguments = _iterators$1.Array;

	_addToUnscopables$1('keys');
	_addToUnscopables$1('values');
	_addToUnscopables$1('entries');

	var ITERATOR$3 = _wks('iterator');
	var TO_STRING_TAG$1 = _wks('toStringTag');
	var ArrayValues = _iterators$1.Array;

	var DOMIterables$1 = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables$1), i$1 = 0; i$1 < collections.length; i$1++) {
	  var NAME$1 = collections[i$1];
	  var explicit = DOMIterables$1[NAME$1];
	  var Collection$1 = _global[NAME$1];
	  var proto$2 = Collection$1 && Collection$1.prototype;
	  var key$1;
	  if (proto$2) {
	    if (!proto$2[ITERATOR$3]) _hide(proto$2, ITERATOR$3, ArrayValues);
	    if (!proto$2[TO_STRING_TAG$1]) _hide(proto$2, TO_STRING_TAG$1, NAME$1);
	    _iterators$1[NAME$1] = ArrayValues;
	    if (explicit) for (key$1 in es6_array_iterator$1) if (!proto$2[key$1]) _redefine(proto$2, key$1, es6_array_iterator$1[key$1], true);
	  }
	}

	/*!
	 * helper-js v1.2.2
	 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Released under the MIT License.
	 */

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = Object.getOwnPropertyDescriptor(object, property);

	  if (desc === undefined) {
	    var parent = Object.getPrototypeOf(object);

	    if (parent === null) {
	      return undefined;
	    } else {
	      return _get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;

	    if (getter === undefined) {
	      return undefined;
	    }

	    return getter.call(receiver);
	  }
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _toConsumableArray(arr) {
	  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	}

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	    return arr2;
	  }
	}

	function _iterableToArray(iter) {
	  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	}

	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance");
	}

	// local store
	var store = {}; // get global

	function glb() {
	  if (store.glb) {
	    return store.glb;
	  } else {
	    // resolve global
	    var t;

	    try {
	      t = global;
	    } catch (e) {
	      t = window;
	    }

	    store.glb = t;
	    return t;
	  }
	} // is 各种判断
	function isArray(v) {
	  return Object.prototype.toString.call(v) === '[object Array]';
	}
	function isString(v) {
	  return Object.prototype.toString.call(v) === '[object String]';
	}
	function isFunction(v) {
	  return typeof v === 'function';
	}
	function arrayLast(arr) {
	  return arr[arr.length - 1];
	}
	function debounce(action) {
	  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	  var immediate = arguments.length > 2 ? arguments[2] : undefined;
	  var t;
	  var delaying;
	  var lastArgs; // when trailing, use last args

	  var wrappedAction = function wrappedAction() {
	    var _this = this;

	    var self = wrappedAction;

	    for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
	      args[_key4] = arguments[_key4];
	    }

	    lastArgs = args;

	    if (!delaying) {
	      delaying = true;
	      self.destroyed = false;

	      if (immediate) {
	        action.call.apply(action, [this].concat(args));
	        t = setTimeout(function () {
	          t = null;
	          delaying = false;
	          self.destroyed = true;
	        }, wait);
	      } else {
	        t = setTimeout(function () {
	          action.call.apply(action, [_this].concat(_toConsumableArray(lastArgs)));
	          t = null;
	          delaying = false;
	          self.destroyed = true;
	        }, wait);
	      }
	    }
	  };

	  wrappedAction.destroy = function () {
	    if (t) {
	      clearTimeout(t);
	      t = null;
	    }

	    delaying = false;
	    self.destroyed = true;
	  };

	  return wrappedAction;
	}

	function hasClass(el, className) {
	  if (el.classList) {
	    return el.classList.contains(className);
	  } else {
	    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
	  }
	} // source: http://youmightnotneedjquery.com/

	function onDOM(el, name, handler) {
	  for (var _len5 = arguments.length, args = new Array(_len5 > 3 ? _len5 - 3 : 0), _key6 = 3; _key6 < _len5; _key6++) {
	    args[_key6 - 3] = arguments[_key6];
	  }

	  if (el.addEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.addEventListener.apply(el, [name, handler].concat(args));
	  } else if (el.attachEvent) {
	    // IE 8 及更早 IE 版本
	    el.attachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	}
	function offDOM(el, name, handler) {
	  for (var _len6 = arguments.length, args = new Array(_len6 > 3 ? _len6 - 3 : 0), _key7 = 3; _key7 < _len6; _key7++) {
	    args[_key7 - 3] = arguments[_key7];
	  }

	  if (el.removeEventListener) {
	    // 所有主流浏览器，除了 IE 8 及更早 IE版本
	    el.removeEventListener.apply(el, [name, handler].concat(args));
	  } else if (el.detachEvent) {
	    // IE 8 及更早 IE 版本
	    el.detachEvent.apply(el, ["on".concat(name), handler].concat(args));
	  }
	} // advance
	var URLHelper =
	/*#__PURE__*/
	function () {
	  // protocol, hostname, port, pastname
	  function URLHelper(baseUrl) {
	    var _this2 = this;

	    _classCallCheck(this, URLHelper);

	    Object.defineProperty(this, "baseUrl", {
	      configurable: true,
	      enumerable: true,
	      writable: true,
	      value: ''
	    });
	    Object.defineProperty(this, "search", {
	      configurable: true,
	      enumerable: true,
	      writable: true,
	      value: {}
	    });
	    var t = decodeURI(baseUrl).split('?');
	    this.baseUrl = t[0];

	    if (t[1]) {
	      t[1].split('&').forEach(function (v) {
	        var t2 = v.split('=');
	        _this2.search[t2[0]] = t2[1] == null ? '' : decodeURIComponent(t2[1]);
	      });
	    }
	  }

	  _createClass(URLHelper, [{
	    key: "getHref",
	    value: function getHref() {
	      var _this3 = this;

	      var t = [this.baseUrl];
	      var searchStr = Object.keys(this.search).map(function (k) {
	        return "".concat(k, "=").concat(encodeURIComponent(_this3.search[k]));
	      }).join('&');

	      if (searchStr) {
	        t.push(searchStr);
	      }

	      return t.join('?');
	    }
	  }]);

	  return URLHelper;
	}(); // 解析函数参数, 帮助重载

	var EventProcessor =
	/*#__PURE__*/
	function () {
	  function EventProcessor() {
	    _classCallCheck(this, EventProcessor);

	    Object.defineProperty(this, "eventStore", {
	      configurable: true,
	      enumerable: true,
	      writable: true,
	      value: []
	    });
	  }

	  _createClass(EventProcessor, [{
	    key: "on",
	    value: function on(name, handler) {
	      this.eventStore.push({
	        name: name,
	        handler: handler
	      });
	    }
	  }, {
	    key: "once",
	    value: function once(name, handler) {
	      var _this4 = this;

	      var off = function off() {
	        _this4.off(name, wrappedHandler);
	      };

	      var wrappedHandler = function wrappedHandler() {
	        handler();
	        off();
	      };

	      this.on(name, wrappedHandler);
	      return off;
	    }
	  }, {
	    key: "off",
	    value: function off(name, handler) {
	      var indexes = []; // to remove indexes; reverse; 倒序的

	      var len = this.eventStore.length;

	      for (var i = 0; i < len; i++) {
	        var item = this.eventStore[i];

	        if (item.name === name && item.handler === handler) {
	          indexes.unshift(i);
	        }
	      }

	      for (var _i8 = 0; _i8 < indexes.length; _i8++) {
	        var index = indexes[_i8];
	        this.eventStore.splice(index, 1);
	      }
	    }
	  }, {
	    key: "emit",
	    value: function emit(name) {
	      // 重要: 先找到要执行的项放在新数组里, 因为执行项会改变事件项存储数组
	      var items = [];
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = this.eventStore[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var item = _step5.value;

	          if (item.name === name) {
	            items.push(item);
	          }
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }

	      for (var _len7 = arguments.length, args = new Array(_len7 > 1 ? _len7 - 1 : 0), _key8 = 1; _key8 < _len7; _key8++) {
	        args[_key8 - 1] = arguments[_key8];
	      }

	      for (var _i9 = 0; _i9 < items.length; _i9++) {
	        var _item = items[_i9];

	        _item.handler.apply(_item, args);
	      }
	    }
	  }]);

	  return EventProcessor;
	}();
	var CrossWindow =
	/*#__PURE__*/
	function (_EventProcessor) {
	  _inherits(CrossWindow, _EventProcessor);

	  function CrossWindow() {
	    var _this5;

	    _classCallCheck(this, CrossWindow);

	    _this5 = _possibleConstructorReturn(this, (CrossWindow.__proto__ || Object.getPrototypeOf(CrossWindow)).call(this));
	    Object.defineProperty(_assertThisInitialized(_this5), "storageName", {
	      configurable: true,
	      enumerable: true,
	      writable: true,
	      value: '_crossWindow'
	    });
	    var cls = CrossWindow;

	    if (!cls._listen) {
	      cls._listen = true;
	      onDOM(window, 'storage', function (ev) {
	        if (ev.key === _this5.storageName) {
	          var _get2;

	          var event = JSON.parse(ev.newValue);

	          (_get2 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", _assertThisInitialized(_this5))).call.apply(_get2, [_this5, event.name].concat(_toConsumableArray(event.args)));
	        }
	      });
	    }

	    return _this5;
	  }

	  _createClass(CrossWindow, [{
	    key: "emit",
	    value: function emit(name) {
	      var _get3;

	      for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key9 = 1; _key9 < _len8; _key9++) {
	        args[_key9 - 1] = arguments[_key9];
	      }

	      (_get3 = _get(CrossWindow.prototype.__proto__ || Object.getPrototypeOf(CrossWindow.prototype), "emit", this)).call.apply(_get3, [this, name].concat(args));

	      glb().localStorage.setItem(this.storageName, JSON.stringify({
	        name: name,
	        args: args,
	        // use random make storage event triggered every time
	        // 加入随机保证触发storage事件
	        random: Math.random()
	      }));
	    }
	  }]);

	  return CrossWindow;
	}(EventProcessor);

	/*!
	 * vue-functions v0.0.4
	 * (c) 2018-present phphe <phphe@outlook.com> (https://github.com/phphe)
	 * Released under the MIT License.
	 */
	function isPropTrue(value) {
	  return value === '' || value;
	}

	var update = function update() {
	  var _this = this;

	  if (!this.mounted) {
	    return;
	  }

	  var rowWidth = this.width + this.gutterX;
	  var rows = [];
	  var currentRow;
	  var raw; // row accumulate width; row累加宽度

	  if (!this.$refs.inner) {
	    // prevent error when hot reload npm run dev
	    return;
	  }

	  var growExisted; // row只允许一个grow col

	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    var _loop = function _loop() {
	      var el = _step.value;

	      if (el.tagName === 'BR') {
	        currentRow = null;
	        return "continue";
	      }

	      if (hasClass(el, 'clearfix')) {
	        return "continue";
	      }

	      var id = el.getAttribute('data-vm-id');
	      var col = _this.colsMapping[id];
	      col.isFirstCol = false;
	      col.isLastCol = false;
	      col.isLastRow = false;

	      if (isPropTrue(col.grow)) {
	        if (growExisted) {
	          currentRow = null;
	          growExisted = false;
	        } else {
	          growExisted = true;
	        }
	      } //


	      if (!currentRow) {
	        currentRow = [];
	        rows.push(currentRow);
	        raw = 0;
	      } //


	      var cw = void 0; // col width. _realWidth. contain margin

	      var setCw = function setCw(col, w) {
	        var isPx;

	        if (isString(w)) {
	          if (w.endsWith('px')) {
	            isPx = true;
	          }

	          w = _parseFloat$2(w);
	        }

	        if (!isPx && w <= 1) {
	          // width is proportion; 小于等于1的是比例
	          cw = _parseInt$2(rowWidth * w);
	          cw = cw > rowWidth ? rowWidth : cw; // col max width is 100%

	          col.cssWidth = cw - _this.gutterX;
	        } else {
	          // width is px; 指定像素
	          cw = w + _this.gutterX;
	          cw = cw > rowWidth ? rowWidth : cw; // col max width is 100%

	          col.cssWidth = w;
	        }
	      };

	      var restW = rowWidth - raw;

	      var cpw = _this.getColCurrentPropWidth(col, rowWidth, restW); // col prop width for current screen size


	      setCw(col, cpw); //

	      col._realWidth = cw;
	      raw += cw;

	      if (raw > rowWidth) {
	        currentRow = [col];
	        rows.push(currentRow);
	        raw = cw;
	      } else {
	        currentRow.push(col);
	      }
	    };

	    for (var _iterator = getIterator$1(this.$refs.inner.children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _ret = _loop();

	      if (_ret === "continue") continue;
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return != null) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  if (rows.length === 0) {
	    return;
	  } // when screen narrower than first col, first row is empty, so remove it


	  if (rows[0].length === 0) {
	    rows.shift();
	  } // grow col


	  for (var _i = 0; _i < rows.length; _i++) {
	    var row = rows[_i];
	    row[0].isFirstCol = true;
	    arrayLast(row).isLastCol = true; // sort

	    var restW = rowWidth; // rest width; 递减后剩余宽度

	    var growCol = void 0;
	    row.forEach(function (col, i) {
	      if (isPropTrue(col.grow)) {
	        growCol = col;
	      }

	      restW -= col._realWidth;
	    });

	    if (growCol) {
	      growCol.cssWidth += restW;
	      growCol._realWidth += restW;
	    } else if (restW <= 3) {
	      // 当剩下3px以内的剩余时, 加到最后一列上
	      var lastCol = arrayLast(row);
	      lastCol.cssWidth += restW;
	      lastCol._realWidth += restW;
	    }
	  }

	  arrayLast(rows).forEach(function (col) {
	    col.isLastRow = true;
	  });
	  this.$emit('updated', this); // recurse children row to updateWidth

	  var recurse = function recurse(cpt) {
	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = getIterator$1(cpt.$children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var child = _step2.value;

	        if (child.$options.isColRow_row) {
	          child.updateWidth();
	        } else {
	          recurse(child);
	        }
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }
	  };

	  this.$nextTick(function () {
	    recurse(_this);
	  });
	};

	var updateDebounced = debounce(update);
	var script = {
	  isColRow_row: true,
	  props: {
	    gutter: {
	      default: 16,
	      type: [Number, Array]
	    }
	  },
	  // components: {},
	  data: function data() {
	    return {
	      mounted: false,
	      width: null,
	      gutterX: null,
	      gutterY: null,
	      colsMapping: {},
	      inited: false
	    };
	  },
	  computed: {
	    colStyle: function colStyle() {
	      return {
	        marginRight: this.gutterX + 'px',
	        marginBottom: this.gutterY + 'px'
	      };
	    }
	  },
	  // watch: {},
	  methods: {
	    updateWidth: function updateWidth() {
	      this.width = this.$el.offsetWidth;
	    },
	    updateGutter: function updateGutter() {
	      var gutter = this.gutter;
	      var t = isArray(gutter) ? gutter : [gutter, gutter];
	      this.gutterX = t[0];
	      this.gutterY = t[1];
	    },
	    getColWidthProp: function getColWidthProp(col) {
	      if (col.width === 'auto') {
	        if (isPropTrue(col.grow)) {
	          return '1px';
	        } else {
	          return 1;
	        }
	      } else {
	        return col.width;
	      }
	    },
	    // get responsive width
	    getColCurrentPropWidth: function getColCurrentPropWidth(col, rowWidth, restW) {
	      var w = window.innerWidth;
	      var cw = this.getColWidthProp(col);
	      var r;

	      if (w < 768) {
	        r = getPrioritized(col.xs, cw);
	      } else if (w < 992) {
	        r = getPrioritized(col.sm, cw);
	      } else if (w < 1200) {
	        r = getPrioritized(col.md, col.sm, cw);
	      } else {
	        r = getPrioritized(col.lg, col.md, col.sm, cw);
	      }

	      if (isFunction(r)) {
	        return r(rowWidth, restW);
	      }

	      return r;
	    },
	    // find last col, row
	    update: update,
	    updateDebounced: updateDebounced,
	    registerCol: function registerCol(colVm) {
	      this.colsMapping[colVm._uid] = colVm;
	      this.updateDebounced();
	    },
	    unregisterCol: function unregisterCol(colVm) {
	      delete this.colsMapping[colVm._uid];
	      this.updateDebounced();
	    }
	  },
	  // created() {},
	  mounted: function mounted() {
	    var _this2 = this;

	    this.mounted = true;
	    this.updateWidth();
	    this.$watch('gutter', this.updateGutter, {
	      deep: true,
	      immediate: true
	    });
	    this.$watch('gutterX', this.updateDebounced);
	    this.$watch('gutterY', this.updateDebounced);
	    this.$watch('width', this.updateDebounced); //

	    this.onresize = function (e) {
	      _this2.updateWidth(e);
	    };

	    onDOM(window, 'resize', this.onresize); //

	    this.update(); //  may get wrong width because of scroll bar
	    //  可能因为滚动条后出现而得到错误的宽度

	    setTimeout(function () {
	      _this2.updateWidth();

	      setTimeout(function () {
	        _this2.inited = true;
	      }, 16);
	    }, 0);
	  },
	  beforeDestroy: function beforeDestroy() {
	    if (this.onresize) {
	      offDOM(window, 'resize', this.onresize);
	    }
	  }
	};

	function getPrioritized() {
	  for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
	    arr[_key] = arguments[_key];
	  }

	  for (var _i2 = 0; _i2 < arr.length; _i2++) {
	    var item = arr[_i2];

	    if (item != null) {
	      return item;
	    }
	  }

	  return arrayLast(arr);
	}

	/* script */
	            const __vue_script__ = script;
	/* template */
	var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cr-row",class:{'cr-row-uninited': !_vm.inited}},[_c('div',{ref:"inner",staticClass:"cr-row-inner"},[_vm._t("default"),_c('div',{staticClass:"clearfix"})],2)])};
	var __vue_staticRenderFns__ = [];

	  /* style */
	  const __vue_inject_styles__ = undefined;
	  /* scoped */
	  const __vue_scope_id__ = undefined;
	  /* module identifier */
	  const __vue_module_identifier__ = undefined;
	  /* functional template */
	  const __vue_is_functional_template__ = false;
	  /* component normalizer */
	  function __vue_normalize__(
	    template, style, script$$1,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script$$1 === 'function' ? script$$1.options : script$$1) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "Row.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Row = __vue_normalize__(
	    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
	    __vue_inject_styles__,
	    __vue_script__,
	    __vue_scope_id__,
	    __vue_is_functional_template__,
	    __vue_module_identifier__,
	    undefined,
	    undefined
	  );

	//
	var script$1 = {
	  props: {
	    width: {
	      default: 'auto'
	    },
	    grow: {},
	    // responsive
	    xs: {},
	    sm: {},
	    md: {},
	    lg: {}
	  },
	  components: {},
	  data: function data() {
	    return {
	      vmId: this._uid,
	      cssWidth: null,
	      isFirstCol: false,
	      isLastCol: false,
	      isLastRow: false
	    };
	  },
	  computed: {
	    colStyle: function colStyle() {
	      var r = {
	        width: this.cssWidth + 'px'
	      };

	      if (this.isFirstCol) {
	        r.clear = 'both';
	      }

	      if (this.isLastCol) {
	        r.marginRight = '0';
	      }

	      if (this.isLastRow) {
	        r.marginBottom = '0';
	      }

	      return r;
	    }
	  },
	  // watch: {},
	  // methods: {},
	  // created() {},
	  mounted: function mounted() {
	    this.$parent.registerCol(this);
	  },
	  beforeDestroy: function beforeDestroy() {
	    this.$parent.unregisterCol(this);
	  }
	};

	/* script */
	            const __vue_script__$1 = script$1;
	/* template */
	var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cr-col",style:([_vm.$parent.colStyle, _vm.colStyle]),attrs:{"data-vm-id":_vm.vmId,"isLastCol":_vm.isLastCol}},[_vm._t("default")],2)};
	var __vue_staticRenderFns__$1 = [];

	  /* style */
	  const __vue_inject_styles__$1 = undefined;
	  /* scoped */
	  const __vue_scope_id__$1 = undefined;
	  /* module identifier */
	  const __vue_module_identifier__$1 = undefined;
	  /* functional template */
	  const __vue_is_functional_template__$1 = false;
	  /* component normalizer */
	  function __vue_normalize__$1(
	    template, style, script,
	    scope, functional, moduleIdentifier,
	    createInjector, createInjectorSSR
	  ) {
	    const component = (typeof script === 'function' ? script.options : script) || {};

	    // For security concerns, we use only base name in production mode.
	    component.__file = "Col.vue";

	    if (!component.render) {
	      component.render = template.render;
	      component.staticRenderFns = template.staticRenderFns;
	      component._compiled = true;

	      if (functional) component.functional = true;
	    }

	    component._scopeId = scope;

	    return component
	  }
	  /* style inject */
	  
	  /* style inject SSR */
	  

	  
	  var Col = __vue_normalize__$1(
	    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
	    __vue_inject_styles__$1,
	    __vue_script__$1,
	    __vue_scope_id__$1,
	    __vue_is_functional_template__$1,
	    __vue_module_identifier__$1,
	    undefined,
	    undefined
	  );

	exports.Row = Row;
	exports.Col = Col;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
