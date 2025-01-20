"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lodash/_arrayMap.js
  var require_arrayMap = __commonJS({
    "node_modules/lodash/_arrayMap.js"(exports, module) {
      "use strict";
      function arrayMap(array, iteratee) {
        var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
        while (++index2 < length) {
          result[index2] = iteratee(array[index2], index2, array);
        }
        return result;
      }
      module.exports = arrayMap;
    }
  });

  // node_modules/lodash/_baseValues.js
  var require_baseValues = __commonJS({
    "node_modules/lodash/_baseValues.js"(exports, module) {
      "use strict";
      var arrayMap = require_arrayMap();
      function baseValues(object, props) {
        return arrayMap(props, function(key) {
          return object[key];
        });
      }
      module.exports = baseValues;
    }
  });

  // node_modules/lodash/_baseTimes.js
  var require_baseTimes = __commonJS({
    "node_modules/lodash/_baseTimes.js"(exports, module) {
      "use strict";
      function baseTimes(n, iteratee) {
        var index2 = -1, result = Array(n);
        while (++index2 < n) {
          result[index2] = iteratee(index2);
        }
        return result;
      }
      module.exports = baseTimes;
    }
  });

  // node_modules/lodash/_freeGlobal.js
  var require_freeGlobal = __commonJS({
    "node_modules/lodash/_freeGlobal.js"(exports, module) {
      "use strict";
      var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
      module.exports = freeGlobal;
    }
  });

  // node_modules/lodash/_root.js
  var require_root = __commonJS({
    "node_modules/lodash/_root.js"(exports, module) {
      "use strict";
      var freeGlobal = require_freeGlobal();
      var freeSelf = typeof self == "object" && self && self.Object === Object && self;
      var root = freeGlobal || freeSelf || Function("return this")();
      module.exports = root;
    }
  });

  // node_modules/lodash/_Symbol.js
  var require_Symbol = __commonJS({
    "node_modules/lodash/_Symbol.js"(exports, module) {
      "use strict";
      var root = require_root();
      var Symbol2 = root.Symbol;
      module.exports = Symbol2;
    }
  });

  // node_modules/lodash/_getRawTag.js
  var require_getRawTag = __commonJS({
    "node_modules/lodash/_getRawTag.js"(exports, module) {
      "use strict";
      var Symbol2 = require_Symbol();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var nativeObjectToString = objectProto.toString;
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function getRawTag(value) {
        var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
        try {
          value[symToStringTag] = void 0;
          var unmasked = true;
        } catch (e) {
        }
        var result = nativeObjectToString.call(value);
        if (unmasked) {
          if (isOwn) {
            value[symToStringTag] = tag;
          } else {
            delete value[symToStringTag];
          }
        }
        return result;
      }
      module.exports = getRawTag;
    }
  });

  // node_modules/lodash/_objectToString.js
  var require_objectToString = __commonJS({
    "node_modules/lodash/_objectToString.js"(exports, module) {
      "use strict";
      var objectProto = Object.prototype;
      var nativeObjectToString = objectProto.toString;
      function objectToString(value) {
        return nativeObjectToString.call(value);
      }
      module.exports = objectToString;
    }
  });

  // node_modules/lodash/_baseGetTag.js
  var require_baseGetTag = __commonJS({
    "node_modules/lodash/_baseGetTag.js"(exports, module) {
      "use strict";
      var Symbol2 = require_Symbol();
      var getRawTag = require_getRawTag();
      var objectToString = require_objectToString();
      var nullTag = "[object Null]";
      var undefinedTag = "[object Undefined]";
      var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
      function baseGetTag(value) {
        if (value == null) {
          return value === void 0 ? undefinedTag : nullTag;
        }
        return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
      }
      module.exports = baseGetTag;
    }
  });

  // node_modules/lodash/isObjectLike.js
  var require_isObjectLike = __commonJS({
    "node_modules/lodash/isObjectLike.js"(exports, module) {
      "use strict";
      function isObjectLike(value) {
        return value != null && typeof value == "object";
      }
      module.exports = isObjectLike;
    }
  });

  // node_modules/lodash/_baseIsArguments.js
  var require_baseIsArguments = __commonJS({
    "node_modules/lodash/_baseIsArguments.js"(exports, module) {
      "use strict";
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      function baseIsArguments(value) {
        return isObjectLike(value) && baseGetTag(value) == argsTag;
      }
      module.exports = baseIsArguments;
    }
  });

  // node_modules/lodash/isArguments.js
  var require_isArguments = __commonJS({
    "node_modules/lodash/isArguments.js"(exports, module) {
      "use strict";
      var baseIsArguments = require_baseIsArguments();
      var isObjectLike = require_isObjectLike();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var isArguments = baseIsArguments(function() {
        return arguments;
      }()) ? baseIsArguments : function(value) {
        return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
      };
      module.exports = isArguments;
    }
  });

  // node_modules/lodash/isArray.js
  var require_isArray = __commonJS({
    "node_modules/lodash/isArray.js"(exports, module) {
      "use strict";
      var isArray = Array.isArray;
      module.exports = isArray;
    }
  });

  // node_modules/lodash/stubFalse.js
  var require_stubFalse = __commonJS({
    "node_modules/lodash/stubFalse.js"(exports, module) {
      "use strict";
      function stubFalse() {
        return false;
      }
      module.exports = stubFalse;
    }
  });

  // node_modules/lodash/isBuffer.js
  var require_isBuffer = __commonJS({
    "node_modules/lodash/isBuffer.js"(exports, module) {
      "use strict";
      var root = require_root();
      var stubFalse = require_stubFalse();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var Buffer2 = moduleExports ? root.Buffer : void 0;
      var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
      var isBuffer = nativeIsBuffer || stubFalse;
      module.exports = isBuffer;
    }
  });

  // node_modules/lodash/_isIndex.js
  var require_isIndex = __commonJS({
    "node_modules/lodash/_isIndex.js"(exports, module) {
      "use strict";
      var MAX_SAFE_INTEGER = 9007199254740991;
      var reIsUint = /^(?:0|[1-9]\d*)$/;
      function isIndex(value, length) {
        var type = typeof value;
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
      }
      module.exports = isIndex;
    }
  });

  // node_modules/lodash/isLength.js
  var require_isLength = __commonJS({
    "node_modules/lodash/isLength.js"(exports, module) {
      "use strict";
      var MAX_SAFE_INTEGER = 9007199254740991;
      function isLength(value) {
        return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
      }
      module.exports = isLength;
    }
  });

  // node_modules/lodash/_baseIsTypedArray.js
  var require_baseIsTypedArray = __commonJS({
    "node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
      "use strict";
      var baseGetTag = require_baseGetTag();
      var isLength = require_isLength();
      var isObjectLike = require_isObjectLike();
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var funcTag = "[object Function]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var objectTag = "[object Object]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var weakMapTag = "[object WeakMap]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var float32Tag = "[object Float32Array]";
      var float64Tag = "[object Float64Array]";
      var int8Tag = "[object Int8Array]";
      var int16Tag = "[object Int16Array]";
      var int32Tag = "[object Int32Array]";
      var uint8Tag = "[object Uint8Array]";
      var uint8ClampedTag = "[object Uint8ClampedArray]";
      var uint16Tag = "[object Uint16Array]";
      var uint32Tag = "[object Uint32Array]";
      var typedArrayTags = {};
      typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
      typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
      function baseIsTypedArray(value) {
        return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
      }
      module.exports = baseIsTypedArray;
    }
  });

  // node_modules/lodash/_baseUnary.js
  var require_baseUnary = __commonJS({
    "node_modules/lodash/_baseUnary.js"(exports, module) {
      "use strict";
      function baseUnary(func) {
        return function(value) {
          return func(value);
        };
      }
      module.exports = baseUnary;
    }
  });

  // node_modules/lodash/_nodeUtil.js
  var require_nodeUtil = __commonJS({
    "node_modules/lodash/_nodeUtil.js"(exports, module) {
      "use strict";
      var freeGlobal = require_freeGlobal();
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
      var moduleExports = freeModule && freeModule.exports === freeExports;
      var freeProcess = moduleExports && freeGlobal.process;
      var nodeUtil = function() {
        try {
          var types = freeModule && freeModule.require && freeModule.require("util").types;
          if (types) {
            return types;
          }
          return freeProcess && freeProcess.binding && freeProcess.binding("util");
        } catch (e) {
        }
      }();
      module.exports = nodeUtil;
    }
  });

  // node_modules/lodash/isTypedArray.js
  var require_isTypedArray = __commonJS({
    "node_modules/lodash/isTypedArray.js"(exports, module) {
      "use strict";
      var baseIsTypedArray = require_baseIsTypedArray();
      var baseUnary = require_baseUnary();
      var nodeUtil = require_nodeUtil();
      var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
      var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
      module.exports = isTypedArray;
    }
  });

  // node_modules/lodash/_arrayLikeKeys.js
  var require_arrayLikeKeys = __commonJS({
    "node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
      "use strict";
      var baseTimes = require_baseTimes();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isIndex = require_isIndex();
      var isTypedArray = require_isTypedArray();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function arrayLikeKeys(value, inherited) {
        var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
        for (var key in value) {
          if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
          (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
          isIndex(key, length)))) {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = arrayLikeKeys;
    }
  });

  // node_modules/lodash/_isPrototype.js
  var require_isPrototype = __commonJS({
    "node_modules/lodash/_isPrototype.js"(exports, module) {
      "use strict";
      var objectProto = Object.prototype;
      function isPrototype(value) {
        var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
        return value === proto;
      }
      module.exports = isPrototype;
    }
  });

  // node_modules/lodash/_overArg.js
  var require_overArg = __commonJS({
    "node_modules/lodash/_overArg.js"(exports, module) {
      "use strict";
      function overArg(func, transform) {
        return function(arg) {
          return func(transform(arg));
        };
      }
      module.exports = overArg;
    }
  });

  // node_modules/lodash/_nativeKeys.js
  var require_nativeKeys = __commonJS({
    "node_modules/lodash/_nativeKeys.js"(exports, module) {
      "use strict";
      var overArg = require_overArg();
      var nativeKeys = overArg(Object.keys, Object);
      module.exports = nativeKeys;
    }
  });

  // node_modules/lodash/_baseKeys.js
  var require_baseKeys = __commonJS({
    "node_modules/lodash/_baseKeys.js"(exports, module) {
      "use strict";
      var isPrototype = require_isPrototype();
      var nativeKeys = require_nativeKeys();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseKeys(object) {
        if (!isPrototype(object)) {
          return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
          if (hasOwnProperty.call(object, key) && key != "constructor") {
            result.push(key);
          }
        }
        return result;
      }
      module.exports = baseKeys;
    }
  });

  // node_modules/lodash/isObject.js
  var require_isObject = __commonJS({
    "node_modules/lodash/isObject.js"(exports, module) {
      "use strict";
      function isObject(value) {
        var type = typeof value;
        return value != null && (type == "object" || type == "function");
      }
      module.exports = isObject;
    }
  });

  // node_modules/lodash/isFunction.js
  var require_isFunction = __commonJS({
    "node_modules/lodash/isFunction.js"(exports, module) {
      "use strict";
      var baseGetTag = require_baseGetTag();
      var isObject = require_isObject();
      var asyncTag = "[object AsyncFunction]";
      var funcTag = "[object Function]";
      var genTag = "[object GeneratorFunction]";
      var proxyTag = "[object Proxy]";
      function isFunction(value) {
        if (!isObject(value)) {
          return false;
        }
        var tag = baseGetTag(value);
        return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
      }
      module.exports = isFunction;
    }
  });

  // node_modules/lodash/isArrayLike.js
  var require_isArrayLike = __commonJS({
    "node_modules/lodash/isArrayLike.js"(exports, module) {
      "use strict";
      var isFunction = require_isFunction();
      var isLength = require_isLength();
      function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction(value);
      }
      module.exports = isArrayLike;
    }
  });

  // node_modules/lodash/keys.js
  var require_keys = __commonJS({
    "node_modules/lodash/keys.js"(exports, module) {
      "use strict";
      var arrayLikeKeys = require_arrayLikeKeys();
      var baseKeys = require_baseKeys();
      var isArrayLike = require_isArrayLike();
      function keys2(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
      }
      module.exports = keys2;
    }
  });

  // node_modules/lodash/values.js
  var require_values = __commonJS({
    "node_modules/lodash/values.js"(exports, module) {
      "use strict";
      var baseValues = require_baseValues();
      var keys2 = require_keys();
      function values2(object) {
        return object == null ? [] : baseValues(object, keys2(object));
      }
      module.exports = values2;
    }
  });

  // node_modules/lodash/isSymbol.js
  var require_isSymbol = __commonJS({
    "node_modules/lodash/isSymbol.js"(exports, module) {
      "use strict";
      var baseGetTag = require_baseGetTag();
      var isObjectLike = require_isObjectLike();
      var symbolTag = "[object Symbol]";
      function isSymbol(value) {
        return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
      }
      module.exports = isSymbol;
    }
  });

  // node_modules/lodash/_isKey.js
  var require_isKey = __commonJS({
    "node_modules/lodash/_isKey.js"(exports, module) {
      "use strict";
      var isArray = require_isArray();
      var isSymbol = require_isSymbol();
      var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
      var reIsPlainProp = /^\w*$/;
      function isKey(value, object) {
        if (isArray(value)) {
          return false;
        }
        var type = typeof value;
        if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
          return true;
        }
        return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
      }
      module.exports = isKey;
    }
  });

  // node_modules/lodash/_coreJsData.js
  var require_coreJsData = __commonJS({
    "node_modules/lodash/_coreJsData.js"(exports, module) {
      "use strict";
      var root = require_root();
      var coreJsData = root["__core-js_shared__"];
      module.exports = coreJsData;
    }
  });

  // node_modules/lodash/_isMasked.js
  var require_isMasked = __commonJS({
    "node_modules/lodash/_isMasked.js"(exports, module) {
      "use strict";
      var coreJsData = require_coreJsData();
      var maskSrcKey = function() {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
        return uid ? "Symbol(src)_1." + uid : "";
      }();
      function isMasked(func) {
        return !!maskSrcKey && maskSrcKey in func;
      }
      module.exports = isMasked;
    }
  });

  // node_modules/lodash/_toSource.js
  var require_toSource = __commonJS({
    "node_modules/lodash/_toSource.js"(exports, module) {
      "use strict";
      var funcProto = Function.prototype;
      var funcToString = funcProto.toString;
      function toSource(func) {
        if (func != null) {
          try {
            return funcToString.call(func);
          } catch (e) {
          }
          try {
            return func + "";
          } catch (e) {
          }
        }
        return "";
      }
      module.exports = toSource;
    }
  });

  // node_modules/lodash/_baseIsNative.js
  var require_baseIsNative = __commonJS({
    "node_modules/lodash/_baseIsNative.js"(exports, module) {
      "use strict";
      var isFunction = require_isFunction();
      var isMasked = require_isMasked();
      var isObject = require_isObject();
      var toSource = require_toSource();
      var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
      var reIsHostCtor = /^\[object .+?Constructor\]$/;
      var funcProto = Function.prototype;
      var objectProto = Object.prototype;
      var funcToString = funcProto.toString;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var reIsNative = RegExp(
        "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      );
      function baseIsNative(value) {
        if (!isObject(value) || isMasked(value)) {
          return false;
        }
        var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
      }
      module.exports = baseIsNative;
    }
  });

  // node_modules/lodash/_getValue.js
  var require_getValue = __commonJS({
    "node_modules/lodash/_getValue.js"(exports, module) {
      "use strict";
      function getValue(object, key) {
        return object == null ? void 0 : object[key];
      }
      module.exports = getValue;
    }
  });

  // node_modules/lodash/_getNative.js
  var require_getNative = __commonJS({
    "node_modules/lodash/_getNative.js"(exports, module) {
      "use strict";
      var baseIsNative = require_baseIsNative();
      var getValue = require_getValue();
      function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : void 0;
      }
      module.exports = getNative;
    }
  });

  // node_modules/lodash/_nativeCreate.js
  var require_nativeCreate = __commonJS({
    "node_modules/lodash/_nativeCreate.js"(exports, module) {
      "use strict";
      var getNative = require_getNative();
      var nativeCreate = getNative(Object, "create");
      module.exports = nativeCreate;
    }
  });

  // node_modules/lodash/_hashClear.js
  var require_hashClear = __commonJS({
    "node_modules/lodash/_hashClear.js"(exports, module) {
      "use strict";
      var nativeCreate = require_nativeCreate();
      function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
        this.size = 0;
      }
      module.exports = hashClear;
    }
  });

  // node_modules/lodash/_hashDelete.js
  var require_hashDelete = __commonJS({
    "node_modules/lodash/_hashDelete.js"(exports, module) {
      "use strict";
      function hashDelete(key) {
        var result = this.has(key) && delete this.__data__[key];
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = hashDelete;
    }
  });

  // node_modules/lodash/_hashGet.js
  var require_hashGet = __commonJS({
    "node_modules/lodash/_hashGet.js"(exports, module) {
      "use strict";
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
          var result = data[key];
          return result === HASH_UNDEFINED ? void 0 : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : void 0;
      }
      module.exports = hashGet;
    }
  });

  // node_modules/lodash/_hashHas.js
  var require_hashHas = __commonJS({
    "node_modules/lodash/_hashHas.js"(exports, module) {
      "use strict";
      var nativeCreate = require_nativeCreate();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
      }
      module.exports = hashHas;
    }
  });

  // node_modules/lodash/_hashSet.js
  var require_hashSet = __commonJS({
    "node_modules/lodash/_hashSet.js"(exports, module) {
      "use strict";
      var nativeCreate = require_nativeCreate();
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function hashSet(key, value) {
        var data = this.__data__;
        this.size += this.has(key) ? 0 : 1;
        data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
        return this;
      }
      module.exports = hashSet;
    }
  });

  // node_modules/lodash/_Hash.js
  var require_Hash = __commonJS({
    "node_modules/lodash/_Hash.js"(exports, module) {
      "use strict";
      var hashClear = require_hashClear();
      var hashDelete = require_hashDelete();
      var hashGet = require_hashGet();
      var hashHas = require_hashHas();
      var hashSet = require_hashSet();
      function Hash(entries) {
        var index2 = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      Hash.prototype.clear = hashClear;
      Hash.prototype["delete"] = hashDelete;
      Hash.prototype.get = hashGet;
      Hash.prototype.has = hashHas;
      Hash.prototype.set = hashSet;
      module.exports = Hash;
    }
  });

  // node_modules/lodash/_listCacheClear.js
  var require_listCacheClear = __commonJS({
    "node_modules/lodash/_listCacheClear.js"(exports, module) {
      "use strict";
      function listCacheClear() {
        this.__data__ = [];
        this.size = 0;
      }
      module.exports = listCacheClear;
    }
  });

  // node_modules/lodash/eq.js
  var require_eq = __commonJS({
    "node_modules/lodash/eq.js"(exports, module) {
      "use strict";
      function eq(value, other) {
        return value === other || value !== value && other !== other;
      }
      module.exports = eq;
    }
  });

  // node_modules/lodash/_assocIndexOf.js
  var require_assocIndexOf = __commonJS({
    "node_modules/lodash/_assocIndexOf.js"(exports, module) {
      "use strict";
      var eq = require_eq();
      function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
          if (eq(array[length][0], key)) {
            return length;
          }
        }
        return -1;
      }
      module.exports = assocIndexOf;
    }
  });

  // node_modules/lodash/_listCacheDelete.js
  var require_listCacheDelete = __commonJS({
    "node_modules/lodash/_listCacheDelete.js"(exports, module) {
      "use strict";
      var assocIndexOf = require_assocIndexOf();
      var arrayProto = Array.prototype;
      var splice = arrayProto.splice;
      function listCacheDelete(key) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        if (index2 < 0) {
          return false;
        }
        var lastIndex = data.length - 1;
        if (index2 == lastIndex) {
          data.pop();
        } else {
          splice.call(data, index2, 1);
        }
        --this.size;
        return true;
      }
      module.exports = listCacheDelete;
    }
  });

  // node_modules/lodash/_listCacheGet.js
  var require_listCacheGet = __commonJS({
    "node_modules/lodash/_listCacheGet.js"(exports, module) {
      "use strict";
      var assocIndexOf = require_assocIndexOf();
      function listCacheGet(key) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        return index2 < 0 ? void 0 : data[index2][1];
      }
      module.exports = listCacheGet;
    }
  });

  // node_modules/lodash/_listCacheHas.js
  var require_listCacheHas = __commonJS({
    "node_modules/lodash/_listCacheHas.js"(exports, module) {
      "use strict";
      var assocIndexOf = require_assocIndexOf();
      function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
      }
      module.exports = listCacheHas;
    }
  });

  // node_modules/lodash/_listCacheSet.js
  var require_listCacheSet = __commonJS({
    "node_modules/lodash/_listCacheSet.js"(exports, module) {
      "use strict";
      var assocIndexOf = require_assocIndexOf();
      function listCacheSet(key, value) {
        var data = this.__data__, index2 = assocIndexOf(data, key);
        if (index2 < 0) {
          ++this.size;
          data.push([key, value]);
        } else {
          data[index2][1] = value;
        }
        return this;
      }
      module.exports = listCacheSet;
    }
  });

  // node_modules/lodash/_ListCache.js
  var require_ListCache = __commonJS({
    "node_modules/lodash/_ListCache.js"(exports, module) {
      "use strict";
      var listCacheClear = require_listCacheClear();
      var listCacheDelete = require_listCacheDelete();
      var listCacheGet = require_listCacheGet();
      var listCacheHas = require_listCacheHas();
      var listCacheSet = require_listCacheSet();
      function ListCache(entries) {
        var index2 = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      ListCache.prototype.clear = listCacheClear;
      ListCache.prototype["delete"] = listCacheDelete;
      ListCache.prototype.get = listCacheGet;
      ListCache.prototype.has = listCacheHas;
      ListCache.prototype.set = listCacheSet;
      module.exports = ListCache;
    }
  });

  // node_modules/lodash/_Map.js
  var require_Map = __commonJS({
    "node_modules/lodash/_Map.js"(exports, module) {
      "use strict";
      var getNative = require_getNative();
      var root = require_root();
      var Map2 = getNative(root, "Map");
      module.exports = Map2;
    }
  });

  // node_modules/lodash/_mapCacheClear.js
  var require_mapCacheClear = __commonJS({
    "node_modules/lodash/_mapCacheClear.js"(exports, module) {
      "use strict";
      var Hash = require_Hash();
      var ListCache = require_ListCache();
      var Map2 = require_Map();
      function mapCacheClear() {
        this.size = 0;
        this.__data__ = {
          "hash": new Hash(),
          "map": new (Map2 || ListCache)(),
          "string": new Hash()
        };
      }
      module.exports = mapCacheClear;
    }
  });

  // node_modules/lodash/_isKeyable.js
  var require_isKeyable = __commonJS({
    "node_modules/lodash/_isKeyable.js"(exports, module) {
      "use strict";
      function isKeyable(value) {
        var type = typeof value;
        return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
      }
      module.exports = isKeyable;
    }
  });

  // node_modules/lodash/_getMapData.js
  var require_getMapData = __commonJS({
    "node_modules/lodash/_getMapData.js"(exports, module) {
      "use strict";
      var isKeyable = require_isKeyable();
      function getMapData(map2, key) {
        var data = map2.__data__;
        return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
      }
      module.exports = getMapData;
    }
  });

  // node_modules/lodash/_mapCacheDelete.js
  var require_mapCacheDelete = __commonJS({
    "node_modules/lodash/_mapCacheDelete.js"(exports, module) {
      "use strict";
      var getMapData = require_getMapData();
      function mapCacheDelete(key) {
        var result = getMapData(this, key)["delete"](key);
        this.size -= result ? 1 : 0;
        return result;
      }
      module.exports = mapCacheDelete;
    }
  });

  // node_modules/lodash/_mapCacheGet.js
  var require_mapCacheGet = __commonJS({
    "node_modules/lodash/_mapCacheGet.js"(exports, module) {
      "use strict";
      var getMapData = require_getMapData();
      function mapCacheGet(key) {
        return getMapData(this, key).get(key);
      }
      module.exports = mapCacheGet;
    }
  });

  // node_modules/lodash/_mapCacheHas.js
  var require_mapCacheHas = __commonJS({
    "node_modules/lodash/_mapCacheHas.js"(exports, module) {
      "use strict";
      var getMapData = require_getMapData();
      function mapCacheHas(key) {
        return getMapData(this, key).has(key);
      }
      module.exports = mapCacheHas;
    }
  });

  // node_modules/lodash/_mapCacheSet.js
  var require_mapCacheSet = __commonJS({
    "node_modules/lodash/_mapCacheSet.js"(exports, module) {
      "use strict";
      var getMapData = require_getMapData();
      function mapCacheSet(key, value) {
        var data = getMapData(this, key), size = data.size;
        data.set(key, value);
        this.size += data.size == size ? 0 : 1;
        return this;
      }
      module.exports = mapCacheSet;
    }
  });

  // node_modules/lodash/_MapCache.js
  var require_MapCache = __commonJS({
    "node_modules/lodash/_MapCache.js"(exports, module) {
      "use strict";
      var mapCacheClear = require_mapCacheClear();
      var mapCacheDelete = require_mapCacheDelete();
      var mapCacheGet = require_mapCacheGet();
      var mapCacheHas = require_mapCacheHas();
      var mapCacheSet = require_mapCacheSet();
      function MapCache(entries) {
        var index2 = -1, length = entries == null ? 0 : entries.length;
        this.clear();
        while (++index2 < length) {
          var entry = entries[index2];
          this.set(entry[0], entry[1]);
        }
      }
      MapCache.prototype.clear = mapCacheClear;
      MapCache.prototype["delete"] = mapCacheDelete;
      MapCache.prototype.get = mapCacheGet;
      MapCache.prototype.has = mapCacheHas;
      MapCache.prototype.set = mapCacheSet;
      module.exports = MapCache;
    }
  });

  // node_modules/lodash/memoize.js
  var require_memoize = __commonJS({
    "node_modules/lodash/memoize.js"(exports, module) {
      "use strict";
      var MapCache = require_MapCache();
      var FUNC_ERROR_TEXT = "Expected a function";
      function memoize(func, resolver) {
        if (typeof func != "function" || resolver != null && typeof resolver != "function") {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
        var memoized = function() {
          var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
          if (cache2.has(key)) {
            return cache2.get(key);
          }
          var result = func.apply(this, args);
          memoized.cache = cache2.set(key, result) || cache2;
          return result;
        };
        memoized.cache = new (memoize.Cache || MapCache)();
        return memoized;
      }
      memoize.Cache = MapCache;
      module.exports = memoize;
    }
  });

  // node_modules/lodash/_memoizeCapped.js
  var require_memoizeCapped = __commonJS({
    "node_modules/lodash/_memoizeCapped.js"(exports, module) {
      "use strict";
      var memoize = require_memoize();
      var MAX_MEMOIZE_SIZE = 500;
      function memoizeCapped(func) {
        var result = memoize(func, function(key) {
          if (cache2.size === MAX_MEMOIZE_SIZE) {
            cache2.clear();
          }
          return key;
        });
        var cache2 = result.cache;
        return result;
      }
      module.exports = memoizeCapped;
    }
  });

  // node_modules/lodash/_stringToPath.js
  var require_stringToPath = __commonJS({
    "node_modules/lodash/_stringToPath.js"(exports, module) {
      "use strict";
      var memoizeCapped = require_memoizeCapped();
      var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = memoizeCapped(function(string) {
        var result = [];
        if (string.charCodeAt(0) === 46) {
          result.push("");
        }
        string.replace(rePropName, function(match, number, quote, subString) {
          result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
        });
        return result;
      });
      module.exports = stringToPath;
    }
  });

  // node_modules/lodash/_baseToString.js
  var require_baseToString = __commonJS({
    "node_modules/lodash/_baseToString.js"(exports, module) {
      "use strict";
      var Symbol2 = require_Symbol();
      var arrayMap = require_arrayMap();
      var isArray = require_isArray();
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolToString = symbolProto ? symbolProto.toString : void 0;
      function baseToString(value) {
        if (typeof value == "string") {
          return value;
        }
        if (isArray(value)) {
          return arrayMap(value, baseToString) + "";
        }
        if (isSymbol(value)) {
          return symbolToString ? symbolToString.call(value) : "";
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = baseToString;
    }
  });

  // node_modules/lodash/toString.js
  var require_toString = __commonJS({
    "node_modules/lodash/toString.js"(exports, module) {
      "use strict";
      var baseToString = require_baseToString();
      function toString(value) {
        return value == null ? "" : baseToString(value);
      }
      module.exports = toString;
    }
  });

  // node_modules/lodash/_castPath.js
  var require_castPath = __commonJS({
    "node_modules/lodash/_castPath.js"(exports, module) {
      "use strict";
      var isArray = require_isArray();
      var isKey = require_isKey();
      var stringToPath = require_stringToPath();
      var toString = require_toString();
      function castPath(value, object) {
        if (isArray(value)) {
          return value;
        }
        return isKey(value, object) ? [value] : stringToPath(toString(value));
      }
      module.exports = castPath;
    }
  });

  // node_modules/lodash/_toKey.js
  var require_toKey = __commonJS({
    "node_modules/lodash/_toKey.js"(exports, module) {
      "use strict";
      var isSymbol = require_isSymbol();
      var INFINITY = 1 / 0;
      function toKey(value) {
        if (typeof value == "string" || isSymbol(value)) {
          return value;
        }
        var result = value + "";
        return result == "0" && 1 / value == -INFINITY ? "-0" : result;
      }
      module.exports = toKey;
    }
  });

  // node_modules/lodash/_baseGet.js
  var require_baseGet = __commonJS({
    "node_modules/lodash/_baseGet.js"(exports, module) {
      "use strict";
      var castPath = require_castPath();
      var toKey = require_toKey();
      function baseGet(object, path) {
        path = castPath(path, object);
        var index2 = 0, length = path.length;
        while (object != null && index2 < length) {
          object = object[toKey(path[index2++])];
        }
        return index2 && index2 == length ? object : void 0;
      }
      module.exports = baseGet;
    }
  });

  // node_modules/lodash/get.js
  var require_get = __commonJS({
    "node_modules/lodash/get.js"(exports, module) {
      "use strict";
      var baseGet = require_baseGet();
      function get3(object, path, defaultValue) {
        var result = object == null ? void 0 : baseGet(object, path);
        return result === void 0 ? defaultValue : result;
      }
      module.exports = get3;
    }
  });

  // node_modules/lodash/_baseSlice.js
  var require_baseSlice = __commonJS({
    "node_modules/lodash/_baseSlice.js"(exports, module) {
      "use strict";
      function baseSlice(array, start, end) {
        var index2 = -1, length = array.length;
        if (start < 0) {
          start = -start > length ? 0 : length + start;
        }
        end = end > length ? length : end;
        if (end < 0) {
          end += length;
        }
        length = start > end ? 0 : end - start >>> 0;
        start >>>= 0;
        var result = Array(length);
        while (++index2 < length) {
          result[index2] = array[index2 + start];
        }
        return result;
      }
      module.exports = baseSlice;
    }
  });

  // node_modules/lodash/_trimmedEndIndex.js
  var require_trimmedEndIndex = __commonJS({
    "node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
      "use strict";
      var reWhitespace = /\s/;
      function trimmedEndIndex(string) {
        var index2 = string.length;
        while (index2-- && reWhitespace.test(string.charAt(index2))) {
        }
        return index2;
      }
      module.exports = trimmedEndIndex;
    }
  });

  // node_modules/lodash/_baseTrim.js
  var require_baseTrim = __commonJS({
    "node_modules/lodash/_baseTrim.js"(exports, module) {
      "use strict";
      var trimmedEndIndex = require_trimmedEndIndex();
      var reTrimStart = /^\s+/;
      function baseTrim(string) {
        return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
      }
      module.exports = baseTrim;
    }
  });

  // node_modules/lodash/toNumber.js
  var require_toNumber = __commonJS({
    "node_modules/lodash/toNumber.js"(exports, module) {
      "use strict";
      var baseTrim = require_baseTrim();
      var isObject = require_isObject();
      var isSymbol = require_isSymbol();
      var NAN = 0 / 0;
      var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
      var reIsBinary = /^0b[01]+$/i;
      var reIsOctal = /^0o[0-7]+$/i;
      var freeParseInt = parseInt;
      function toNumber(value) {
        if (typeof value == "number") {
          return value;
        }
        if (isSymbol(value)) {
          return NAN;
        }
        if (isObject(value)) {
          var other = typeof value.valueOf == "function" ? value.valueOf() : value;
          value = isObject(other) ? other + "" : other;
        }
        if (typeof value != "string") {
          return value === 0 ? value : +value;
        }
        value = baseTrim(value);
        var isBinary = reIsBinary.test(value);
        return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
      }
      module.exports = toNumber;
    }
  });

  // node_modules/lodash/toFinite.js
  var require_toFinite = __commonJS({
    "node_modules/lodash/toFinite.js"(exports, module) {
      "use strict";
      var toNumber = require_toNumber();
      var INFINITY = 1 / 0;
      var MAX_INTEGER = 17976931348623157e292;
      function toFinite(value) {
        if (!value) {
          return value === 0 ? value : 0;
        }
        value = toNumber(value);
        if (value === INFINITY || value === -INFINITY) {
          var sign = value < 0 ? -1 : 1;
          return sign * MAX_INTEGER;
        }
        return value === value ? value : 0;
      }
      module.exports = toFinite;
    }
  });

  // node_modules/lodash/toInteger.js
  var require_toInteger = __commonJS({
    "node_modules/lodash/toInteger.js"(exports, module) {
      "use strict";
      var toFinite = require_toFinite();
      function toInteger(value) {
        var result = toFinite(value), remainder = result % 1;
        return result === result ? remainder ? result - remainder : result : 0;
      }
      module.exports = toInteger;
    }
  });

  // node_modules/lodash/take.js
  var require_take = __commonJS({
    "node_modules/lodash/take.js"(exports, module) {
      "use strict";
      var baseSlice = require_baseSlice();
      var toInteger = require_toInteger();
      function take3(array, n, guard) {
        if (!(array && array.length)) {
          return [];
        }
        n = guard || n === void 0 ? 1 : toInteger(n);
        return baseSlice(array, 0, n < 0 ? 0 : n);
      }
      module.exports = take3;
    }
  });

  // node_modules/lodash/_arrayPush.js
  var require_arrayPush = __commonJS({
    "node_modules/lodash/_arrayPush.js"(exports, module) {
      "use strict";
      function arrayPush(array, values2) {
        var index2 = -1, length = values2.length, offset = array.length;
        while (++index2 < length) {
          array[offset + index2] = values2[index2];
        }
        return array;
      }
      module.exports = arrayPush;
    }
  });

  // node_modules/lodash/_isFlattenable.js
  var require_isFlattenable = __commonJS({
    "node_modules/lodash/_isFlattenable.js"(exports, module) {
      "use strict";
      var Symbol2 = require_Symbol();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
      function isFlattenable(value) {
        return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
      }
      module.exports = isFlattenable;
    }
  });

  // node_modules/lodash/_baseFlatten.js
  var require_baseFlatten = __commonJS({
    "node_modules/lodash/_baseFlatten.js"(exports, module) {
      "use strict";
      var arrayPush = require_arrayPush();
      var isFlattenable = require_isFlattenable();
      function baseFlatten(array, depth, predicate, isStrict, result) {
        var index2 = -1, length = array.length;
        predicate || (predicate = isFlattenable);
        result || (result = []);
        while (++index2 < length) {
          var value = array[index2];
          if (depth > 0 && predicate(value)) {
            if (depth > 1) {
              baseFlatten(value, depth - 1, predicate, isStrict, result);
            } else {
              arrayPush(result, value);
            }
          } else if (!isStrict) {
            result[result.length] = value;
          }
        }
        return result;
      }
      module.exports = baseFlatten;
    }
  });

  // node_modules/lodash/_stackClear.js
  var require_stackClear = __commonJS({
    "node_modules/lodash/_stackClear.js"(exports, module) {
      "use strict";
      var ListCache = require_ListCache();
      function stackClear() {
        this.__data__ = new ListCache();
        this.size = 0;
      }
      module.exports = stackClear;
    }
  });

  // node_modules/lodash/_stackDelete.js
  var require_stackDelete = __commonJS({
    "node_modules/lodash/_stackDelete.js"(exports, module) {
      "use strict";
      function stackDelete(key) {
        var data = this.__data__, result = data["delete"](key);
        this.size = data.size;
        return result;
      }
      module.exports = stackDelete;
    }
  });

  // node_modules/lodash/_stackGet.js
  var require_stackGet = __commonJS({
    "node_modules/lodash/_stackGet.js"(exports, module) {
      "use strict";
      function stackGet(key) {
        return this.__data__.get(key);
      }
      module.exports = stackGet;
    }
  });

  // node_modules/lodash/_stackHas.js
  var require_stackHas = __commonJS({
    "node_modules/lodash/_stackHas.js"(exports, module) {
      "use strict";
      function stackHas(key) {
        return this.__data__.has(key);
      }
      module.exports = stackHas;
    }
  });

  // node_modules/lodash/_stackSet.js
  var require_stackSet = __commonJS({
    "node_modules/lodash/_stackSet.js"(exports, module) {
      "use strict";
      var ListCache = require_ListCache();
      var Map2 = require_Map();
      var MapCache = require_MapCache();
      var LARGE_ARRAY_SIZE = 200;
      function stackSet(key, value) {
        var data = this.__data__;
        if (data instanceof ListCache) {
          var pairs = data.__data__;
          if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([key, value]);
            this.size = ++data.size;
            return this;
          }
          data = this.__data__ = new MapCache(pairs);
        }
        data.set(key, value);
        this.size = data.size;
        return this;
      }
      module.exports = stackSet;
    }
  });

  // node_modules/lodash/_Stack.js
  var require_Stack = __commonJS({
    "node_modules/lodash/_Stack.js"(exports, module) {
      "use strict";
      var ListCache = require_ListCache();
      var stackClear = require_stackClear();
      var stackDelete = require_stackDelete();
      var stackGet = require_stackGet();
      var stackHas = require_stackHas();
      var stackSet = require_stackSet();
      function Stack(entries) {
        var data = this.__data__ = new ListCache(entries);
        this.size = data.size;
      }
      Stack.prototype.clear = stackClear;
      Stack.prototype["delete"] = stackDelete;
      Stack.prototype.get = stackGet;
      Stack.prototype.has = stackHas;
      Stack.prototype.set = stackSet;
      module.exports = Stack;
    }
  });

  // node_modules/lodash/_setCacheAdd.js
  var require_setCacheAdd = __commonJS({
    "node_modules/lodash/_setCacheAdd.js"(exports, module) {
      "use strict";
      var HASH_UNDEFINED = "__lodash_hash_undefined__";
      function setCacheAdd(value) {
        this.__data__.set(value, HASH_UNDEFINED);
        return this;
      }
      module.exports = setCacheAdd;
    }
  });

  // node_modules/lodash/_setCacheHas.js
  var require_setCacheHas = __commonJS({
    "node_modules/lodash/_setCacheHas.js"(exports, module) {
      "use strict";
      function setCacheHas(value) {
        return this.__data__.has(value);
      }
      module.exports = setCacheHas;
    }
  });

  // node_modules/lodash/_SetCache.js
  var require_SetCache = __commonJS({
    "node_modules/lodash/_SetCache.js"(exports, module) {
      "use strict";
      var MapCache = require_MapCache();
      var setCacheAdd = require_setCacheAdd();
      var setCacheHas = require_setCacheHas();
      function SetCache(values2) {
        var index2 = -1, length = values2 == null ? 0 : values2.length;
        this.__data__ = new MapCache();
        while (++index2 < length) {
          this.add(values2[index2]);
        }
      }
      SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
      SetCache.prototype.has = setCacheHas;
      module.exports = SetCache;
    }
  });

  // node_modules/lodash/_arraySome.js
  var require_arraySome = __commonJS({
    "node_modules/lodash/_arraySome.js"(exports, module) {
      "use strict";
      function arraySome(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return true;
          }
        }
        return false;
      }
      module.exports = arraySome;
    }
  });

  // node_modules/lodash/_cacheHas.js
  var require_cacheHas = __commonJS({
    "node_modules/lodash/_cacheHas.js"(exports, module) {
      "use strict";
      function cacheHas(cache2, key) {
        return cache2.has(key);
      }
      module.exports = cacheHas;
    }
  });

  // node_modules/lodash/_equalArrays.js
  var require_equalArrays = __commonJS({
    "node_modules/lodash/_equalArrays.js"(exports, module) {
      "use strict";
      var SetCache = require_SetCache();
      var arraySome = require_arraySome();
      var cacheHas = require_cacheHas();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
        if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
          return false;
        }
        var arrStacked = stack.get(array);
        var othStacked = stack.get(other);
        if (arrStacked && othStacked) {
          return arrStacked == other && othStacked == array;
        }
        var index2 = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
        stack.set(array, other);
        stack.set(other, array);
        while (++index2 < arrLength) {
          var arrValue = array[index2], othValue = other[index2];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, arrValue, index2, other, array, stack) : customizer(arrValue, othValue, index2, array, other, stack);
          }
          if (compared !== void 0) {
            if (compared) {
              continue;
            }
            result = false;
            break;
          }
          if (seen) {
            if (!arraySome(other, function(othValue2, othIndex) {
              if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                return seen.push(othIndex);
              }
            })) {
              result = false;
              break;
            }
          } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
            result = false;
            break;
          }
        }
        stack["delete"](array);
        stack["delete"](other);
        return result;
      }
      module.exports = equalArrays;
    }
  });

  // node_modules/lodash/_Uint8Array.js
  var require_Uint8Array = __commonJS({
    "node_modules/lodash/_Uint8Array.js"(exports, module) {
      "use strict";
      var root = require_root();
      var Uint8Array2 = root.Uint8Array;
      module.exports = Uint8Array2;
    }
  });

  // node_modules/lodash/_mapToArray.js
  var require_mapToArray = __commonJS({
    "node_modules/lodash/_mapToArray.js"(exports, module) {
      "use strict";
      function mapToArray(map2) {
        var index2 = -1, result = Array(map2.size);
        map2.forEach(function(value, key) {
          result[++index2] = [key, value];
        });
        return result;
      }
      module.exports = mapToArray;
    }
  });

  // node_modules/lodash/_setToArray.js
  var require_setToArray = __commonJS({
    "node_modules/lodash/_setToArray.js"(exports, module) {
      "use strict";
      function setToArray(set2) {
        var index2 = -1, result = Array(set2.size);
        set2.forEach(function(value) {
          result[++index2] = value;
        });
        return result;
      }
      module.exports = setToArray;
    }
  });

  // node_modules/lodash/_equalByTag.js
  var require_equalByTag = __commonJS({
    "node_modules/lodash/_equalByTag.js"(exports, module) {
      "use strict";
      var Symbol2 = require_Symbol();
      var Uint8Array2 = require_Uint8Array();
      var eq = require_eq();
      var equalArrays = require_equalArrays();
      var mapToArray = require_mapToArray();
      var setToArray = require_setToArray();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      var boolTag = "[object Boolean]";
      var dateTag = "[object Date]";
      var errorTag = "[object Error]";
      var mapTag = "[object Map]";
      var numberTag = "[object Number]";
      var regexpTag = "[object RegExp]";
      var setTag = "[object Set]";
      var stringTag = "[object String]";
      var symbolTag = "[object Symbol]";
      var arrayBufferTag = "[object ArrayBuffer]";
      var dataViewTag = "[object DataView]";
      var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
      var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
      function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
        switch (tag) {
          case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
              return false;
            }
            object = object.buffer;
            other = other.buffer;
          case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
              return false;
            }
            return true;
          case boolTag:
          case dateTag:
          case numberTag:
            return eq(+object, +other);
          case errorTag:
            return object.name == other.name && object.message == other.message;
          case regexpTag:
          case stringTag:
            return object == other + "";
          case mapTag:
            var convert = mapToArray;
          case setTag:
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) {
              return false;
            }
            var stacked = stack.get(object);
            if (stacked) {
              return stacked == other;
            }
            bitmask |= COMPARE_UNORDERED_FLAG;
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
            stack["delete"](object);
            return result;
          case symbolTag:
            if (symbolValueOf) {
              return symbolValueOf.call(object) == symbolValueOf.call(other);
            }
        }
        return false;
      }
      module.exports = equalByTag;
    }
  });

  // node_modules/lodash/_baseGetAllKeys.js
  var require_baseGetAllKeys = __commonJS({
    "node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
      "use strict";
      var arrayPush = require_arrayPush();
      var isArray = require_isArray();
      function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
      }
      module.exports = baseGetAllKeys;
    }
  });

  // node_modules/lodash/_arrayFilter.js
  var require_arrayFilter = __commonJS({
    "node_modules/lodash/_arrayFilter.js"(exports, module) {
      "use strict";
      function arrayFilter(array, predicate) {
        var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
        while (++index2 < length) {
          var value = array[index2];
          if (predicate(value, index2, array)) {
            result[resIndex++] = value;
          }
        }
        return result;
      }
      module.exports = arrayFilter;
    }
  });

  // node_modules/lodash/stubArray.js
  var require_stubArray = __commonJS({
    "node_modules/lodash/stubArray.js"(exports, module) {
      "use strict";
      function stubArray() {
        return [];
      }
      module.exports = stubArray;
    }
  });

  // node_modules/lodash/_getSymbols.js
  var require_getSymbols = __commonJS({
    "node_modules/lodash/_getSymbols.js"(exports, module) {
      "use strict";
      var arrayFilter = require_arrayFilter();
      var stubArray = require_stubArray();
      var objectProto = Object.prototype;
      var propertyIsEnumerable = objectProto.propertyIsEnumerable;
      var nativeGetSymbols = Object.getOwnPropertySymbols;
      var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
        if (object == null) {
          return [];
        }
        object = Object(object);
        return arrayFilter(nativeGetSymbols(object), function(symbol) {
          return propertyIsEnumerable.call(object, symbol);
        });
      };
      module.exports = getSymbols;
    }
  });

  // node_modules/lodash/_getAllKeys.js
  var require_getAllKeys = __commonJS({
    "node_modules/lodash/_getAllKeys.js"(exports, module) {
      "use strict";
      var baseGetAllKeys = require_baseGetAllKeys();
      var getSymbols = require_getSymbols();
      var keys2 = require_keys();
      function getAllKeys(object) {
        return baseGetAllKeys(object, keys2, getSymbols);
      }
      module.exports = getAllKeys;
    }
  });

  // node_modules/lodash/_equalObjects.js
  var require_equalObjects = __commonJS({
    "node_modules/lodash/_equalObjects.js"(exports, module) {
      "use strict";
      var getAllKeys = require_getAllKeys();
      var COMPARE_PARTIAL_FLAG = 1;
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
        if (objLength != othLength && !isPartial) {
          return false;
        }
        var index2 = objLength;
        while (index2--) {
          var key = objProps[index2];
          if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
            return false;
          }
        }
        var objStacked = stack.get(object);
        var othStacked = stack.get(other);
        if (objStacked && othStacked) {
          return objStacked == other && othStacked == object;
        }
        var result = true;
        stack.set(object, other);
        stack.set(other, object);
        var skipCtor = isPartial;
        while (++index2 < objLength) {
          key = objProps[index2];
          var objValue = object[key], othValue = other[key];
          if (customizer) {
            var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
          }
          if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
            result = false;
            break;
          }
          skipCtor || (skipCtor = key == "constructor");
        }
        if (result && !skipCtor) {
          var objCtor = object.constructor, othCtor = other.constructor;
          if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
            result = false;
          }
        }
        stack["delete"](object);
        stack["delete"](other);
        return result;
      }
      module.exports = equalObjects;
    }
  });

  // node_modules/lodash/_DataView.js
  var require_DataView = __commonJS({
    "node_modules/lodash/_DataView.js"(exports, module) {
      "use strict";
      var getNative = require_getNative();
      var root = require_root();
      var DataView = getNative(root, "DataView");
      module.exports = DataView;
    }
  });

  // node_modules/lodash/_Promise.js
  var require_Promise = __commonJS({
    "node_modules/lodash/_Promise.js"(exports, module) {
      "use strict";
      var getNative = require_getNative();
      var root = require_root();
      var Promise2 = getNative(root, "Promise");
      module.exports = Promise2;
    }
  });

  // node_modules/lodash/_Set.js
  var require_Set = __commonJS({
    "node_modules/lodash/_Set.js"(exports, module) {
      "use strict";
      var getNative = require_getNative();
      var root = require_root();
      var Set2 = getNative(root, "Set");
      module.exports = Set2;
    }
  });

  // node_modules/lodash/_WeakMap.js
  var require_WeakMap = __commonJS({
    "node_modules/lodash/_WeakMap.js"(exports, module) {
      "use strict";
      var getNative = require_getNative();
      var root = require_root();
      var WeakMap = getNative(root, "WeakMap");
      module.exports = WeakMap;
    }
  });

  // node_modules/lodash/_getTag.js
  var require_getTag = __commonJS({
    "node_modules/lodash/_getTag.js"(exports, module) {
      "use strict";
      var DataView = require_DataView();
      var Map2 = require_Map();
      var Promise2 = require_Promise();
      var Set2 = require_Set();
      var WeakMap = require_WeakMap();
      var baseGetTag = require_baseGetTag();
      var toSource = require_toSource();
      var mapTag = "[object Map]";
      var objectTag = "[object Object]";
      var promiseTag = "[object Promise]";
      var setTag = "[object Set]";
      var weakMapTag = "[object WeakMap]";
      var dataViewTag = "[object DataView]";
      var dataViewCtorString = toSource(DataView);
      var mapCtorString = toSource(Map2);
      var promiseCtorString = toSource(Promise2);
      var setCtorString = toSource(Set2);
      var weakMapCtorString = toSource(WeakMap);
      var getTag = baseGetTag;
      if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
        getTag = function(value) {
          var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
          if (ctorString) {
            switch (ctorString) {
              case dataViewCtorString:
                return dataViewTag;
              case mapCtorString:
                return mapTag;
              case promiseCtorString:
                return promiseTag;
              case setCtorString:
                return setTag;
              case weakMapCtorString:
                return weakMapTag;
            }
          }
          return result;
        };
      }
      module.exports = getTag;
    }
  });

  // node_modules/lodash/_baseIsEqualDeep.js
  var require_baseIsEqualDeep = __commonJS({
    "node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
      "use strict";
      var Stack = require_Stack();
      var equalArrays = require_equalArrays();
      var equalByTag = require_equalByTag();
      var equalObjects = require_equalObjects();
      var getTag = require_getTag();
      var isArray = require_isArray();
      var isBuffer = require_isBuffer();
      var isTypedArray = require_isTypedArray();
      var COMPARE_PARTIAL_FLAG = 1;
      var argsTag = "[object Arguments]";
      var arrayTag = "[object Array]";
      var objectTag = "[object Object]";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
        var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
        objTag = objTag == argsTag ? objectTag : objTag;
        othTag = othTag == argsTag ? objectTag : othTag;
        var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
        if (isSameTag && isBuffer(object)) {
          if (!isBuffer(other)) {
            return false;
          }
          objIsArr = true;
          objIsObj = false;
        }
        if (isSameTag && !objIsObj) {
          stack || (stack = new Stack());
          return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        }
        if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
          var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
          if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack());
            return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          }
        }
        if (!isSameTag) {
          return false;
        }
        stack || (stack = new Stack());
        return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      }
      module.exports = baseIsEqualDeep;
    }
  });

  // node_modules/lodash/_baseIsEqual.js
  var require_baseIsEqual = __commonJS({
    "node_modules/lodash/_baseIsEqual.js"(exports, module) {
      "use strict";
      var baseIsEqualDeep = require_baseIsEqualDeep();
      var isObjectLike = require_isObjectLike();
      function baseIsEqual(value, other, bitmask, customizer, stack) {
        if (value === other) {
          return true;
        }
        if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
          return value !== value && other !== other;
        }
        return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
      }
      module.exports = baseIsEqual;
    }
  });

  // node_modules/lodash/_baseIsMatch.js
  var require_baseIsMatch = __commonJS({
    "node_modules/lodash/_baseIsMatch.js"(exports, module) {
      "use strict";
      var Stack = require_Stack();
      var baseIsEqual = require_baseIsEqual();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function baseIsMatch(object, source, matchData, customizer) {
        var index2 = matchData.length, length = index2, noCustomizer = !customizer;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (index2--) {
          var data = matchData[index2];
          if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
            return false;
          }
        }
        while (++index2 < length) {
          data = matchData[index2];
          var key = data[0], objValue = object[key], srcValue = data[1];
          if (noCustomizer && data[2]) {
            if (objValue === void 0 && !(key in object)) {
              return false;
            }
          } else {
            var stack = new Stack();
            if (customizer) {
              var result = customizer(objValue, srcValue, key, object, source, stack);
            }
            if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
              return false;
            }
          }
        }
        return true;
      }
      module.exports = baseIsMatch;
    }
  });

  // node_modules/lodash/_isStrictComparable.js
  var require_isStrictComparable = __commonJS({
    "node_modules/lodash/_isStrictComparable.js"(exports, module) {
      "use strict";
      var isObject = require_isObject();
      function isStrictComparable(value) {
        return value === value && !isObject(value);
      }
      module.exports = isStrictComparable;
    }
  });

  // node_modules/lodash/_getMatchData.js
  var require_getMatchData = __commonJS({
    "node_modules/lodash/_getMatchData.js"(exports, module) {
      "use strict";
      var isStrictComparable = require_isStrictComparable();
      var keys2 = require_keys();
      function getMatchData(object) {
        var result = keys2(object), length = result.length;
        while (length--) {
          var key = result[length], value = object[key];
          result[length] = [key, value, isStrictComparable(value)];
        }
        return result;
      }
      module.exports = getMatchData;
    }
  });

  // node_modules/lodash/_matchesStrictComparable.js
  var require_matchesStrictComparable = __commonJS({
    "node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
      "use strict";
      function matchesStrictComparable(key, srcValue) {
        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
        };
      }
      module.exports = matchesStrictComparable;
    }
  });

  // node_modules/lodash/_baseMatches.js
  var require_baseMatches = __commonJS({
    "node_modules/lodash/_baseMatches.js"(exports, module) {
      "use strict";
      var baseIsMatch = require_baseIsMatch();
      var getMatchData = require_getMatchData();
      var matchesStrictComparable = require_matchesStrictComparable();
      function baseMatches(source) {
        var matchData = getMatchData(source);
        if (matchData.length == 1 && matchData[0][2]) {
          return matchesStrictComparable(matchData[0][0], matchData[0][1]);
        }
        return function(object) {
          return object === source || baseIsMatch(object, source, matchData);
        };
      }
      module.exports = baseMatches;
    }
  });

  // node_modules/lodash/_baseHasIn.js
  var require_baseHasIn = __commonJS({
    "node_modules/lodash/_baseHasIn.js"(exports, module) {
      "use strict";
      function baseHasIn(object, key) {
        return object != null && key in Object(object);
      }
      module.exports = baseHasIn;
    }
  });

  // node_modules/lodash/_hasPath.js
  var require_hasPath = __commonJS({
    "node_modules/lodash/_hasPath.js"(exports, module) {
      "use strict";
      var castPath = require_castPath();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isIndex = require_isIndex();
      var isLength = require_isLength();
      var toKey = require_toKey();
      function hasPath(object, path, hasFunc) {
        path = castPath(path, object);
        var index2 = -1, length = path.length, result = false;
        while (++index2 < length) {
          var key = toKey(path[index2]);
          if (!(result = object != null && hasFunc(object, key))) {
            break;
          }
          object = object[key];
        }
        if (result || ++index2 != length) {
          return result;
        }
        length = object == null ? 0 : object.length;
        return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
      }
      module.exports = hasPath;
    }
  });

  // node_modules/lodash/hasIn.js
  var require_hasIn = __commonJS({
    "node_modules/lodash/hasIn.js"(exports, module) {
      "use strict";
      var baseHasIn = require_baseHasIn();
      var hasPath = require_hasPath();
      function hasIn(object, path) {
        return object != null && hasPath(object, path, baseHasIn);
      }
      module.exports = hasIn;
    }
  });

  // node_modules/lodash/_baseMatchesProperty.js
  var require_baseMatchesProperty = __commonJS({
    "node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
      "use strict";
      var baseIsEqual = require_baseIsEqual();
      var get3 = require_get();
      var hasIn = require_hasIn();
      var isKey = require_isKey();
      var isStrictComparable = require_isStrictComparable();
      var matchesStrictComparable = require_matchesStrictComparable();
      var toKey = require_toKey();
      var COMPARE_PARTIAL_FLAG = 1;
      var COMPARE_UNORDERED_FLAG = 2;
      function baseMatchesProperty(path, srcValue) {
        if (isKey(path) && isStrictComparable(srcValue)) {
          return matchesStrictComparable(toKey(path), srcValue);
        }
        return function(object) {
          var objValue = get3(object, path);
          return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
        };
      }
      module.exports = baseMatchesProperty;
    }
  });

  // node_modules/lodash/identity.js
  var require_identity = __commonJS({
    "node_modules/lodash/identity.js"(exports, module) {
      "use strict";
      function identity2(value) {
        return value;
      }
      module.exports = identity2;
    }
  });

  // node_modules/lodash/_baseProperty.js
  var require_baseProperty = __commonJS({
    "node_modules/lodash/_baseProperty.js"(exports, module) {
      "use strict";
      function baseProperty(key) {
        return function(object) {
          return object == null ? void 0 : object[key];
        };
      }
      module.exports = baseProperty;
    }
  });

  // node_modules/lodash/_basePropertyDeep.js
  var require_basePropertyDeep = __commonJS({
    "node_modules/lodash/_basePropertyDeep.js"(exports, module) {
      "use strict";
      var baseGet = require_baseGet();
      function basePropertyDeep(path) {
        return function(object) {
          return baseGet(object, path);
        };
      }
      module.exports = basePropertyDeep;
    }
  });

  // node_modules/lodash/property.js
  var require_property = __commonJS({
    "node_modules/lodash/property.js"(exports, module) {
      "use strict";
      var baseProperty = require_baseProperty();
      var basePropertyDeep = require_basePropertyDeep();
      var isKey = require_isKey();
      var toKey = require_toKey();
      function property(path) {
        return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
      }
      module.exports = property;
    }
  });

  // node_modules/lodash/_baseIteratee.js
  var require_baseIteratee = __commonJS({
    "node_modules/lodash/_baseIteratee.js"(exports, module) {
      "use strict";
      var baseMatches = require_baseMatches();
      var baseMatchesProperty = require_baseMatchesProperty();
      var identity2 = require_identity();
      var isArray = require_isArray();
      var property = require_property();
      function baseIteratee(value) {
        if (typeof value == "function") {
          return value;
        }
        if (value == null) {
          return identity2;
        }
        if (typeof value == "object") {
          return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
        }
        return property(value);
      }
      module.exports = baseIteratee;
    }
  });

  // node_modules/lodash/_createBaseFor.js
  var require_createBaseFor = __commonJS({
    "node_modules/lodash/_createBaseFor.js"(exports, module) {
      "use strict";
      function createBaseFor(fromRight) {
        return function(object, iteratee, keysFunc) {
          var index2 = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
          while (length--) {
            var key = props[fromRight ? length : ++index2];
            if (iteratee(iterable[key], key, iterable) === false) {
              break;
            }
          }
          return object;
        };
      }
      module.exports = createBaseFor;
    }
  });

  // node_modules/lodash/_baseFor.js
  var require_baseFor = __commonJS({
    "node_modules/lodash/_baseFor.js"(exports, module) {
      "use strict";
      var createBaseFor = require_createBaseFor();
      var baseFor = createBaseFor();
      module.exports = baseFor;
    }
  });

  // node_modules/lodash/_baseForOwn.js
  var require_baseForOwn = __commonJS({
    "node_modules/lodash/_baseForOwn.js"(exports, module) {
      "use strict";
      var baseFor = require_baseFor();
      var keys2 = require_keys();
      function baseForOwn(object, iteratee) {
        return object && baseFor(object, iteratee, keys2);
      }
      module.exports = baseForOwn;
    }
  });

  // node_modules/lodash/_createBaseEach.js
  var require_createBaseEach = __commonJS({
    "node_modules/lodash/_createBaseEach.js"(exports, module) {
      "use strict";
      var isArrayLike = require_isArrayLike();
      function createBaseEach(eachFunc, fromRight) {
        return function(collection, iteratee) {
          if (collection == null) {
            return collection;
          }
          if (!isArrayLike(collection)) {
            return eachFunc(collection, iteratee);
          }
          var length = collection.length, index2 = fromRight ? length : -1, iterable = Object(collection);
          while (fromRight ? index2-- : ++index2 < length) {
            if (iteratee(iterable[index2], index2, iterable) === false) {
              break;
            }
          }
          return collection;
        };
      }
      module.exports = createBaseEach;
    }
  });

  // node_modules/lodash/_baseEach.js
  var require_baseEach = __commonJS({
    "node_modules/lodash/_baseEach.js"(exports, module) {
      "use strict";
      var baseForOwn = require_baseForOwn();
      var createBaseEach = require_createBaseEach();
      var baseEach = createBaseEach(baseForOwn);
      module.exports = baseEach;
    }
  });

  // node_modules/lodash/_baseMap.js
  var require_baseMap = __commonJS({
    "node_modules/lodash/_baseMap.js"(exports, module) {
      "use strict";
      var baseEach = require_baseEach();
      var isArrayLike = require_isArrayLike();
      function baseMap(collection, iteratee) {
        var index2 = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
        baseEach(collection, function(value, key, collection2) {
          result[++index2] = iteratee(value, key, collection2);
        });
        return result;
      }
      module.exports = baseMap;
    }
  });

  // node_modules/lodash/_baseSortBy.js
  var require_baseSortBy = __commonJS({
    "node_modules/lodash/_baseSortBy.js"(exports, module) {
      "use strict";
      function baseSortBy(array, comparer) {
        var length = array.length;
        array.sort(comparer);
        while (length--) {
          array[length] = array[length].value;
        }
        return array;
      }
      module.exports = baseSortBy;
    }
  });

  // node_modules/lodash/_compareAscending.js
  var require_compareAscending = __commonJS({
    "node_modules/lodash/_compareAscending.js"(exports, module) {
      "use strict";
      var isSymbol = require_isSymbol();
      function compareAscending(value, other) {
        if (value !== other) {
          var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
          var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
          if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
            return 1;
          }
          if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
            return -1;
          }
        }
        return 0;
      }
      module.exports = compareAscending;
    }
  });

  // node_modules/lodash/_compareMultiple.js
  var require_compareMultiple = __commonJS({
    "node_modules/lodash/_compareMultiple.js"(exports, module) {
      "use strict";
      var compareAscending = require_compareAscending();
      function compareMultiple(object, other, orders) {
        var index2 = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
        while (++index2 < length) {
          var result = compareAscending(objCriteria[index2], othCriteria[index2]);
          if (result) {
            if (index2 >= ordersLength) {
              return result;
            }
            var order = orders[index2];
            return result * (order == "desc" ? -1 : 1);
          }
        }
        return object.index - other.index;
      }
      module.exports = compareMultiple;
    }
  });

  // node_modules/lodash/_baseOrderBy.js
  var require_baseOrderBy = __commonJS({
    "node_modules/lodash/_baseOrderBy.js"(exports, module) {
      "use strict";
      var arrayMap = require_arrayMap();
      var baseGet = require_baseGet();
      var baseIteratee = require_baseIteratee();
      var baseMap = require_baseMap();
      var baseSortBy = require_baseSortBy();
      var baseUnary = require_baseUnary();
      var compareMultiple = require_compareMultiple();
      var identity2 = require_identity();
      var isArray = require_isArray();
      function baseOrderBy(collection, iteratees, orders) {
        if (iteratees.length) {
          iteratees = arrayMap(iteratees, function(iteratee) {
            if (isArray(iteratee)) {
              return function(value) {
                return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
              };
            }
            return iteratee;
          });
        } else {
          iteratees = [identity2];
        }
        var index2 = -1;
        iteratees = arrayMap(iteratees, baseUnary(baseIteratee));
        var result = baseMap(collection, function(value, key, collection2) {
          var criteria = arrayMap(iteratees, function(iteratee) {
            return iteratee(value);
          });
          return { "criteria": criteria, "index": ++index2, "value": value };
        });
        return baseSortBy(result, function(object, other) {
          return compareMultiple(object, other, orders);
        });
      }
      module.exports = baseOrderBy;
    }
  });

  // node_modules/lodash/_apply.js
  var require_apply = __commonJS({
    "node_modules/lodash/_apply.js"(exports, module) {
      "use strict";
      function apply(func, thisArg, args) {
        switch (args.length) {
          case 0:
            return func.call(thisArg);
          case 1:
            return func.call(thisArg, args[0]);
          case 2:
            return func.call(thisArg, args[0], args[1]);
          case 3:
            return func.call(thisArg, args[0], args[1], args[2]);
        }
        return func.apply(thisArg, args);
      }
      module.exports = apply;
    }
  });

  // node_modules/lodash/_overRest.js
  var require_overRest = __commonJS({
    "node_modules/lodash/_overRest.js"(exports, module) {
      "use strict";
      var apply = require_apply();
      var nativeMax = Math.max;
      function overRest(func, start, transform) {
        start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
        return function() {
          var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
          while (++index2 < length) {
            array[index2] = args[start + index2];
          }
          index2 = -1;
          var otherArgs = Array(start + 1);
          while (++index2 < start) {
            otherArgs[index2] = args[index2];
          }
          otherArgs[start] = transform(array);
          return apply(func, this, otherArgs);
        };
      }
      module.exports = overRest;
    }
  });

  // node_modules/lodash/constant.js
  var require_constant = __commonJS({
    "node_modules/lodash/constant.js"(exports, module) {
      "use strict";
      function constant(value) {
        return function() {
          return value;
        };
      }
      module.exports = constant;
    }
  });

  // node_modules/lodash/_defineProperty.js
  var require_defineProperty = __commonJS({
    "node_modules/lodash/_defineProperty.js"(exports, module) {
      "use strict";
      var getNative = require_getNative();
      var defineProperty = function() {
        try {
          var func = getNative(Object, "defineProperty");
          func({}, "", {});
          return func;
        } catch (e) {
        }
      }();
      module.exports = defineProperty;
    }
  });

  // node_modules/lodash/_baseSetToString.js
  var require_baseSetToString = __commonJS({
    "node_modules/lodash/_baseSetToString.js"(exports, module) {
      "use strict";
      var constant = require_constant();
      var defineProperty = require_defineProperty();
      var identity2 = require_identity();
      var baseSetToString = !defineProperty ? identity2 : function(func, string) {
        return defineProperty(func, "toString", {
          "configurable": true,
          "enumerable": false,
          "value": constant(string),
          "writable": true
        });
      };
      module.exports = baseSetToString;
    }
  });

  // node_modules/lodash/_shortOut.js
  var require_shortOut = __commonJS({
    "node_modules/lodash/_shortOut.js"(exports, module) {
      "use strict";
      var HOT_COUNT = 800;
      var HOT_SPAN = 16;
      var nativeNow = Date.now;
      function shortOut(func) {
        var count = 0, lastCalled = 0;
        return function() {
          var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
          lastCalled = stamp;
          if (remaining > 0) {
            if (++count >= HOT_COUNT) {
              return arguments[0];
            }
          } else {
            count = 0;
          }
          return func.apply(void 0, arguments);
        };
      }
      module.exports = shortOut;
    }
  });

  // node_modules/lodash/_setToString.js
  var require_setToString = __commonJS({
    "node_modules/lodash/_setToString.js"(exports, module) {
      "use strict";
      var baseSetToString = require_baseSetToString();
      var shortOut = require_shortOut();
      var setToString = shortOut(baseSetToString);
      module.exports = setToString;
    }
  });

  // node_modules/lodash/_baseRest.js
  var require_baseRest = __commonJS({
    "node_modules/lodash/_baseRest.js"(exports, module) {
      "use strict";
      var identity2 = require_identity();
      var overRest = require_overRest();
      var setToString = require_setToString();
      function baseRest(func, start) {
        return setToString(overRest(func, start, identity2), func + "");
      }
      module.exports = baseRest;
    }
  });

  // node_modules/lodash/_isIterateeCall.js
  var require_isIterateeCall = __commonJS({
    "node_modules/lodash/_isIterateeCall.js"(exports, module) {
      "use strict";
      var eq = require_eq();
      var isArrayLike = require_isArrayLike();
      var isIndex = require_isIndex();
      var isObject = require_isObject();
      function isIterateeCall(value, index2, object) {
        if (!isObject(object)) {
          return false;
        }
        var type = typeof index2;
        if (type == "number" ? isArrayLike(object) && isIndex(index2, object.length) : type == "string" && index2 in object) {
          return eq(object[index2], value);
        }
        return false;
      }
      module.exports = isIterateeCall;
    }
  });

  // node_modules/lodash/sortBy.js
  var require_sortBy = __commonJS({
    "node_modules/lodash/sortBy.js"(exports, module) {
      "use strict";
      var baseFlatten = require_baseFlatten();
      var baseOrderBy = require_baseOrderBy();
      var baseRest = require_baseRest();
      var isIterateeCall = require_isIterateeCall();
      var sortBy4 = baseRest(function(collection, iteratees) {
        if (collection == null) {
          return [];
        }
        var length = iteratees.length;
        if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
          iteratees = [];
        } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
          iteratees = [iteratees[0]];
        }
        return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
      });
      module.exports = sortBy4;
    }
  });

  // node_modules/lodash/reverse.js
  var require_reverse = __commonJS({
    "node_modules/lodash/reverse.js"(exports, module) {
      "use strict";
      var arrayProto = Array.prototype;
      var nativeReverse = arrayProto.reverse;
      function reverse3(array) {
        return array == null ? array : nativeReverse.call(array);
      }
      module.exports = reverse3;
    }
  });

  // node_modules/lodash/_baseAssignValue.js
  var require_baseAssignValue = __commonJS({
    "node_modules/lodash/_baseAssignValue.js"(exports, module) {
      "use strict";
      var defineProperty = require_defineProperty();
      function baseAssignValue(object, key, value) {
        if (key == "__proto__" && defineProperty) {
          defineProperty(object, key, {
            "configurable": true,
            "enumerable": true,
            "value": value,
            "writable": true
          });
        } else {
          object[key] = value;
        }
      }
      module.exports = baseAssignValue;
    }
  });

  // node_modules/lodash/_arrayAggregator.js
  var require_arrayAggregator = __commonJS({
    "node_modules/lodash/_arrayAggregator.js"(exports, module) {
      "use strict";
      function arrayAggregator(array, setter, iteratee, accumulator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          var value = array[index2];
          setter(accumulator, value, iteratee(value), array);
        }
        return accumulator;
      }
      module.exports = arrayAggregator;
    }
  });

  // node_modules/lodash/_baseAggregator.js
  var require_baseAggregator = __commonJS({
    "node_modules/lodash/_baseAggregator.js"(exports, module) {
      "use strict";
      var baseEach = require_baseEach();
      function baseAggregator(collection, setter, iteratee, accumulator) {
        baseEach(collection, function(value, key, collection2) {
          setter(accumulator, value, iteratee(value), collection2);
        });
        return accumulator;
      }
      module.exports = baseAggregator;
    }
  });

  // node_modules/lodash/_createAggregator.js
  var require_createAggregator = __commonJS({
    "node_modules/lodash/_createAggregator.js"(exports, module) {
      "use strict";
      var arrayAggregator = require_arrayAggregator();
      var baseAggregator = require_baseAggregator();
      var baseIteratee = require_baseIteratee();
      var isArray = require_isArray();
      function createAggregator(setter, initializer) {
        return function(collection, iteratee) {
          var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
          return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
        };
      }
      module.exports = createAggregator;
    }
  });

  // node_modules/lodash/groupBy.js
  var require_groupBy = __commonJS({
    "node_modules/lodash/groupBy.js"(exports, module) {
      "use strict";
      var baseAssignValue = require_baseAssignValue();
      var createAggregator = require_createAggregator();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      var groupBy2 = createAggregator(function(result, value, key) {
        if (hasOwnProperty.call(result, key)) {
          result[key].push(value);
        } else {
          baseAssignValue(result, key, [value]);
        }
      });
      module.exports = groupBy2;
    }
  });

  // node_modules/lodash/mapValues.js
  var require_mapValues = __commonJS({
    "node_modules/lodash/mapValues.js"(exports, module) {
      "use strict";
      var baseAssignValue = require_baseAssignValue();
      var baseForOwn = require_baseForOwn();
      var baseIteratee = require_baseIteratee();
      function mapValues2(object, iteratee) {
        var result = {};
        iteratee = baseIteratee(iteratee, 3);
        baseForOwn(object, function(value, key, object2) {
          baseAssignValue(result, key, iteratee(value, key, object2));
        });
        return result;
      }
      module.exports = mapValues2;
    }
  });

  // node_modules/lodash/head.js
  var require_head = __commonJS({
    "node_modules/lodash/head.js"(exports, module) {
      "use strict";
      function head5(array) {
        return array && array.length ? array[0] : void 0;
      }
      module.exports = head5;
    }
  });

  // node_modules/lodash/first.js
  var require_first = __commonJS({
    "node_modules/lodash/first.js"(exports, module) {
      "use strict";
      module.exports = require_head();
    }
  });

  // node_modules/lodash/flatten.js
  var require_flatten = __commonJS({
    "node_modules/lodash/flatten.js"(exports, module) {
      "use strict";
      var baseFlatten = require_baseFlatten();
      function flatten3(array) {
        var length = array == null ? 0 : array.length;
        return length ? baseFlatten(array, 1) : [];
      }
      module.exports = flatten3;
    }
  });

  // node_modules/lodash/_baseHas.js
  var require_baseHas = __commonJS({
    "node_modules/lodash/_baseHas.js"(exports, module) {
      "use strict";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function baseHas(object, key) {
        return object != null && hasOwnProperty.call(object, key);
      }
      module.exports = baseHas;
    }
  });

  // node_modules/lodash/has.js
  var require_has = __commonJS({
    "node_modules/lodash/has.js"(exports, module) {
      "use strict";
      var baseHas = require_baseHas();
      var hasPath = require_hasPath();
      function has3(object, path) {
        return object != null && hasPath(object, path, baseHas);
      }
      module.exports = has3;
    }
  });

  // node_modules/lodash/_assignValue.js
  var require_assignValue = __commonJS({
    "node_modules/lodash/_assignValue.js"(exports, module) {
      "use strict";
      var baseAssignValue = require_baseAssignValue();
      var eq = require_eq();
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
          baseAssignValue(object, key, value);
        }
      }
      module.exports = assignValue;
    }
  });

  // node_modules/lodash/_baseSet.js
  var require_baseSet = __commonJS({
    "node_modules/lodash/_baseSet.js"(exports, module) {
      "use strict";
      var assignValue = require_assignValue();
      var castPath = require_castPath();
      var isIndex = require_isIndex();
      var isObject = require_isObject();
      var toKey = require_toKey();
      function baseSet(object, path, value, customizer) {
        if (!isObject(object)) {
          return object;
        }
        path = castPath(path, object);
        var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
        while (nested != null && ++index2 < length) {
          var key = toKey(path[index2]), newValue = value;
          if (key === "__proto__" || key === "constructor" || key === "prototype") {
            return object;
          }
          if (index2 != lastIndex) {
            var objValue = nested[key];
            newValue = customizer ? customizer(objValue, key, nested) : void 0;
            if (newValue === void 0) {
              newValue = isObject(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
            }
          }
          assignValue(nested, key, newValue);
          nested = nested[key];
        }
        return object;
      }
      module.exports = baseSet;
    }
  });

  // node_modules/lodash/set.js
  var require_set = __commonJS({
    "node_modules/lodash/set.js"(exports, module) {
      "use strict";
      var baseSet = require_baseSet();
      function set2(object, path, value) {
        return object == null ? object : baseSet(object, path, value);
      }
      module.exports = set2;
    }
  });

  // node_modules/lodash/_baseFindIndex.js
  var require_baseFindIndex = __commonJS({
    "node_modules/lodash/_baseFindIndex.js"(exports, module) {
      "use strict";
      function baseFindIndex(array, predicate, fromIndex, fromRight) {
        var length = array.length, index2 = fromIndex + (fromRight ? 1 : -1);
        while (fromRight ? index2-- : ++index2 < length) {
          if (predicate(array[index2], index2, array)) {
            return index2;
          }
        }
        return -1;
      }
      module.exports = baseFindIndex;
    }
  });

  // node_modules/lodash/_baseIsNaN.js
  var require_baseIsNaN = __commonJS({
    "node_modules/lodash/_baseIsNaN.js"(exports, module) {
      "use strict";
      function baseIsNaN(value) {
        return value !== value;
      }
      module.exports = baseIsNaN;
    }
  });

  // node_modules/lodash/_strictIndexOf.js
  var require_strictIndexOf = __commonJS({
    "node_modules/lodash/_strictIndexOf.js"(exports, module) {
      "use strict";
      function strictIndexOf(array, value, fromIndex) {
        var index2 = fromIndex - 1, length = array.length;
        while (++index2 < length) {
          if (array[index2] === value) {
            return index2;
          }
        }
        return -1;
      }
      module.exports = strictIndexOf;
    }
  });

  // node_modules/lodash/_baseIndexOf.js
  var require_baseIndexOf = __commonJS({
    "node_modules/lodash/_baseIndexOf.js"(exports, module) {
      "use strict";
      var baseFindIndex = require_baseFindIndex();
      var baseIsNaN = require_baseIsNaN();
      var strictIndexOf = require_strictIndexOf();
      function baseIndexOf(array, value, fromIndex) {
        return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
      }
      module.exports = baseIndexOf;
    }
  });

  // node_modules/lodash/_arrayIncludes.js
  var require_arrayIncludes = __commonJS({
    "node_modules/lodash/_arrayIncludes.js"(exports, module) {
      "use strict";
      var baseIndexOf = require_baseIndexOf();
      function arrayIncludes(array, value) {
        var length = array == null ? 0 : array.length;
        return !!length && baseIndexOf(array, value, 0) > -1;
      }
      module.exports = arrayIncludes;
    }
  });

  // node_modules/lodash/_arrayIncludesWith.js
  var require_arrayIncludesWith = __commonJS({
    "node_modules/lodash/_arrayIncludesWith.js"(exports, module) {
      "use strict";
      function arrayIncludesWith(array, value, comparator) {
        var index2 = -1, length = array == null ? 0 : array.length;
        while (++index2 < length) {
          if (comparator(value, array[index2])) {
            return true;
          }
        }
        return false;
      }
      module.exports = arrayIncludesWith;
    }
  });

  // node_modules/lodash/noop.js
  var require_noop = __commonJS({
    "node_modules/lodash/noop.js"(exports, module) {
      "use strict";
      function noop() {
      }
      module.exports = noop;
    }
  });

  // node_modules/lodash/_createSet.js
  var require_createSet = __commonJS({
    "node_modules/lodash/_createSet.js"(exports, module) {
      "use strict";
      var Set2 = require_Set();
      var noop = require_noop();
      var setToArray = require_setToArray();
      var INFINITY = 1 / 0;
      var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
        return new Set2(values2);
      };
      module.exports = createSet;
    }
  });

  // node_modules/lodash/_baseUniq.js
  var require_baseUniq = __commonJS({
    "node_modules/lodash/_baseUniq.js"(exports, module) {
      "use strict";
      var SetCache = require_SetCache();
      var arrayIncludes = require_arrayIncludes();
      var arrayIncludesWith = require_arrayIncludesWith();
      var cacheHas = require_cacheHas();
      var createSet = require_createSet();
      var setToArray = require_setToArray();
      var LARGE_ARRAY_SIZE = 200;
      function baseUniq(array, iteratee, comparator) {
        var index2 = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
        if (comparator) {
          isCommon = false;
          includes2 = arrayIncludesWith;
        } else if (length >= LARGE_ARRAY_SIZE) {
          var set2 = iteratee ? null : createSet(array);
          if (set2) {
            return setToArray(set2);
          }
          isCommon = false;
          includes2 = cacheHas;
          seen = new SetCache();
        } else {
          seen = iteratee ? [] : result;
        }
        outer:
          while (++index2 < length) {
            var value = array[index2], computed = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (isCommon && computed === computed) {
              var seenIndex = seen.length;
              while (seenIndex--) {
                if (seen[seenIndex] === computed) {
                  continue outer;
                }
              }
              if (iteratee) {
                seen.push(computed);
              }
              result.push(value);
            } else if (!includes2(seen, computed, comparator)) {
              if (seen !== result) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
        return result;
      }
      module.exports = baseUniq;
    }
  });

  // node_modules/lodash/uniq.js
  var require_uniq = __commonJS({
    "node_modules/lodash/uniq.js"(exports, module) {
      "use strict";
      var baseUniq = require_baseUniq();
      function uniq4(array) {
        return array && array.length ? baseUniq(array) : [];
      }
      module.exports = uniq4;
    }
  });

  // node_modules/lodash/_baseIntersection.js
  var require_baseIntersection = __commonJS({
    "node_modules/lodash/_baseIntersection.js"(exports, module) {
      "use strict";
      var SetCache = require_SetCache();
      var arrayIncludes = require_arrayIncludes();
      var arrayIncludesWith = require_arrayIncludesWith();
      var arrayMap = require_arrayMap();
      var baseUnary = require_baseUnary();
      var cacheHas = require_cacheHas();
      var nativeMin = Math.min;
      function baseIntersection(arrays, iteratee, comparator) {
        var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array(othLength), maxLength = Infinity, result = [];
        while (othIndex--) {
          var array = arrays[othIndex];
          if (othIndex && iteratee) {
            array = arrayMap(array, baseUnary(iteratee));
          }
          maxLength = nativeMin(array.length, maxLength);
          caches[othIndex] = !comparator && (iteratee || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : void 0;
        }
        array = arrays[0];
        var index2 = -1, seen = caches[0];
        outer:
          while (++index2 < length && result.length < maxLength) {
            var value = array[index2], computed = iteratee ? iteratee(value) : value;
            value = comparator || value !== 0 ? value : 0;
            if (!(seen ? cacheHas(seen, computed) : includes2(result, computed, comparator))) {
              othIndex = othLength;
              while (--othIndex) {
                var cache2 = caches[othIndex];
                if (!(cache2 ? cacheHas(cache2, computed) : includes2(arrays[othIndex], computed, comparator))) {
                  continue outer;
                }
              }
              if (seen) {
                seen.push(computed);
              }
              result.push(value);
            }
          }
        return result;
      }
      module.exports = baseIntersection;
    }
  });

  // node_modules/lodash/isArrayLikeObject.js
  var require_isArrayLikeObject = __commonJS({
    "node_modules/lodash/isArrayLikeObject.js"(exports, module) {
      "use strict";
      var isArrayLike = require_isArrayLike();
      var isObjectLike = require_isObjectLike();
      function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
      }
      module.exports = isArrayLikeObject;
    }
  });

  // node_modules/lodash/_castArrayLikeObject.js
  var require_castArrayLikeObject = __commonJS({
    "node_modules/lodash/_castArrayLikeObject.js"(exports, module) {
      "use strict";
      var isArrayLikeObject = require_isArrayLikeObject();
      function castArrayLikeObject(value) {
        return isArrayLikeObject(value) ? value : [];
      }
      module.exports = castArrayLikeObject;
    }
  });

  // node_modules/lodash/intersection.js
  var require_intersection = __commonJS({
    "node_modules/lodash/intersection.js"(exports, module) {
      "use strict";
      var arrayMap = require_arrayMap();
      var baseIntersection = require_baseIntersection();
      var baseRest = require_baseRest();
      var castArrayLikeObject = require_castArrayLikeObject();
      var intersection2 = baseRest(function(arrays) {
        var mapped = arrayMap(arrays, castArrayLikeObject);
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
      });
      module.exports = intersection2;
    }
  });

  // node_modules/lodash/last.js
  var require_last = __commonJS({
    "node_modules/lodash/last.js"(exports, module) {
      "use strict";
      function last4(array) {
        var length = array == null ? 0 : array.length;
        return length ? array[length - 1] : void 0;
      }
      module.exports = last4;
    }
  });

  // node_modules/lodash/intersectionBy.js
  var require_intersectionBy = __commonJS({
    "node_modules/lodash/intersectionBy.js"(exports, module) {
      "use strict";
      var arrayMap = require_arrayMap();
      var baseIntersection = require_baseIntersection();
      var baseIteratee = require_baseIteratee();
      var baseRest = require_baseRest();
      var castArrayLikeObject = require_castArrayLikeObject();
      var last4 = require_last();
      var intersectionBy2 = baseRest(function(arrays) {
        var iteratee = last4(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
        if (iteratee === last4(mapped)) {
          iteratee = void 0;
        } else {
          mapped.pop();
        }
        return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, baseIteratee(iteratee, 2)) : [];
      });
      module.exports = intersectionBy2;
    }
  });

  // node_modules/lodash/isEmpty.js
  var require_isEmpty = __commonJS({
    "node_modules/lodash/isEmpty.js"(exports, module) {
      "use strict";
      var baseKeys = require_baseKeys();
      var getTag = require_getTag();
      var isArguments = require_isArguments();
      var isArray = require_isArray();
      var isArrayLike = require_isArrayLike();
      var isBuffer = require_isBuffer();
      var isPrototype = require_isPrototype();
      var isTypedArray = require_isTypedArray();
      var mapTag = "[object Map]";
      var setTag = "[object Set]";
      var objectProto = Object.prototype;
      var hasOwnProperty = objectProto.hasOwnProperty;
      function isEmpty2(value) {
        if (value == null) {
          return true;
        }
        if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
          return !value.length;
        }
        var tag = getTag(value);
        if (tag == mapTag || tag == setTag) {
          return !value.size;
        }
        if (isPrototype(value)) {
          return !baseKeys(value).length;
        }
        for (var key in value) {
          if (hasOwnProperty.call(value, key)) {
            return false;
          }
        }
        return true;
      }
      module.exports = isEmpty2;
    }
  });

  // node_modules/lodash/isString.js
  var require_isString = __commonJS({
    "node_modules/lodash/isString.js"(exports, module) {
      "use strict";
      var baseGetTag = require_baseGetTag();
      var isArray = require_isArray();
      var isObjectLike = require_isObjectLike();
      var stringTag = "[object String]";
      function isString(value) {
        return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
      }
      module.exports = isString;
    }
  });

  // node_modules/lodash/includes.js
  var require_includes = __commonJS({
    "node_modules/lodash/includes.js"(exports, module) {
      "use strict";
      var baseIndexOf = require_baseIndexOf();
      var isArrayLike = require_isArrayLike();
      var isString = require_isString();
      var toInteger = require_toInteger();
      var values2 = require_values();
      var nativeMax = Math.max;
      function includes2(collection, value, fromIndex, guard) {
        collection = isArrayLike(collection) ? collection : values2(collection);
        fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
        var length = collection.length;
        if (fromIndex < 0) {
          fromIndex = nativeMax(length + fromIndex, 0);
        }
        return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
      }
      module.exports = includes2;
    }
  });

  // node_modules/fp-ts/es6/function.js
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
      case 1:
        return ab;
      case 2:
        return function() {
          return bc(ab.apply(this, arguments));
        };
      case 3:
        return function() {
          return cd(bc(ab.apply(this, arguments)));
        };
      case 4:
        return function() {
          return de(cd(bc(ab.apply(this, arguments))));
        };
      case 5:
        return function() {
          return ef(de(cd(bc(ab.apply(this, arguments)))));
        };
      case 6:
        return function() {
          return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
        };
      case 7:
        return function() {
          return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
        };
      case 8:
        return function() {
          return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
        };
      case 9:
        return function() {
          return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
        };
    }
    return;
  }
  function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
      case 1:
        return a;
      case 2:
        return ab(a);
      case 3:
        return bc(ab(a));
      case 4:
        return cd(bc(ab(a)));
      case 5:
        return de(cd(bc(ab(a))));
      case 6:
        return ef(de(cd(bc(ab(a)))));
      case 7:
        return fg(ef(de(cd(bc(ab(a))))));
      case 8:
        return gh(fg(ef(de(cd(bc(ab(a)))))));
      case 9:
        return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
      default: {
        var ret = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
          ret = arguments[i](ret);
        }
        return ret;
      }
    }
  }
  var dual = function(arity, body) {
    var isDataFirst = typeof arity === "number" ? function(args) {
      return args.length >= arity;
    } : arity;
    return function() {
      var args = Array.from(arguments);
      if (isDataFirst(arguments)) {
        return body.apply(this, args);
      }
      return function(self2) {
        return body.apply(void 0, __spreadArray([self2], args, false));
      };
    };
  };

  // node_modules/fp-ts/es6/internal.js
  var isSome = function(fa) {
    return fa._tag === "Some";
  };
  var none = { _tag: "None" };
  var some = function(a) {
    return { _tag: "Some", value: a };
  };
  var isNonEmpty = function(as3) {
    return as3.length > 0;
  };
  var head = function(as3) {
    return as3[0];
  };

  // node_modules/fp-ts/es6/Functor.js
  function as(F) {
    return function(self2, b) {
      return F.map(self2, function() {
        return b;
      });
    };
  }
  function asUnit(F) {
    var asM = as(F);
    return function(self2) {
      return asM(self2, void 0);
    };
  }

  // node_modules/fp-ts/es6/Chain.js
  function tap(M) {
    return function(first2, f) {
      return M.chain(first2, function(a) {
        return M.map(f(a), function() {
          return a;
        });
      });
    };
  }

  // node_modules/fp-ts/es6/FromEither.js
  function fromEitherK(F) {
    return function(f) {
      return flow(f, F.fromEither);
    };
  }
  function tapEither(F, M) {
    var fromEither2 = fromEitherK(F);
    var tapM = tap(M);
    return function(self2, f) {
      return tapM(self2, fromEither2(f));
    };
  }

  // node_modules/fp-ts/es6/Option.js
  var none2 = none;
  var some2 = some;
  var getRight = function(ma) {
    return ma._tag === "Left" ? none2 : some2(ma.right);
  };
  var _map = function(fa, f) {
    return pipe(fa, map(f));
  };
  var _ap = function(fab, fa) {
    return pipe(fab, ap(fa));
  };
  var URI = "Option";
  var map = function(f) {
    return function(fa) {
      return isNone(fa) ? none2 : some2(f(fa.value));
    };
  };
  var Functor = {
    URI,
    map: _map
  };
  var as2 = dual(2, as(Functor));
  var asUnit2 = asUnit(Functor);
  var ap = function(fa) {
    return function(fab) {
      return isNone(fab) ? none2 : isNone(fa) ? none2 : some2(fab.value(fa.value));
    };
  };
  var flatMap = /* @__PURE__ */ dual(2, function(ma, f) {
    return isNone(ma) ? none2 : f(ma.value);
  });
  var Chain = {
    URI,
    map: _map,
    ap: _ap,
    chain: flatMap
  };
  var orElse = dual(2, function(self2, that) {
    return isNone(self2) ? that() : self2;
  });
  var fromEither = getRight;
  var FromEither = {
    URI,
    fromEither
  };
  var isSome2 = isSome;
  var isNone = function(fa) {
    return fa._tag === "None";
  };
  var tap2 = /* @__PURE__ */ dual(2, tap(Chain));
  var tapEither2 = /* @__PURE__ */ dual(2, tapEither(FromEither, Chain));
  var fromNullable = function(a) {
    return a == null ? none2 : some2(a);
  };

  // node_modules/minisearch/dist/es/index.js
  var __assign = function() {
    __assign = Object.assign || function __assign2(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  var ENTRIES = "ENTRIES";
  var KEYS = "KEYS";
  var VALUES = "VALUES";
  var LEAF = "";
  var TreeIterator = (
    /** @class */
    function() {
      function TreeIterator2(set2, type) {
        var node = set2._tree;
        var keys2 = Array.from(node.keys());
        this.set = set2;
        this._type = type;
        this._path = keys2.length > 0 ? [{ node, keys: keys2 }] : [];
      }
      TreeIterator2.prototype.next = function() {
        var value = this.dive();
        this.backtrack();
        return value;
      };
      TreeIterator2.prototype.dive = function() {
        if (this._path.length === 0) {
          return { done: true, value: void 0 };
        }
        var _a2 = last$1(this._path), node = _a2.node, keys2 = _a2.keys;
        if (last$1(keys2) === LEAF) {
          return { done: false, value: this.result() };
        }
        var child = node.get(last$1(keys2));
        this._path.push({ node: child, keys: Array.from(child.keys()) });
        return this.dive();
      };
      TreeIterator2.prototype.backtrack = function() {
        if (this._path.length === 0) {
          return;
        }
        var keys2 = last$1(this._path).keys;
        keys2.pop();
        if (keys2.length > 0) {
          return;
        }
        this._path.pop();
        this.backtrack();
      };
      TreeIterator2.prototype.key = function() {
        return this.set._prefix + this._path.map(function(_a2) {
          var keys2 = _a2.keys;
          return last$1(keys2);
        }).filter(function(key) {
          return key !== LEAF;
        }).join("");
      };
      TreeIterator2.prototype.value = function() {
        return last$1(this._path).node.get(LEAF);
      };
      TreeIterator2.prototype.result = function() {
        switch (this._type) {
          case VALUES:
            return this.value();
          case KEYS:
            return this.key();
          default:
            return [this.key(), this.value()];
        }
      };
      TreeIterator2.prototype[Symbol.iterator] = function() {
        return this;
      };
      return TreeIterator2;
    }()
  );
  var last$1 = function(array) {
    return array[array.length - 1];
  };
  var fuzzySearch = function(node, query, maxDistance) {
    var results = /* @__PURE__ */ new Map();
    if (query === void 0)
      return results;
    var n = query.length + 1;
    var m = n + maxDistance;
    var matrix = new Uint8Array(m * n).fill(maxDistance + 1);
    for (var j = 0; j < n; ++j)
      matrix[j] = j;
    for (var i = 1; i < m; ++i)
      matrix[i * n] = i;
    recurse(node, query, maxDistance, results, matrix, 1, n, "");
    return results;
  };
  var recurse = function(node, query, maxDistance, results, matrix, m, n, prefix) {
    var e_1, _a2;
    var offset = m * n;
    try {
      key:
        for (var _b = __values(node.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var key = _c.value;
          if (key === LEAF) {
            var distance = matrix[offset - 1];
            if (distance <= maxDistance) {
              results.set(prefix, [node.get(key), distance]);
            }
          } else {
            var i = m;
            for (var pos = 0; pos < key.length; ++pos, ++i) {
              var char = key[pos];
              var thisRowOffset = n * i;
              var prevRowOffset = thisRowOffset - n;
              var minDistance = matrix[thisRowOffset];
              var jmin = Math.max(0, i - maxDistance - 1);
              var jmax = Math.min(n - 1, i + maxDistance);
              for (var j = jmin; j < jmax; ++j) {
                var different = char !== query[j];
                var rpl = matrix[prevRowOffset + j] + +different;
                var del = matrix[prevRowOffset + j + 1] + 1;
                var ins = matrix[thisRowOffset + j] + 1;
                var dist = matrix[thisRowOffset + j + 1] = Math.min(rpl, del, ins);
                if (dist < minDistance)
                  minDistance = dist;
              }
              if (minDistance > maxDistance) {
                continue key;
              }
            }
            recurse(node.get(key), query, maxDistance, results, matrix, i, n, prefix + key);
          }
        }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  };
  var SearchableMap = (
    /** @class */
    function() {
      function SearchableMap2(tree, prefix) {
        if (tree === void 0) {
          tree = /* @__PURE__ */ new Map();
        }
        if (prefix === void 0) {
          prefix = "";
        }
        this._size = void 0;
        this._tree = tree;
        this._prefix = prefix;
      }
      SearchableMap2.prototype.atPrefix = function(prefix) {
        var e_1, _a2;
        if (!prefix.startsWith(this._prefix)) {
          throw new Error("Mismatched prefix");
        }
        var _b = __read(trackDown(this._tree, prefix.slice(this._prefix.length)), 2), node = _b[0], path = _b[1];
        if (node === void 0) {
          var _c = __read(last(path), 2), parentNode = _c[0], key = _c[1];
          try {
            for (var _d = __values(parentNode.keys()), _e = _d.next(); !_e.done; _e = _d.next()) {
              var k = _e.value;
              if (k !== LEAF && k.startsWith(key)) {
                var node_1 = /* @__PURE__ */ new Map();
                node_1.set(k.slice(key.length), parentNode.get(k));
                return new SearchableMap2(node_1, prefix);
              }
            }
          } catch (e_1_1) {
            e_1 = { error: e_1_1 };
          } finally {
            try {
              if (_e && !_e.done && (_a2 = _d.return))
                _a2.call(_d);
            } finally {
              if (e_1)
                throw e_1.error;
            }
          }
        }
        return new SearchableMap2(node, prefix);
      };
      SearchableMap2.prototype.clear = function() {
        this._size = void 0;
        this._tree.clear();
      };
      SearchableMap2.prototype.delete = function(key) {
        this._size = void 0;
        return remove(this._tree, key);
      };
      SearchableMap2.prototype.entries = function() {
        return new TreeIterator(this, ENTRIES);
      };
      SearchableMap2.prototype.forEach = function(fn) {
        var e_2, _a2;
        try {
          for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
            fn(key, value, this);
          }
        } catch (e_2_1) {
          e_2 = { error: e_2_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_2)
              throw e_2.error;
          }
        }
      };
      SearchableMap2.prototype.fuzzyGet = function(key, maxEditDistance) {
        return fuzzySearch(this._tree, key, maxEditDistance);
      };
      SearchableMap2.prototype.get = function(key) {
        var node = lookup(this._tree, key);
        return node !== void 0 ? node.get(LEAF) : void 0;
      };
      SearchableMap2.prototype.has = function(key) {
        var node = lookup(this._tree, key);
        return node !== void 0 && node.has(LEAF);
      };
      SearchableMap2.prototype.keys = function() {
        return new TreeIterator(this, KEYS);
      };
      SearchableMap2.prototype.set = function(key, value) {
        if (typeof key !== "string") {
          throw new Error("key must be a string");
        }
        this._size = void 0;
        var node = createPath(this._tree, key);
        node.set(LEAF, value);
        return this;
      };
      Object.defineProperty(SearchableMap2.prototype, "size", {
        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size
         */
        get: function() {
          if (this._size) {
            return this._size;
          }
          this._size = 0;
          var iter = this.entries();
          while (!iter.next().done)
            this._size += 1;
          return this._size;
        },
        enumerable: false,
        configurable: true
      });
      SearchableMap2.prototype.update = function(key, fn) {
        if (typeof key !== "string") {
          throw new Error("key must be a string");
        }
        this._size = void 0;
        var node = createPath(this._tree, key);
        node.set(LEAF, fn(node.get(LEAF)));
        return this;
      };
      SearchableMap2.prototype.fetch = function(key, initial) {
        if (typeof key !== "string") {
          throw new Error("key must be a string");
        }
        this._size = void 0;
        var node = createPath(this._tree, key);
        var value = node.get(LEAF);
        if (value === void 0) {
          node.set(LEAF, value = initial());
        }
        return value;
      };
      SearchableMap2.prototype.values = function() {
        return new TreeIterator(this, VALUES);
      };
      SearchableMap2.prototype[Symbol.iterator] = function() {
        return this.entries();
      };
      SearchableMap2.from = function(entries) {
        var e_3, _a2;
        var tree = new SearchableMap2();
        try {
          for (var entries_1 = __values(entries), entries_1_1 = entries_1.next(); !entries_1_1.done; entries_1_1 = entries_1.next()) {
            var _b = __read(entries_1_1.value, 2), key = _b[0], value = _b[1];
            tree.set(key, value);
          }
        } catch (e_3_1) {
          e_3 = { error: e_3_1 };
        } finally {
          try {
            if (entries_1_1 && !entries_1_1.done && (_a2 = entries_1.return))
              _a2.call(entries_1);
          } finally {
            if (e_3)
              throw e_3.error;
          }
        }
        return tree;
      };
      SearchableMap2.fromObject = function(object) {
        return SearchableMap2.from(Object.entries(object));
      };
      return SearchableMap2;
    }()
  );
  var trackDown = function(tree, key, path) {
    var e_4, _a2;
    if (path === void 0) {
      path = [];
    }
    if (key.length === 0 || tree == null) {
      return [tree, path];
    }
    try {
      for (var _b = __values(tree.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var k = _c.value;
        if (k !== LEAF && key.startsWith(k)) {
          path.push([tree, k]);
          return trackDown(tree.get(k), key.slice(k.length), path);
        }
      }
    } catch (e_4_1) {
      e_4 = { error: e_4_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_4)
          throw e_4.error;
      }
    }
    path.push([tree, key]);
    return trackDown(void 0, "", path);
  };
  var lookup = function(tree, key) {
    var e_5, _a2;
    if (key.length === 0 || tree == null) {
      return tree;
    }
    try {
      for (var _b = __values(tree.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var k = _c.value;
        if (k !== LEAF && key.startsWith(k)) {
          return lookup(tree.get(k), key.slice(k.length));
        }
      }
    } catch (e_5_1) {
      e_5 = { error: e_5_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_5)
          throw e_5.error;
      }
    }
  };
  var createPath = function(node, key) {
    var e_6, _a2;
    var keyLength = key.length;
    outer:
      for (var pos = 0; node && pos < keyLength; ) {
        try {
          for (var _b = (e_6 = void 0, __values(node.keys())), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            if (k !== LEAF && key[pos] === k[0]) {
              var len = Math.min(keyLength - pos, k.length);
              var offset = 1;
              while (offset < len && key[pos + offset] === k[offset])
                ++offset;
              var child_1 = node.get(k);
              if (offset === k.length) {
                node = child_1;
              } else {
                var intermediate = /* @__PURE__ */ new Map();
                intermediate.set(k.slice(offset), child_1);
                node.set(key.slice(pos, pos + offset), intermediate);
                node.delete(k);
                node = intermediate;
              }
              pos += offset;
              continue outer;
            }
          }
        } catch (e_6_1) {
          e_6 = { error: e_6_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_6)
              throw e_6.error;
          }
        }
        var child = /* @__PURE__ */ new Map();
        node.set(key.slice(pos), child);
        return child;
      }
    return node;
  };
  var remove = function(tree, key) {
    var _a2 = __read(trackDown(tree, key), 2), node = _a2[0], path = _a2[1];
    if (node === void 0) {
      return;
    }
    node.delete(LEAF);
    if (node.size === 0) {
      cleanup(path);
    } else if (node.size === 1) {
      var _b = __read(node.entries().next().value, 2), key_1 = _b[0], value = _b[1];
      merge(path, key_1, value);
    }
  };
  var cleanup = function(path) {
    if (path.length === 0) {
      return;
    }
    var _a2 = __read(last(path), 2), node = _a2[0], key = _a2[1];
    node.delete(key);
    if (node.size === 0) {
      cleanup(path.slice(0, -1));
    } else if (node.size === 1) {
      var _b = __read(node.entries().next().value, 2), key_2 = _b[0], value = _b[1];
      if (key_2 !== LEAF) {
        merge(path.slice(0, -1), key_2, value);
      }
    }
  };
  var merge = function(path, key, value) {
    if (path.length === 0) {
      return;
    }
    var _a2 = __read(last(path), 2), node = _a2[0], nodeKey = _a2[1];
    node.set(nodeKey + key, value);
    node.delete(nodeKey);
  };
  var last = function(array) {
    return array[array.length - 1];
  };
  var _a;
  var OR = "or";
  var AND = "and";
  var AND_NOT = "and_not";
  var MiniSearch = (
    /** @class */
    function() {
      function MiniSearch2(options) {
        if ((options === null || options === void 0 ? void 0 : options.fields) == null) {
          throw new Error('MiniSearch: option "fields" must be provided');
        }
        var autoVacuum = options.autoVacuum == null || options.autoVacuum === true ? defaultAutoVacuumOptions : options.autoVacuum;
        this._options = __assign(__assign(__assign({}, defaultOptions), options), { autoVacuum, searchOptions: __assign(__assign({}, defaultSearchOptions), options.searchOptions || {}), autoSuggestOptions: __assign(__assign({}, defaultAutoSuggestOptions), options.autoSuggestOptions || {}) });
        this._index = new SearchableMap();
        this._documentCount = 0;
        this._documentIds = /* @__PURE__ */ new Map();
        this._idToShortId = /* @__PURE__ */ new Map();
        this._fieldIds = {};
        this._fieldLength = /* @__PURE__ */ new Map();
        this._avgFieldLength = [];
        this._nextId = 0;
        this._storedFields = /* @__PURE__ */ new Map();
        this._dirtCount = 0;
        this._currentVacuum = null;
        this._enqueuedVacuum = null;
        this._enqueuedVacuumConditions = defaultVacuumConditions;
        this.addFields(this._options.fields);
      }
      MiniSearch2.prototype.add = function(document2) {
        var e_1, _a2, e_2, _b, e_3, _c;
        var _d = this._options, extractField = _d.extractField, tokenize = _d.tokenize, processTerm = _d.processTerm, fields = _d.fields, idField = _d.idField;
        var id = extractField(document2, idField);
        if (id == null) {
          throw new Error('MiniSearch: document does not have ID field "'.concat(idField, '"'));
        }
        if (this._idToShortId.has(id)) {
          throw new Error("MiniSearch: duplicate ID ".concat(id));
        }
        var shortDocumentId = this.addDocumentId(id);
        this.saveStoredFields(shortDocumentId, document2);
        try {
          for (var fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
            var field = fields_1_1.value;
            var fieldValue = extractField(document2, field);
            if (fieldValue == null)
              continue;
            var tokens = tokenize(fieldValue.toString(), field);
            var fieldId = this._fieldIds[field];
            var uniqueTerms = new Set(tokens).size;
            this.addFieldLength(shortDocumentId, fieldId, this._documentCount - 1, uniqueTerms);
            try {
              for (var tokens_1 = (e_2 = void 0, __values(tokens)), tokens_1_1 = tokens_1.next(); !tokens_1_1.done; tokens_1_1 = tokens_1.next()) {
                var term = tokens_1_1.value;
                var processedTerm = processTerm(term, field);
                if (Array.isArray(processedTerm)) {
                  try {
                    for (var processedTerm_1 = (e_3 = void 0, __values(processedTerm)), processedTerm_1_1 = processedTerm_1.next(); !processedTerm_1_1.done; processedTerm_1_1 = processedTerm_1.next()) {
                      var t = processedTerm_1_1.value;
                      this.addTerm(fieldId, shortDocumentId, t);
                    }
                  } catch (e_3_1) {
                    e_3 = { error: e_3_1 };
                  } finally {
                    try {
                      if (processedTerm_1_1 && !processedTerm_1_1.done && (_c = processedTerm_1.return))
                        _c.call(processedTerm_1);
                    } finally {
                      if (e_3)
                        throw e_3.error;
                    }
                  }
                } else if (processedTerm) {
                  this.addTerm(fieldId, shortDocumentId, processedTerm);
                }
              }
            } catch (e_2_1) {
              e_2 = { error: e_2_1 };
            } finally {
              try {
                if (tokens_1_1 && !tokens_1_1.done && (_b = tokens_1.return))
                  _b.call(tokens_1);
              } finally {
                if (e_2)
                  throw e_2.error;
              }
            }
          }
        } catch (e_1_1) {
          e_1 = { error: e_1_1 };
        } finally {
          try {
            if (fields_1_1 && !fields_1_1.done && (_a2 = fields_1.return))
              _a2.call(fields_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
      };
      MiniSearch2.prototype.addAll = function(documents) {
        var e_4, _a2;
        try {
          for (var documents_1 = __values(documents), documents_1_1 = documents_1.next(); !documents_1_1.done; documents_1_1 = documents_1.next()) {
            var document_1 = documents_1_1.value;
            this.add(document_1);
          }
        } catch (e_4_1) {
          e_4 = { error: e_4_1 };
        } finally {
          try {
            if (documents_1_1 && !documents_1_1.done && (_a2 = documents_1.return))
              _a2.call(documents_1);
          } finally {
            if (e_4)
              throw e_4.error;
          }
        }
      };
      MiniSearch2.prototype.addAllAsync = function(documents, options) {
        var _this = this;
        if (options === void 0) {
          options = {};
        }
        var _a2 = options.chunkSize, chunkSize = _a2 === void 0 ? 10 : _a2;
        var acc = { chunk: [], promise: Promise.resolve() };
        var _b = documents.reduce(function(_a3, document2, i) {
          var chunk2 = _a3.chunk, promise2 = _a3.promise;
          chunk2.push(document2);
          if ((i + 1) % chunkSize === 0) {
            return {
              chunk: [],
              promise: promise2.then(function() {
                return new Promise(function(resolve) {
                  return setTimeout(resolve, 0);
                });
              }).then(function() {
                return _this.addAll(chunk2);
              })
            };
          } else {
            return { chunk: chunk2, promise: promise2 };
          }
        }, acc), chunk = _b.chunk, promise = _b.promise;
        return promise.then(function() {
          return _this.addAll(chunk);
        });
      };
      MiniSearch2.prototype.remove = function(document2) {
        var e_5, _a2, e_6, _b, e_7, _c;
        var _d = this._options, tokenize = _d.tokenize, processTerm = _d.processTerm, extractField = _d.extractField, fields = _d.fields, idField = _d.idField;
        var id = extractField(document2, idField);
        if (id == null) {
          throw new Error('MiniSearch: document does not have ID field "'.concat(idField, '"'));
        }
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
          throw new Error("MiniSearch: cannot remove document with ID ".concat(id, ": it is not in the index"));
        }
        try {
          for (var fields_2 = __values(fields), fields_2_1 = fields_2.next(); !fields_2_1.done; fields_2_1 = fields_2.next()) {
            var field = fields_2_1.value;
            var fieldValue = extractField(document2, field);
            if (fieldValue == null)
              continue;
            var tokens = tokenize(fieldValue.toString(), field);
            var fieldId = this._fieldIds[field];
            var uniqueTerms = new Set(tokens).size;
            this.removeFieldLength(shortId, fieldId, this._documentCount, uniqueTerms);
            try {
              for (var tokens_2 = (e_6 = void 0, __values(tokens)), tokens_2_1 = tokens_2.next(); !tokens_2_1.done; tokens_2_1 = tokens_2.next()) {
                var term = tokens_2_1.value;
                var processedTerm = processTerm(term, field);
                if (Array.isArray(processedTerm)) {
                  try {
                    for (var processedTerm_2 = (e_7 = void 0, __values(processedTerm)), processedTerm_2_1 = processedTerm_2.next(); !processedTerm_2_1.done; processedTerm_2_1 = processedTerm_2.next()) {
                      var t = processedTerm_2_1.value;
                      this.removeTerm(fieldId, shortId, t);
                    }
                  } catch (e_7_1) {
                    e_7 = { error: e_7_1 };
                  } finally {
                    try {
                      if (processedTerm_2_1 && !processedTerm_2_1.done && (_c = processedTerm_2.return))
                        _c.call(processedTerm_2);
                    } finally {
                      if (e_7)
                        throw e_7.error;
                    }
                  }
                } else if (processedTerm) {
                  this.removeTerm(fieldId, shortId, processedTerm);
                }
              }
            } catch (e_6_1) {
              e_6 = { error: e_6_1 };
            } finally {
              try {
                if (tokens_2_1 && !tokens_2_1.done && (_b = tokens_2.return))
                  _b.call(tokens_2);
              } finally {
                if (e_6)
                  throw e_6.error;
              }
            }
          }
        } catch (e_5_1) {
          e_5 = { error: e_5_1 };
        } finally {
          try {
            if (fields_2_1 && !fields_2_1.done && (_a2 = fields_2.return))
              _a2.call(fields_2);
          } finally {
            if (e_5)
              throw e_5.error;
          }
        }
        this._storedFields.delete(shortId);
        this._documentIds.delete(shortId);
        this._idToShortId.delete(id);
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
      };
      MiniSearch2.prototype.removeAll = function(documents) {
        var e_8, _a2;
        if (documents) {
          try {
            for (var documents_2 = __values(documents), documents_2_1 = documents_2.next(); !documents_2_1.done; documents_2_1 = documents_2.next()) {
              var document_2 = documents_2_1.value;
              this.remove(document_2);
            }
          } catch (e_8_1) {
            e_8 = { error: e_8_1 };
          } finally {
            try {
              if (documents_2_1 && !documents_2_1.done && (_a2 = documents_2.return))
                _a2.call(documents_2);
            } finally {
              if (e_8)
                throw e_8.error;
            }
          }
        } else if (arguments.length > 0) {
          throw new Error("Expected documents to be present. Omit the argument to remove all documents.");
        } else {
          this._index = new SearchableMap();
          this._documentCount = 0;
          this._documentIds = /* @__PURE__ */ new Map();
          this._idToShortId = /* @__PURE__ */ new Map();
          this._fieldLength = /* @__PURE__ */ new Map();
          this._avgFieldLength = [];
          this._storedFields = /* @__PURE__ */ new Map();
          this._nextId = 0;
        }
      };
      MiniSearch2.prototype.discard = function(id) {
        var _this = this;
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
          throw new Error("MiniSearch: cannot discard document with ID ".concat(id, ": it is not in the index"));
        }
        this._idToShortId.delete(id);
        this._documentIds.delete(shortId);
        this._storedFields.delete(shortId);
        (this._fieldLength.get(shortId) || []).forEach(function(fieldLength, fieldId) {
          _this.removeFieldLength(shortId, fieldId, _this._documentCount, fieldLength);
        });
        this._fieldLength.delete(shortId);
        this._documentCount -= 1;
        this._dirtCount += 1;
        this.maybeAutoVacuum();
      };
      MiniSearch2.prototype.maybeAutoVacuum = function() {
        if (this._options.autoVacuum === false) {
          return;
        }
        var _a2 = this._options.autoVacuum, minDirtFactor = _a2.minDirtFactor, minDirtCount = _a2.minDirtCount, batchSize = _a2.batchSize, batchWait = _a2.batchWait;
        this.conditionalVacuum({ batchSize, batchWait }, { minDirtCount, minDirtFactor });
      };
      MiniSearch2.prototype.discardAll = function(ids) {
        var e_9, _a2;
        var autoVacuum = this._options.autoVacuum;
        try {
          this._options.autoVacuum = false;
          try {
            for (var ids_1 = __values(ids), ids_1_1 = ids_1.next(); !ids_1_1.done; ids_1_1 = ids_1.next()) {
              var id = ids_1_1.value;
              this.discard(id);
            }
          } catch (e_9_1) {
            e_9 = { error: e_9_1 };
          } finally {
            try {
              if (ids_1_1 && !ids_1_1.done && (_a2 = ids_1.return))
                _a2.call(ids_1);
            } finally {
              if (e_9)
                throw e_9.error;
            }
          }
        } finally {
          this._options.autoVacuum = autoVacuum;
        }
        this.maybeAutoVacuum();
      };
      MiniSearch2.prototype.replace = function(updatedDocument) {
        var _a2 = this._options, idField = _a2.idField, extractField = _a2.extractField;
        var id = extractField(updatedDocument, idField);
        this.discard(id);
        this.add(updatedDocument);
      };
      MiniSearch2.prototype.vacuum = function(options) {
        if (options === void 0) {
          options = {};
        }
        return this.conditionalVacuum(options);
      };
      MiniSearch2.prototype.conditionalVacuum = function(options, conditions) {
        var _this = this;
        if (this._currentVacuum) {
          this._enqueuedVacuumConditions = this._enqueuedVacuumConditions && conditions;
          if (this._enqueuedVacuum != null) {
            return this._enqueuedVacuum;
          }
          this._enqueuedVacuum = this._currentVacuum.then(function() {
            var conditions2 = _this._enqueuedVacuumConditions;
            _this._enqueuedVacuumConditions = defaultVacuumConditions;
            return _this.performVacuuming(options, conditions2);
          });
          return this._enqueuedVacuum;
        }
        if (this.vacuumConditionsMet(conditions) === false) {
          return Promise.resolve();
        }
        this._currentVacuum = this.performVacuuming(options);
        return this._currentVacuum;
      };
      MiniSearch2.prototype.performVacuuming = function(options, conditions) {
        return __awaiter(this, void 0, void 0, function() {
          var initialDirtCount, batchSize, batchWait_1, i, _a2, _b, _c, term, fieldsData, fieldsData_1, fieldsData_1_1, _d, fieldId, fieldIndex, fieldIndex_1, fieldIndex_1_1, _e, shortId, e_10_1;
          var e_10, _f, e_11, _g, e_12, _h;
          return __generator(this, function(_j) {
            switch (_j.label) {
              case 0:
                initialDirtCount = this._dirtCount;
                if (!this.vacuumConditionsMet(conditions))
                  return [3, 10];
                batchSize = options.batchSize || defaultVacuumOptions.batchSize;
                batchWait_1 = options.batchWait || defaultVacuumOptions.batchWait;
                i = 1;
                _j.label = 1;
              case 1:
                _j.trys.push([1, 7, 8, 9]);
                _a2 = __values(this._index), _b = _a2.next();
                _j.label = 2;
              case 2:
                if (!!_b.done)
                  return [3, 6];
                _c = __read(_b.value, 2), term = _c[0], fieldsData = _c[1];
                try {
                  for (fieldsData_1 = (e_11 = void 0, __values(fieldsData)), fieldsData_1_1 = fieldsData_1.next(); !fieldsData_1_1.done; fieldsData_1_1 = fieldsData_1.next()) {
                    _d = __read(fieldsData_1_1.value, 2), fieldId = _d[0], fieldIndex = _d[1];
                    try {
                      for (fieldIndex_1 = (e_12 = void 0, __values(fieldIndex)), fieldIndex_1_1 = fieldIndex_1.next(); !fieldIndex_1_1.done; fieldIndex_1_1 = fieldIndex_1.next()) {
                        _e = __read(fieldIndex_1_1.value, 1), shortId = _e[0];
                        if (this._documentIds.has(shortId)) {
                          continue;
                        }
                        if (fieldIndex.size <= 1) {
                          fieldsData.delete(fieldId);
                        } else {
                          fieldIndex.delete(shortId);
                        }
                      }
                    } catch (e_12_1) {
                      e_12 = { error: e_12_1 };
                    } finally {
                      try {
                        if (fieldIndex_1_1 && !fieldIndex_1_1.done && (_h = fieldIndex_1.return))
                          _h.call(fieldIndex_1);
                      } finally {
                        if (e_12)
                          throw e_12.error;
                      }
                    }
                  }
                } catch (e_11_1) {
                  e_11 = { error: e_11_1 };
                } finally {
                  try {
                    if (fieldsData_1_1 && !fieldsData_1_1.done && (_g = fieldsData_1.return))
                      _g.call(fieldsData_1);
                  } finally {
                    if (e_11)
                      throw e_11.error;
                  }
                }
                if (this._index.get(term).size === 0) {
                  this._index.delete(term);
                }
                if (!(i % batchSize === 0))
                  return [3, 4];
                return [4, new Promise(function(resolve) {
                  return setTimeout(resolve, batchWait_1);
                })];
              case 3:
                _j.sent();
                _j.label = 4;
              case 4:
                i += 1;
                _j.label = 5;
              case 5:
                _b = _a2.next();
                return [3, 2];
              case 6:
                return [3, 9];
              case 7:
                e_10_1 = _j.sent();
                e_10 = { error: e_10_1 };
                return [3, 9];
              case 8:
                try {
                  if (_b && !_b.done && (_f = _a2.return))
                    _f.call(_a2);
                } finally {
                  if (e_10)
                    throw e_10.error;
                }
                return [
                  7
                  /*endfinally*/
                ];
              case 9:
                this._dirtCount -= initialDirtCount;
                _j.label = 10;
              case 10:
                return [4, null];
              case 11:
                _j.sent();
                this._currentVacuum = this._enqueuedVacuum;
                this._enqueuedVacuum = null;
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      };
      MiniSearch2.prototype.vacuumConditionsMet = function(conditions) {
        if (conditions == null) {
          return true;
        }
        var minDirtCount = conditions.minDirtCount, minDirtFactor = conditions.minDirtFactor;
        minDirtCount = minDirtCount || defaultAutoVacuumOptions.minDirtCount;
        minDirtFactor = minDirtFactor || defaultAutoVacuumOptions.minDirtFactor;
        return this.dirtCount >= minDirtCount && this.dirtFactor >= minDirtFactor;
      };
      Object.defineProperty(MiniSearch2.prototype, "isVacuuming", {
        /**
         * Is `true` if a vacuuming operation is ongoing, `false` otherwise
         */
        get: function() {
          return this._currentVacuum != null;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MiniSearch2.prototype, "dirtCount", {
        /**
         * The number of documents discarded since the most recent vacuuming
         */
        get: function() {
          return this._dirtCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MiniSearch2.prototype, "dirtFactor", {
        /**
         * A number between 0 and 1 giving an indication about the proportion of
         * documents that are discarded, and can therefore be cleaned up by vacuuming.
         * A value close to 0 means that the index is relatively clean, while a higher
         * value means that the index is relatively dirty, and vacuuming could release
         * memory.
         */
        get: function() {
          return this._dirtCount / (1 + this._documentCount + this._dirtCount);
        },
        enumerable: false,
        configurable: true
      });
      MiniSearch2.prototype.has = function(id) {
        return this._idToShortId.has(id);
      };
      MiniSearch2.prototype.getStoredFields = function(id) {
        var shortId = this._idToShortId.get(id);
        if (shortId == null) {
          return void 0;
        }
        return this._storedFields.get(shortId);
      };
      MiniSearch2.prototype.search = function(query, searchOptions) {
        var e_13, _a2;
        if (searchOptions === void 0) {
          searchOptions = {};
        }
        var rawResults = this.executeQuery(query, searchOptions);
        var results = [];
        try {
          for (var rawResults_1 = __values(rawResults), rawResults_1_1 = rawResults_1.next(); !rawResults_1_1.done; rawResults_1_1 = rawResults_1.next()) {
            var _b = __read(rawResults_1_1.value, 2), docId = _b[0], _c = _b[1], score = _c.score, terms = _c.terms, match = _c.match;
            var quality = terms.length || 1;
            var result = {
              id: this._documentIds.get(docId),
              score: score * quality,
              terms: Object.keys(match),
              queryTerms: terms,
              match
            };
            Object.assign(result, this._storedFields.get(docId));
            if (searchOptions.filter == null || searchOptions.filter(result)) {
              results.push(result);
            }
          }
        } catch (e_13_1) {
          e_13 = { error: e_13_1 };
        } finally {
          try {
            if (rawResults_1_1 && !rawResults_1_1.done && (_a2 = rawResults_1.return))
              _a2.call(rawResults_1);
          } finally {
            if (e_13)
              throw e_13.error;
          }
        }
        if (query === MiniSearch2.wildcard && searchOptions.boostDocument == null && this._options.searchOptions.boostDocument == null) {
          return results;
        }
        results.sort(byScore);
        return results;
      };
      MiniSearch2.prototype.autoSuggest = function(queryString, options) {
        var e_14, _a2, e_15, _b;
        if (options === void 0) {
          options = {};
        }
        options = __assign(__assign({}, this._options.autoSuggestOptions), options);
        var suggestions = /* @__PURE__ */ new Map();
        try {
          for (var _c = __values(this.search(queryString, options)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = _d.value, score = _e.score, terms = _e.terms;
            var phrase = terms.join(" ");
            var suggestion = suggestions.get(phrase);
            if (suggestion != null) {
              suggestion.score += score;
              suggestion.count += 1;
            } else {
              suggestions.set(phrase, { score, terms, count: 1 });
            }
          }
        } catch (e_14_1) {
          e_14 = { error: e_14_1 };
        } finally {
          try {
            if (_d && !_d.done && (_a2 = _c.return))
              _a2.call(_c);
          } finally {
            if (e_14)
              throw e_14.error;
          }
        }
        var results = [];
        try {
          for (var suggestions_1 = __values(suggestions), suggestions_1_1 = suggestions_1.next(); !suggestions_1_1.done; suggestions_1_1 = suggestions_1.next()) {
            var _f = __read(suggestions_1_1.value, 2), suggestion = _f[0], _g = _f[1], score = _g.score, terms = _g.terms, count = _g.count;
            results.push({ suggestion, terms, score: score / count });
          }
        } catch (e_15_1) {
          e_15 = { error: e_15_1 };
        } finally {
          try {
            if (suggestions_1_1 && !suggestions_1_1.done && (_b = suggestions_1.return))
              _b.call(suggestions_1);
          } finally {
            if (e_15)
              throw e_15.error;
          }
        }
        results.sort(byScore);
        return results;
      };
      Object.defineProperty(MiniSearch2.prototype, "documentCount", {
        /**
         * Total number of documents available to search
         */
        get: function() {
          return this._documentCount;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(MiniSearch2.prototype, "termCount", {
        /**
         * Number of terms in the index
         */
        get: function() {
          return this._index.size;
        },
        enumerable: false,
        configurable: true
      });
      MiniSearch2.loadJSON = function(json, options) {
        if (options == null) {
          throw new Error("MiniSearch: loadJSON should be given the same options used when serializing the index");
        }
        return this.loadJS(JSON.parse(json), options);
      };
      MiniSearch2.getDefault = function(optionName) {
        if (defaultOptions.hasOwnProperty(optionName)) {
          return getOwnProperty(defaultOptions, optionName);
        } else {
          throw new Error('MiniSearch: unknown option "'.concat(optionName, '"'));
        }
      };
      MiniSearch2.loadJS = function(js, options) {
        var e_16, _a2, e_17, _b, e_18, _c;
        var index2 = js.index, documentCount = js.documentCount, nextId = js.nextId, documentIds = js.documentIds, fieldIds = js.fieldIds, fieldLength = js.fieldLength, averageFieldLength = js.averageFieldLength, storedFields = js.storedFields, dirtCount = js.dirtCount, serializationVersion = js.serializationVersion;
        if (serializationVersion !== 1 && serializationVersion !== 2) {
          throw new Error("MiniSearch: cannot deserialize an index created with an incompatible version");
        }
        var miniSearch = new MiniSearch2(options);
        miniSearch._documentCount = documentCount;
        miniSearch._nextId = nextId;
        miniSearch._documentIds = objectToNumericMap(documentIds);
        miniSearch._idToShortId = /* @__PURE__ */ new Map();
        miniSearch._fieldIds = fieldIds;
        miniSearch._fieldLength = objectToNumericMap(fieldLength);
        miniSearch._avgFieldLength = averageFieldLength;
        miniSearch._storedFields = objectToNumericMap(storedFields);
        miniSearch._dirtCount = dirtCount || 0;
        miniSearch._index = new SearchableMap();
        try {
          for (var _d = __values(miniSearch._documentIds), _e = _d.next(); !_e.done; _e = _d.next()) {
            var _f = __read(_e.value, 2), shortId = _f[0], id = _f[1];
            miniSearch._idToShortId.set(id, shortId);
          }
        } catch (e_16_1) {
          e_16 = { error: e_16_1 };
        } finally {
          try {
            if (_e && !_e.done && (_a2 = _d.return))
              _a2.call(_d);
          } finally {
            if (e_16)
              throw e_16.error;
          }
        }
        try {
          for (var index_1 = __values(index2), index_1_1 = index_1.next(); !index_1_1.done; index_1_1 = index_1.next()) {
            var _g = __read(index_1_1.value, 2), term = _g[0], data = _g[1];
            var dataMap = /* @__PURE__ */ new Map();
            try {
              for (var _h = (e_18 = void 0, __values(Object.keys(data))), _j = _h.next(); !_j.done; _j = _h.next()) {
                var fieldId = _j.value;
                var indexEntry = data[fieldId];
                if (serializationVersion === 1) {
                  indexEntry = indexEntry.ds;
                }
                dataMap.set(parseInt(fieldId, 10), objectToNumericMap(indexEntry));
              }
            } catch (e_18_1) {
              e_18 = { error: e_18_1 };
            } finally {
              try {
                if (_j && !_j.done && (_c = _h.return))
                  _c.call(_h);
              } finally {
                if (e_18)
                  throw e_18.error;
              }
            }
            miniSearch._index.set(term, dataMap);
          }
        } catch (e_17_1) {
          e_17 = { error: e_17_1 };
        } finally {
          try {
            if (index_1_1 && !index_1_1.done && (_b = index_1.return))
              _b.call(index_1);
          } finally {
            if (e_17)
              throw e_17.error;
          }
        }
        return miniSearch;
      };
      MiniSearch2.prototype.executeQuery = function(query, searchOptions) {
        var _this = this;
        if (searchOptions === void 0) {
          searchOptions = {};
        }
        if (query === MiniSearch2.wildcard) {
          return this.executeWildcardQuery(searchOptions);
        }
        if (typeof query !== "string") {
          var options_1 = __assign(__assign(__assign({}, searchOptions), query), { queries: void 0 });
          var results_1 = query.queries.map(function(subquery) {
            return _this.executeQuery(subquery, options_1);
          });
          return this.combineResults(results_1, options_1.combineWith);
        }
        var _a2 = this._options, tokenize = _a2.tokenize, processTerm = _a2.processTerm, globalSearchOptions = _a2.searchOptions;
        var options = __assign(__assign({ tokenize, processTerm }, globalSearchOptions), searchOptions);
        var searchTokenize = options.tokenize, searchProcessTerm = options.processTerm;
        var terms = searchTokenize(query).flatMap(function(term) {
          return searchProcessTerm(term);
        }).filter(function(term) {
          return !!term;
        });
        var queries = terms.map(termToQuerySpec(options));
        var results = queries.map(function(query2) {
          return _this.executeQuerySpec(query2, options);
        });
        return this.combineResults(results, options.combineWith);
      };
      MiniSearch2.prototype.executeQuerySpec = function(query, searchOptions) {
        var e_19, _a2, e_20, _b;
        var options = __assign(__assign({}, this._options.searchOptions), searchOptions);
        var boosts = (options.fields || this._options.fields).reduce(function(boosts2, field) {
          var _a3;
          return __assign(__assign({}, boosts2), (_a3 = {}, _a3[field] = getOwnProperty(options.boost, field) || 1, _a3));
        }, {});
        var boostDocument = options.boostDocument, weights = options.weights, maxFuzzy = options.maxFuzzy, bm25params = options.bm25;
        var _c = __assign(__assign({}, defaultSearchOptions.weights), weights), fuzzyWeight = _c.fuzzy, prefixWeight = _c.prefix;
        var data = this._index.get(query.term);
        var results = this.termResults(query.term, query.term, 1, data, boosts, boostDocument, bm25params);
        var prefixMatches;
        var fuzzyMatches;
        if (query.prefix) {
          prefixMatches = this._index.atPrefix(query.term);
        }
        if (query.fuzzy) {
          var fuzzy = query.fuzzy === true ? 0.2 : query.fuzzy;
          var maxDistance = fuzzy < 1 ? Math.min(maxFuzzy, Math.round(query.term.length * fuzzy)) : fuzzy;
          if (maxDistance)
            fuzzyMatches = this._index.fuzzyGet(query.term, maxDistance);
        }
        if (prefixMatches) {
          try {
            for (var prefixMatches_1 = __values(prefixMatches), prefixMatches_1_1 = prefixMatches_1.next(); !prefixMatches_1_1.done; prefixMatches_1_1 = prefixMatches_1.next()) {
              var _d = __read(prefixMatches_1_1.value, 2), term = _d[0], data_1 = _d[1];
              var distance = term.length - query.term.length;
              if (!distance) {
                continue;
              }
              fuzzyMatches === null || fuzzyMatches === void 0 ? void 0 : fuzzyMatches.delete(term);
              var weight = prefixWeight * term.length / (term.length + 0.3 * distance);
              this.termResults(query.term, term, weight, data_1, boosts, boostDocument, bm25params, results);
            }
          } catch (e_19_1) {
            e_19 = { error: e_19_1 };
          } finally {
            try {
              if (prefixMatches_1_1 && !prefixMatches_1_1.done && (_a2 = prefixMatches_1.return))
                _a2.call(prefixMatches_1);
            } finally {
              if (e_19)
                throw e_19.error;
            }
          }
        }
        if (fuzzyMatches) {
          try {
            for (var _e = __values(fuzzyMatches.keys()), _f = _e.next(); !_f.done; _f = _e.next()) {
              var term = _f.value;
              var _g = __read(fuzzyMatches.get(term), 2), data_2 = _g[0], distance = _g[1];
              if (!distance) {
                continue;
              }
              var weight = fuzzyWeight * term.length / (term.length + distance);
              this.termResults(query.term, term, weight, data_2, boosts, boostDocument, bm25params, results);
            }
          } catch (e_20_1) {
            e_20 = { error: e_20_1 };
          } finally {
            try {
              if (_f && !_f.done && (_b = _e.return))
                _b.call(_e);
            } finally {
              if (e_20)
                throw e_20.error;
            }
          }
        }
        return results;
      };
      MiniSearch2.prototype.executeWildcardQuery = function(searchOptions) {
        var e_21, _a2;
        var results = /* @__PURE__ */ new Map();
        var options = __assign(__assign({}, this._options.searchOptions), searchOptions);
        try {
          for (var _b = __values(this._documentIds), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), shortId = _d[0], id = _d[1];
            var score = options.boostDocument ? options.boostDocument(id, "", this._storedFields.get(shortId)) : 1;
            results.set(shortId, {
              score,
              terms: [],
              match: {}
            });
          }
        } catch (e_21_1) {
          e_21 = { error: e_21_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_21)
              throw e_21.error;
          }
        }
        return results;
      };
      MiniSearch2.prototype.combineResults = function(results, combineWith) {
        if (combineWith === void 0) {
          combineWith = OR;
        }
        if (results.length === 0) {
          return /* @__PURE__ */ new Map();
        }
        var operator = combineWith.toLowerCase();
        return results.reduce(combinators[operator]) || /* @__PURE__ */ new Map();
      };
      MiniSearch2.prototype.toJSON = function() {
        var e_22, _a2, e_23, _b;
        var index2 = [];
        try {
          for (var _c = __values(this._index), _d = _c.next(); !_d.done; _d = _c.next()) {
            var _e = __read(_d.value, 2), term = _e[0], fieldIndex = _e[1];
            var data = {};
            try {
              for (var fieldIndex_2 = (e_23 = void 0, __values(fieldIndex)), fieldIndex_2_1 = fieldIndex_2.next(); !fieldIndex_2_1.done; fieldIndex_2_1 = fieldIndex_2.next()) {
                var _f = __read(fieldIndex_2_1.value, 2), fieldId = _f[0], freqs = _f[1];
                data[fieldId] = Object.fromEntries(freqs);
              }
            } catch (e_23_1) {
              e_23 = { error: e_23_1 };
            } finally {
              try {
                if (fieldIndex_2_1 && !fieldIndex_2_1.done && (_b = fieldIndex_2.return))
                  _b.call(fieldIndex_2);
              } finally {
                if (e_23)
                  throw e_23.error;
              }
            }
            index2.push([term, data]);
          }
        } catch (e_22_1) {
          e_22 = { error: e_22_1 };
        } finally {
          try {
            if (_d && !_d.done && (_a2 = _c.return))
              _a2.call(_c);
          } finally {
            if (e_22)
              throw e_22.error;
          }
        }
        return {
          documentCount: this._documentCount,
          nextId: this._nextId,
          documentIds: Object.fromEntries(this._documentIds),
          fieldIds: this._fieldIds,
          fieldLength: Object.fromEntries(this._fieldLength),
          averageFieldLength: this._avgFieldLength,
          storedFields: Object.fromEntries(this._storedFields),
          dirtCount: this._dirtCount,
          index: index2,
          serializationVersion: 2
        };
      };
      MiniSearch2.prototype.termResults = function(sourceTerm, derivedTerm, termWeight, fieldTermData, fieldBoosts, boostDocumentFn, bm25params, results) {
        var e_24, _a2, e_25, _b, _c;
        if (results === void 0) {
          results = /* @__PURE__ */ new Map();
        }
        if (fieldTermData == null)
          return results;
        try {
          for (var _d = __values(Object.keys(fieldBoosts)), _e = _d.next(); !_e.done; _e = _d.next()) {
            var field = _e.value;
            var fieldBoost = fieldBoosts[field];
            var fieldId = this._fieldIds[field];
            var fieldTermFreqs = fieldTermData.get(fieldId);
            if (fieldTermFreqs == null)
              continue;
            var matchingFields = fieldTermFreqs.size;
            var avgFieldLength = this._avgFieldLength[fieldId];
            try {
              for (var _f = (e_25 = void 0, __values(fieldTermFreqs.keys())), _g = _f.next(); !_g.done; _g = _f.next()) {
                var docId = _g.value;
                if (!this._documentIds.has(docId)) {
                  this.removeTerm(fieldId, docId, derivedTerm);
                  matchingFields -= 1;
                  continue;
                }
                var docBoost = boostDocumentFn ? boostDocumentFn(this._documentIds.get(docId), derivedTerm, this._storedFields.get(docId)) : 1;
                if (!docBoost)
                  continue;
                var termFreq = fieldTermFreqs.get(docId);
                var fieldLength = this._fieldLength.get(docId)[fieldId];
                var rawScore = calcBM25Score(termFreq, matchingFields, this._documentCount, fieldLength, avgFieldLength, bm25params);
                var weightedScore = termWeight * fieldBoost * docBoost * rawScore;
                var result = results.get(docId);
                if (result) {
                  result.score += weightedScore;
                  assignUniqueTerm(result.terms, sourceTerm);
                  var match = getOwnProperty(result.match, derivedTerm);
                  if (match) {
                    match.push(field);
                  } else {
                    result.match[derivedTerm] = [field];
                  }
                } else {
                  results.set(docId, {
                    score: weightedScore,
                    terms: [sourceTerm],
                    match: (_c = {}, _c[derivedTerm] = [field], _c)
                  });
                }
              }
            } catch (e_25_1) {
              e_25 = { error: e_25_1 };
            } finally {
              try {
                if (_g && !_g.done && (_b = _f.return))
                  _b.call(_f);
              } finally {
                if (e_25)
                  throw e_25.error;
              }
            }
          }
        } catch (e_24_1) {
          e_24 = { error: e_24_1 };
        } finally {
          try {
            if (_e && !_e.done && (_a2 = _d.return))
              _a2.call(_d);
          } finally {
            if (e_24)
              throw e_24.error;
          }
        }
        return results;
      };
      MiniSearch2.prototype.addTerm = function(fieldId, documentId, term) {
        var indexData = this._index.fetch(term, createMap);
        var fieldIndex = indexData.get(fieldId);
        if (fieldIndex == null) {
          fieldIndex = /* @__PURE__ */ new Map();
          fieldIndex.set(documentId, 1);
          indexData.set(fieldId, fieldIndex);
        } else {
          var docs = fieldIndex.get(documentId);
          fieldIndex.set(documentId, (docs || 0) + 1);
        }
      };
      MiniSearch2.prototype.removeTerm = function(fieldId, documentId, term) {
        if (!this._index.has(term)) {
          this.warnDocumentChanged(documentId, fieldId, term);
          return;
        }
        var indexData = this._index.fetch(term, createMap);
        var fieldIndex = indexData.get(fieldId);
        if (fieldIndex == null || fieldIndex.get(documentId) == null) {
          this.warnDocumentChanged(documentId, fieldId, term);
        } else if (fieldIndex.get(documentId) <= 1) {
          if (fieldIndex.size <= 1) {
            indexData.delete(fieldId);
          } else {
            fieldIndex.delete(documentId);
          }
        } else {
          fieldIndex.set(documentId, fieldIndex.get(documentId) - 1);
        }
        if (this._index.get(term).size === 0) {
          this._index.delete(term);
        }
      };
      MiniSearch2.prototype.warnDocumentChanged = function(shortDocumentId, fieldId, term) {
        var e_26, _a2;
        try {
          for (var _b = __values(Object.keys(this._fieldIds)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var fieldName = _c.value;
            if (this._fieldIds[fieldName] === fieldId) {
              this._options.logger("warn", "MiniSearch: document with ID ".concat(this._documentIds.get(shortDocumentId), ' has changed before removal: term "').concat(term, '" was not present in field "').concat(fieldName, '". Removing a document after it has changed can corrupt the index!'), "version_conflict");
              return;
            }
          }
        } catch (e_26_1) {
          e_26 = { error: e_26_1 };
        } finally {
          try {
            if (_c && !_c.done && (_a2 = _b.return))
              _a2.call(_b);
          } finally {
            if (e_26)
              throw e_26.error;
          }
        }
      };
      MiniSearch2.prototype.addDocumentId = function(documentId) {
        var shortDocumentId = this._nextId;
        this._idToShortId.set(documentId, shortDocumentId);
        this._documentIds.set(shortDocumentId, documentId);
        this._documentCount += 1;
        this._nextId += 1;
        return shortDocumentId;
      };
      MiniSearch2.prototype.addFields = function(fields) {
        for (var i = 0; i < fields.length; i++) {
          this._fieldIds[fields[i]] = i;
        }
      };
      MiniSearch2.prototype.addFieldLength = function(documentId, fieldId, count, length) {
        var fieldLengths = this._fieldLength.get(documentId);
        if (fieldLengths == null)
          this._fieldLength.set(documentId, fieldLengths = []);
        fieldLengths[fieldId] = length;
        var averageFieldLength = this._avgFieldLength[fieldId] || 0;
        var totalFieldLength = averageFieldLength * count + length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count + 1);
      };
      MiniSearch2.prototype.removeFieldLength = function(documentId, fieldId, count, length) {
        if (count === 1) {
          this._avgFieldLength[fieldId] = 0;
          return;
        }
        var totalFieldLength = this._avgFieldLength[fieldId] * count - length;
        this._avgFieldLength[fieldId] = totalFieldLength / (count - 1);
      };
      MiniSearch2.prototype.saveStoredFields = function(documentId, doc) {
        var e_27, _a2;
        var _b = this._options, storeFields = _b.storeFields, extractField = _b.extractField;
        if (storeFields == null || storeFields.length === 0) {
          return;
        }
        var documentFields = this._storedFields.get(documentId);
        if (documentFields == null)
          this._storedFields.set(documentId, documentFields = {});
        try {
          for (var storeFields_1 = __values(storeFields), storeFields_1_1 = storeFields_1.next(); !storeFields_1_1.done; storeFields_1_1 = storeFields_1.next()) {
            var fieldName = storeFields_1_1.value;
            var fieldValue = extractField(doc, fieldName);
            if (fieldValue !== void 0)
              documentFields[fieldName] = fieldValue;
          }
        } catch (e_27_1) {
          e_27 = { error: e_27_1 };
        } finally {
          try {
            if (storeFields_1_1 && !storeFields_1_1.done && (_a2 = storeFields_1.return))
              _a2.call(storeFields_1);
          } finally {
            if (e_27)
              throw e_27.error;
          }
        }
      };
      MiniSearch2.wildcard = Symbol("*");
      return MiniSearch2;
    }()
  );
  var getOwnProperty = function(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property) ? object[property] : void 0;
  };
  var combinators = (_a = {}, _a[OR] = function(a, b) {
    var e_28, _a2;
    try {
      for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var docId = _c.value;
        var existing = a.get(docId);
        if (existing == null) {
          a.set(docId, b.get(docId));
        } else {
          var _d = b.get(docId), score = _d.score, terms = _d.terms, match = _d.match;
          existing.score = existing.score + score;
          existing.match = Object.assign(existing.match, match);
          assignUniqueTerms(existing.terms, terms);
        }
      }
    } catch (e_28_1) {
      e_28 = { error: e_28_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_28)
          throw e_28.error;
      }
    }
    return a;
  }, _a[AND] = function(a, b) {
    var e_29, _a2;
    var combined = /* @__PURE__ */ new Map();
    try {
      for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var docId = _c.value;
        var existing = a.get(docId);
        if (existing == null)
          continue;
        var _d = b.get(docId), score = _d.score, terms = _d.terms, match = _d.match;
        assignUniqueTerms(existing.terms, terms);
        combined.set(docId, {
          score: existing.score + score,
          terms: existing.terms,
          match: Object.assign(existing.match, match)
        });
      }
    } catch (e_29_1) {
      e_29 = { error: e_29_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_29)
          throw e_29.error;
      }
    }
    return combined;
  }, _a[AND_NOT] = function(a, b) {
    var e_30, _a2;
    try {
      for (var _b = __values(b.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var docId = _c.value;
        a.delete(docId);
      }
    } catch (e_30_1) {
      e_30 = { error: e_30_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_30)
          throw e_30.error;
      }
    }
    return a;
  }, _a);
  var defaultBM25params = { k: 1.2, b: 0.7, d: 0.5 };
  var calcBM25Score = function(termFreq, matchingCount, totalCount, fieldLength, avgFieldLength, bm25params) {
    var k = bm25params.k, b = bm25params.b, d = bm25params.d;
    var invDocFreq = Math.log(1 + (totalCount - matchingCount + 0.5) / (matchingCount + 0.5));
    return invDocFreq * (d + termFreq * (k + 1) / (termFreq + k * (1 - b + b * fieldLength / avgFieldLength)));
  };
  var termToQuerySpec = function(options) {
    return function(term, i, terms) {
      var fuzzy = typeof options.fuzzy === "function" ? options.fuzzy(term, i, terms) : options.fuzzy || false;
      var prefix = typeof options.prefix === "function" ? options.prefix(term, i, terms) : options.prefix === true;
      return { term, fuzzy, prefix };
    };
  };
  var defaultOptions = {
    idField: "id",
    extractField: function(document2, fieldName) {
      return document2[fieldName];
    },
    tokenize: function(text) {
      return text.split(SPACE_OR_PUNCTUATION);
    },
    processTerm: function(term) {
      return term.toLowerCase();
    },
    fields: void 0,
    searchOptions: void 0,
    storeFields: [],
    logger: function(level, message) {
      if (typeof (console === null || console === void 0 ? void 0 : console[level]) === "function")
        console[level](message);
    },
    autoVacuum: true
  };
  var defaultSearchOptions = {
    combineWith: OR,
    prefix: false,
    fuzzy: false,
    maxFuzzy: 6,
    boost: {},
    weights: { fuzzy: 0.45, prefix: 0.375 },
    bm25: defaultBM25params
  };
  var defaultAutoSuggestOptions = {
    combineWith: AND,
    prefix: function(term, i, terms) {
      return i === terms.length - 1;
    }
  };
  var defaultVacuumOptions = { batchSize: 1e3, batchWait: 10 };
  var defaultVacuumConditions = { minDirtFactor: 0.1, minDirtCount: 20 };
  var defaultAutoVacuumOptions = __assign(__assign({}, defaultVacuumOptions), defaultVacuumConditions);
  var assignUniqueTerm = function(target, term) {
    if (!target.includes(term))
      target.push(term);
  };
  var assignUniqueTerms = function(target, source) {
    var e_31, _a2;
    try {
      for (var source_1 = __values(source), source_1_1 = source_1.next(); !source_1_1.done; source_1_1 = source_1.next()) {
        var term = source_1_1.value;
        if (!target.includes(term))
          target.push(term);
      }
    } catch (e_31_1) {
      e_31 = { error: e_31_1 };
    } finally {
      try {
        if (source_1_1 && !source_1_1.done && (_a2 = source_1.return))
          _a2.call(source_1);
      } finally {
        if (e_31)
          throw e_31.error;
      }
    }
  };
  var byScore = function(_a2, _b) {
    var a = _a2.score;
    var b = _b.score;
    return b - a;
  };
  var createMap = function() {
    return /* @__PURE__ */ new Map();
  };
  var objectToNumericMap = function(object) {
    var e_32, _a2;
    var map2 = /* @__PURE__ */ new Map();
    try {
      for (var _b = __values(Object.keys(object)), _c = _b.next(); !_c.done; _c = _b.next()) {
        var key = _c.value;
        map2.set(parseInt(key, 10), object[key]);
      }
    } catch (e_32_1) {
      e_32 = { error: e_32_1 };
    } finally {
      try {
        if (_c && !_c.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_32)
          throw e_32.error;
      }
    }
    return map2;
  };
  var SPACE_OR_PUNCTUATION = /[\n\r -#%-*,-/:;?@[-\]_{}\u00A0\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u1680\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2000-\u200A\u2010-\u2029\u202F-\u2043\u2045-\u2051\u2053-\u205F\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u3000-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]+/u;

  // src/battlev2/dom.ts
  var BATTLE_BOARD_SELECTOR = "#battle-board";
  var BATTLE_MOVIE_SELECTOR = "div[class*='leading']";
  var battleBoard = () => fromNullable(document.querySelector(BATTLE_BOARD_SELECTOR));
  var toMovie = (nodeText) => {
    const parts = nodeText.split(" ");
    return parts.length < 2 ? none2 : some2({
      name: parts.slice(0, -1).join(" "),
      year: parts.slice(-1)[0].replace("(", "").replace(")", "")
    });
  };
  var latestMovie = (board) => {
    const a = fromNullable(board.querySelector(BATTLE_MOVIE_SELECTOR));
    const b = flatMap(a, (element) => fromNullable(element.lastChild));
    const c = flatMap(
      b,
      (element) => element.nodeType === Node.TEXT_NODE ? fromNullable(element.textContent) : none2
    );
    return flatMap(c, toMovie);
  };

  // node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js
  var isNonEmpty2 = isNonEmpty;
  var extract = head;
  var head2 = extract;

  // node_modules/fp-ts/es6/ReadonlyArray.js
  var isNonEmpty3 = isNonEmpty2;
  var head3 = function(as3) {
    return isNonEmpty3(as3) ? some(head2(as3)) : none;
  };

  // node_modules/fp-ts/es6/Array.js
  var head4 = head3;

  // src/battlev2/battle.ts
  var initialState = {
    movies: [],
    links: {},
    usedMovieIds: []
  };
  var lastMovie = (battle) => {
    return head4(battle.movies);
  };
  var addMovie = (battle, battleMovie, movie) => {
    return {
      ...battle,
      movies: [battleMovie, ...battle.movies],
      usedMovieIds: !!movie.id ? [movie.id, ...battle.usedMovieIds] : battle.usedMovieIds
    };
  };

  // src/battlev2/graph.ts
  var import_values = __toESM(require_values());
  var import_get = __toESM(require_get());
  var import_take = __toESM(require_take());
  var import_sortBy = __toESM(require_sortBy());
  var import_reverse = __toESM(require_reverse());
  var import_groupBy = __toESM(require_groupBy());
  var import_mapValues = __toESM(require_mapValues());
  var import_first = __toESM(require_first());
  var import_flatten = __toESM(require_flatten());
  var import_has = __toESM(require_has());
  var import_set = __toESM(require_set());
  var import_uniq = __toESM(require_uniq());

  // src/battlev2/constants.ts
  var CAST_SEARCH_LIMIT = 8;
  var MOVIE_SEARCH_LIMIT = 20;
  var SUB_MOVIE_SEARCH_LIMIT = 3;
  var SUB_CAST_SEARCH_LIMIT = 4;
  var RECOMMENDATION_LIMIT = 30;
  var EXTRA_RECOMMENDATION_LIMIT = 100;
  var QUEEN_LATIFAH = "15758";
  var UNKNOWN_MOVIE_CREDITS = {
    cast: [],
    crew: []
  };
  var UNKNOWN_PERSON_CREDITS = {
    cast: [],
    crew: []
  };

  // src/battlev2/graph.ts
  var makeGraph = (url) => {
    return fetch(url).then((response) => response.json());
  };
  var makeIndex = (graph2) => {
    console.log("Building index from graph");
    const miniSearch = new MiniSearch({
      fields: ["title"],
      storeFields: ["id", "title", "year", "lang", "pop", "votes"]
    });
    miniSearch.addAll((0, import_values.default)(graph2.movies));
    console.log("Built index from graph");
    return miniSearch;
  };
  var searchForBattleMovie = (index2, battleMovie) => {
    const searchOptions = {
      filter: (result) => battleMovie.year ? result.year === battleMovie.year : true
    };
    return index2.search(battleMovie.name, searchOptions)[0];
  };
  var getMovieCrewAndCast = (movie, graph2) => {
    const movieCredits = (0, import_get.default)(graph2.movieCredits, movie.id, UNKNOWN_MOVIE_CREDITS);
    const crew = movieCredits.crew.map((id) => (0, import_get.default)(graph2.people, id)).filter((p) => !!p);
    const cast = movieCredits.cast.map((id) => (0, import_get.default)(graph2.people, id)).filter((p) => !!p);
    return [...crew, ...cast];
  };
  var getPersonsMovies = (person, graph2) => {
    const credits = (0, import_get.default)(graph2.peopleCredits, person.id, UNKNOWN_PERSON_CREDITS);
    const crew = credits.crew.map((id) => (0, import_get.default)(graph2.movies, id)).filter((m) => !!m);
    const cast = credits.cast.map((id) => (0, import_get.default)(graph2.movies, id)).filter((m) => !!m);
    return (0, import_reverse.default)((0, import_sortBy.default)([...crew, ...cast], (m) => m.pop));
  };
  var latifahCache = (graph2) => {
    console.log("Constructing cache for Queen Latifah");
    const latifah = (0, import_get.default)(graph2.people, QUEEN_LATIFAH);
    const movies = (0, import_mapValues.default)(
      (0, import_groupBy.default)(getPersonsMovies(latifah, graph2), (m) => m.id),
      import_first.default
    );
    const people = {};
    (0, import_values.default)(movies).forEach((movie) => {
      const crewAndCast = getMovieCrewAndCast(movie, graph2);
      crewAndCast.forEach((person) => {
        const latifahMovies = (0, import_get.default)(people, person.id) || [];
        (0, import_set.default)(people, person.id, (0, import_uniq.default)([...latifahMovies, movie]));
      });
    });
    console.log("Finished constructing cache for Queen Latifah");
    return {
      personId: QUEEN_LATIFAH,
      movies,
      people
    };
  };

  // src/battlev2/recommendation.ts
  var import_keys = __toESM(require_keys());
  var import_intersection = __toESM(require_intersection());
  var import_intersectionBy = __toESM(require_intersectionBy());
  var import_isEmpty = __toESM(require_isEmpty());
  var import_get2 = __toESM(require_get());
  var import_flatten2 = __toESM(require_flatten());
  var import_includes = __toESM(require_includes());
  var import_uniq2 = __toESM(require_uniq());
  var import_take2 = __toESM(require_take());
  var import_sortBy2 = __toESM(require_sortBy());
  var import_reverse2 = __toESM(require_reverse());
  var formatMovie = (movie) => `${movie?.title} (${movie?.year})`;
  var formatRec = (movie, links2) => `${formatMovie(movie)} via ${links2.map((p) => p.name).join(", ")}`;
  var links = (source, target, graph2) => {
    const sourcePeople = getMovieCrewAndCast(source, graph2);
    const targetPeople = getMovieCrewAndCast(target, graph2);
    return (0, import_intersectionBy.default)(sourcePeople, targetPeople, (p) => p.id);
  };
  var makeRecommendation = (battle, graph2, cache2, movie) => {
    console.log(`Recommending for ${formatMovie(movie)}`);
    const crewAndCast = getMovieCrewAndCast(movie, graph2).filter(
      (person) => person.id !== cache2.personId
    );
    const winConPeople = (0, import_intersection.default)(
      crewAndCast.map((c) => c.id),
      (0, import_keys.default)(cache2.people)
    );
    const winconMovies = (0, import_uniq2.default)((0, import_flatten2.default)(winConPeople.map((id) => (0, import_get2.default)(cache2.people, id, [])))).filter(
      (m) => !(0, import_includes.default)(battle.usedMovieIds, m.id)
    );
    const topCastCrew = (0, import_take2.default)((0, import_reverse2.default)((0, import_sortBy2.default)(crewAndCast, (p) => p.pop)), SUB_CAST_SEARCH_LIMIT);
    const topRecs = (0, import_uniq2.default)(
      (0, import_flatten2.default)(
        topCastCrew.map((person) => (0, import_take2.default)(getPersonsMovies(person, graph2), SUB_MOVIE_SEARCH_LIMIT))
      )
    );
    const extraRecs = (0, import_take2.default)(
      (0, import_reverse2.default)(
        (0, import_sortBy2.default)(
          (0, import_uniq2.default)(
            (0, import_flatten2.default)(
              (0, import_take2.default)(crewAndCast, CAST_SEARCH_LIMIT).map(
                (person) => (0, import_take2.default)(getPersonsMovies(person, graph2), MOVIE_SEARCH_LIMIT)
              )
            )
          ),
          (m) => m.pop
        )
      ),
      EXTRA_RECOMMENDATION_LIMIT
    ).filter((m) => !(0, import_includes.default)(battle.usedMovieIds, m.id));
    const recommendations = (0, import_take2.default)([...topRecs, ...extraRecs], RECOMMENDATION_LIMIT);
    console.log("Recommendations:");
    recommendations.forEach((m) => {
      const via = links(movie, m, graph2);
      console.log(`  ${formatRec(m, via)}`);
    });
    if (!(0, import_isEmpty.default)(winconMovies)) {
      console.log("Win condition movies:");
      winconMovies.forEach((m) => {
        const via = links(movie, m, graph2);
        console.log(`  ${formatRec(m, via)}`);
      });
    }
  };

  // src/content.ts
  var handleNewMovie = (battle, graph2, winConCache, movie) => {
    makeRecommendation(battle, graph2, winConCache, movie);
  };
  var awaitBattle = () => {
    console.log("Awaiting battle start!");
    return new Promise((resolve) => {
      if (isSome2(battleBoard())) {
        console.log("Battle board detected, awaiting movies");
        return resolve(battleBoard());
      }
      const observer = new MutationObserver((_) => {
        if (isSome2(battleBoard())) {
          console.log("Battle board detected, awaiting movies");
          observer.disconnect();
          resolve(battleBoard());
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  };
  var awaitNewMovies = (g, i, c) => (board) => {
    let battle = initialState;
    const observer = new MutationObserver((mutations) => {
      if (mutations.length > 2) {
        const topMovie = flatMap(board, latestMovie);
        if (topMovie !== lastMovie(battle)) {
          map((battleMovie) => {
            g.then(
              (graph2) => i.then(
                (index2) => c.then((cache2) => {
                  console.log(`Saw ${battleMovie?.name} (${battleMovie?.year}) on board`);
                  const movie = searchForBattleMovie(index2, battleMovie);
                  console.log(`Found movie: ${formatMovie(movie)}`);
                  battle = addMovie(battle, battleMovie, movie);
                  handleNewMovie(battle, graph2, cache2, movie);
                })
              )
            );
          })(topMovie);
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  var graph = makeGraph(chrome.runtime.getURL("static/graphv2.json"));
  var index = graph.then(makeIndex);
  var cache = graph.then(latifahCache);
  var run = () => awaitBattle().then(awaitNewMovies(graph, index, cache));
  run();
})();
//# sourceMappingURL=content.js.map
