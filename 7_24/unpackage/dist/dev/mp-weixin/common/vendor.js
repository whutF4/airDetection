(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(n);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 134:
/*!******************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/static/user/message.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 135:
/*!*******************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/static/user/favorite.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 136:
/*!******************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/static/user/service.png ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 155:
/*!*********************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/utils/index.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var barcode = __webpack_require__(/*! ./barcode */ 156);
var qrcode = __webpack_require__(/*! ./qrcode */ 157);

function convert_length(length) {
  return Math.round(wx.getSystemInfoSync().windowWidth * length / 750);
}

function barc(id, code, width, height) {
  barcode.code128(wx.createCanvasContext(id), code, convert_length(width), convert_length(height));
}

function qrc(id, code, width, height) {
  qrcode.api.draw(code, {
    ctx: wx.createCanvasContext(id),
    width: convert_length(width),
    height: convert_length(height) });

}

module.exports = {
  barcode: barc,
  qrcode: qrc };

/***/ }),

/***/ 156:
/*!***********************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/utils/barcode.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var CHAR_TILDE = 126;
var CODE_FNC1 = 102;

var SET_STARTA = 103;
var SET_STARTB = 104;
var SET_STARTC = 105;
var SET_SHIFT = 98;
var SET_CODEA = 101;
var SET_CODEB = 100;
var SET_STOP = 106;


var REPLACE_CODES = {
  CHAR_TILDE: CODE_FNC1 //~ corresponds to FNC1 in GS1-128 standard
};

var CODESET = {
  ANY: 1,
  AB: 2,
  A: 3,
  B: 4,
  C: 5 };


function getBytes(str) {
  var bytes = [];
  for (var i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}

exports.code128 = function (ctx, text, width, height) {

  width = parseInt(width);

  height = parseInt(height);

  var codes = stringToCode128(text);

  var g = new Graphics(ctx, width, height);

  var barWeight = g.area.width / ((codes.length - 3) * 11 + 35);

  var x = g.area.left;
  var y = g.area.top;
  for (var i = 0; i < codes.length; i++) {
    var c = codes[i];
    //two bars at a time: 1 black and 1 white
    for (var bar = 0; bar < 8; bar += 2) {
      var barW = PATTERNS[c][bar] * barWeight;
      // var barH = height - y - this.border;
      var barH = height - y;
      var spcW = PATTERNS[c][bar + 1] * barWeight;

      //no need to draw if 0 width
      if (barW > 0) {
        g.fillFgRect(x, y, barW, barH);
      }

      x += barW + spcW;
    }
  }

  ctx.draw();
};


function stringToCode128(text) {

  var barc = {
    currcs: CODESET.C };


  var bytes = getBytes(text);
  //decide starting codeset
  var index = bytes[0] == CHAR_TILDE ? 1 : 0;

  var csa1 = bytes.length > 0 ? codeSetAllowedFor(bytes[index++]) : CODESET.AB;
  var csa2 = bytes.length > 0 ? codeSetAllowedFor(bytes[index++]) : CODESET.AB;
  barc.currcs = getBestStartSet(csa1, csa2);
  barc.currcs = perhapsCodeC(bytes, barc.currcs);

  //if no codeset changes this will end up with bytes.length+3
  //start, checksum and stop
  var codes = new Array();

  switch (barc.currcs) {
    case CODESET.A:
      codes.push(SET_STARTA);
      break;
    case CODESET.B:
      codes.push(SET_STARTB);
      break;
    default:
      codes.push(SET_STARTC);
      break;}



  for (var i = 0; i < bytes.length; i++) {
    var b1 = bytes[i]; //get the first of a pair
    //should we translate/replace
    if (b1 in REPLACE_CODES) {
      codes.push(REPLACE_CODES[b1]);
      i++; //jump to next
      b1 = bytes[i];
    }

    //get the next in the pair if possible
    var b2 = bytes.length > i + 1 ? bytes[i + 1] : -1;

    codes = codes.concat(codesForChar(b1, b2, barc.currcs));
    //code C takes 2 chars each time
    if (barc.currcs == CODESET.C) i++;
  }

  //calculate checksum according to Code 128 standards
  var checksum = codes[0];
  for (var weight = 1; weight < codes.length; weight++) {
    checksum += weight * codes[weight];
  }
  codes.push(checksum % 103);

  codes.push(SET_STOP);

  //encoding should now be complete
  return codes;

  function getBestStartSet(csa1, csa2) {
    //tries to figure out the best codeset
    //to start with to get the most compact code
    var vote = 0;
    vote += csa1 == CODESET.A ? 1 : 0;
    vote += csa1 == CODESET.B ? -1 : 0;
    vote += csa2 == CODESET.A ? 1 : 0;
    vote += csa2 == CODESET.B ? -1 : 0;
    //tie goes to B due to my own predudices
    return vote > 0 ? CODESET.A : CODESET.B;
  }

  function perhapsCodeC(bytes, codeset) {
    for (var i = 0; i < bytes.length; i++) {
      var b = bytes[i];
      if ((b < 48 || b > 57) && b != CHAR_TILDE)
      return codeset;
    }
    return CODESET.C;
  }

  //chr1 is current byte
  //chr2 is the next byte to process. looks ahead.
  function codesForChar(chr1, chr2, currcs) {
    var result = [];
    var shifter = -1;

    if (charCompatible(chr1, currcs)) {
      if (currcs == CODESET.C) {
        if (chr2 == -1) {
          shifter = SET_CODEB;
          currcs = CODESET.B;
        } else
        if (chr2 != -1 && !charCompatible(chr2, currcs)) {
          //need to check ahead as well
          if (charCompatible(chr2, CODESET.A)) {
            shifter = SET_CODEA;
            currcs = CODESET.A;
          } else
          {
            shifter = SET_CODEB;
            currcs = CODESET.B;
          }
        }
      }
    } else
    {
      //if there is a next char AND that next char is also not compatible
      if (chr2 != -1 && !charCompatible(chr2, currcs)) {
        //need to switch code sets
        switch (currcs) {
          case CODESET.A:
            shifter = SET_CODEB;
            currcs = CODESET.B;
            break;
          case CODESET.B:
            shifter = SET_CODEA;
            currcs = CODESET.A;
            break;}

      } else
      {
        //no need to shift code sets, a temporary SHIFT will suffice
        shifter = SET_SHIFT;
      }
    }

    //ok some type of shift is nessecary
    if (shifter != -1) {
      result.push(shifter);
      result.push(codeValue(chr2));
    } else
    {
      if (currcs == CODESET.C) {
        //include next as well
        result.push(codeValue(chr1, chr2));
      } else
      {
        result.push(codeValue(chr1));
      }
    }
    barc.currcs = currcs;

    return result;
  }
}

//reduce the ascii code to fit into the Code128 char table
function codeValue(chr1, chr2) {
  if (typeof chr2 == "undefined") {
    return chr1 >= 32 ? chr1 - 32 : chr1 + 64;
  } else
  {
    return parseInt(String.fromCharCode(chr1) + String.fromCharCode(chr2));
  }
}

function charCompatible(chr, codeset) {
  var csa = codeSetAllowedFor(chr);
  if (csa == CODESET.ANY) return true;
  //if we need to change from current
  if (csa == CODESET.AB) return true;
  if (csa == CODESET.A && codeset == CODESET.A) return true;
  if (csa == CODESET.B && codeset == CODESET.B) return true;
  return false;
}

function codeSetAllowedFor(chr) {
  if (chr >= 48 && chr <= 57) {
    //0-9
    return CODESET.ANY;
  } else
  if (chr >= 32 && chr <= 95) {
    //0-9 A-Z
    return CODESET.AB;
  } else
  {
    //if non printable
    return chr < 32 ? CODESET.A : CODESET.B;
  }
}

var Graphics = function Graphics(ctx, width, height) {

  this.width = width;
  this.height = height;
  this.quiet = Math.round(this.width / 40);

  this.border_size = 0;
  this.padding_width = 0;

  this.area = {
    width: width - this.padding_width * 2 - this.quiet * 2,
    height: height - this.border_size * 2,
    top: this.border_size - 4,
    left: this.padding_width + this.quiet };


  this.ctx = ctx;
  this.fg = "#000000";
  this.bg = "#ffffff";

  // fill background
  this.fillBgRect(0, 0, width, height);

  // fill center to create border
  this.fillBgRect(0, this.border_size, width, height - this.border_size * 2);
};

//use native color
Graphics.prototype._fillRect = function (x, y, width, height, color) {
  this.ctx.setFillStyle(color);
  this.ctx.fillRect(x, y, width, height);
};

Graphics.prototype.fillFgRect = function (x, y, width, height) {
  this._fillRect(x, y, width, height, this.fg);
};

Graphics.prototype.fillBgRect = function (x, y, width, height) {
  this._fillRect(x, y, width, height, this.bg);
};

var PATTERNS = [
[2, 1, 2, 2, 2, 2, 0, 0], // 0
[2, 2, 2, 1, 2, 2, 0, 0], // 1
[2, 2, 2, 2, 2, 1, 0, 0], // 2
[1, 2, 1, 2, 2, 3, 0, 0], // 3
[1, 2, 1, 3, 2, 2, 0, 0], // 4
[1, 3, 1, 2, 2, 2, 0, 0], // 5
[1, 2, 2, 2, 1, 3, 0, 0], // 6
[1, 2, 2, 3, 1, 2, 0, 0], // 7
[1, 3, 2, 2, 1, 2, 0, 0], // 8
[2, 2, 1, 2, 1, 3, 0, 0], // 9
[2, 2, 1, 3, 1, 2, 0, 0], // 10
[2, 3, 1, 2, 1, 2, 0, 0], // 11
[1, 1, 2, 2, 3, 2, 0, 0], // 12
[1, 2, 2, 1, 3, 2, 0, 0], // 13
[1, 2, 2, 2, 3, 1, 0, 0], // 14
[1, 1, 3, 2, 2, 2, 0, 0], // 15
[1, 2, 3, 1, 2, 2, 0, 0], // 16
[1, 2, 3, 2, 2, 1, 0, 0], // 17
[2, 2, 3, 2, 1, 1, 0, 0], // 18
[2, 2, 1, 1, 3, 2, 0, 0], // 19
[2, 2, 1, 2, 3, 1, 0, 0], // 20
[2, 1, 3, 2, 1, 2, 0, 0], // 21
[2, 2, 3, 1, 1, 2, 0, 0], // 22
[3, 1, 2, 1, 3, 1, 0, 0], // 23
[3, 1, 1, 2, 2, 2, 0, 0], // 24
[3, 2, 1, 1, 2, 2, 0, 0], // 25
[3, 2, 1, 2, 2, 1, 0, 0], // 26
[3, 1, 2, 2, 1, 2, 0, 0], // 27
[3, 2, 2, 1, 1, 2, 0, 0], // 28
[3, 2, 2, 2, 1, 1, 0, 0], // 29
[2, 1, 2, 1, 2, 3, 0, 0], // 30
[2, 1, 2, 3, 2, 1, 0, 0], // 31
[2, 3, 2, 1, 2, 1, 0, 0], // 32
[1, 1, 1, 3, 2, 3, 0, 0], // 33
[1, 3, 1, 1, 2, 3, 0, 0], // 34
[1, 3, 1, 3, 2, 1, 0, 0], // 35
[1, 1, 2, 3, 1, 3, 0, 0], // 36
[1, 3, 2, 1, 1, 3, 0, 0], // 37
[1, 3, 2, 3, 1, 1, 0, 0], // 38
[2, 1, 1, 3, 1, 3, 0, 0], // 39
[2, 3, 1, 1, 1, 3, 0, 0], // 40
[2, 3, 1, 3, 1, 1, 0, 0], // 41
[1, 1, 2, 1, 3, 3, 0, 0], // 42
[1, 1, 2, 3, 3, 1, 0, 0], // 43
[1, 3, 2, 1, 3, 1, 0, 0], // 44
[1, 1, 3, 1, 2, 3, 0, 0], // 45
[1, 1, 3, 3, 2, 1, 0, 0], // 46
[1, 3, 3, 1, 2, 1, 0, 0], // 47
[3, 1, 3, 1, 2, 1, 0, 0], // 48
[2, 1, 1, 3, 3, 1, 0, 0], // 49
[2, 3, 1, 1, 3, 1, 0, 0], // 50
[2, 1, 3, 1, 1, 3, 0, 0], // 51
[2, 1, 3, 3, 1, 1, 0, 0], // 52
[2, 1, 3, 1, 3, 1, 0, 0], // 53
[3, 1, 1, 1, 2, 3, 0, 0], // 54
[3, 1, 1, 3, 2, 1, 0, 0], // 55
[3, 3, 1, 1, 2, 1, 0, 0], // 56
[3, 1, 2, 1, 1, 3, 0, 0], // 57
[3, 1, 2, 3, 1, 1, 0, 0], // 58
[3, 3, 2, 1, 1, 1, 0, 0], // 59
[3, 1, 4, 1, 1, 1, 0, 0], // 60
[2, 2, 1, 4, 1, 1, 0, 0], // 61
[4, 3, 1, 1, 1, 1, 0, 0], // 62
[1, 1, 1, 2, 2, 4, 0, 0], // 63
[1, 1, 1, 4, 2, 2, 0, 0], // 64
[1, 2, 1, 1, 2, 4, 0, 0], // 65
[1, 2, 1, 4, 2, 1, 0, 0], // 66
[1, 4, 1, 1, 2, 2, 0, 0], // 67
[1, 4, 1, 2, 2, 1, 0, 0], // 68
[1, 1, 2, 2, 1, 4, 0, 0], // 69
[1, 1, 2, 4, 1, 2, 0, 0], // 70
[1, 2, 2, 1, 1, 4, 0, 0], // 71
[1, 2, 2, 4, 1, 1, 0, 0], // 72
[1, 4, 2, 1, 1, 2, 0, 0], // 73
[1, 4, 2, 2, 1, 1, 0, 0], // 74
[2, 4, 1, 2, 1, 1, 0, 0], // 75
[2, 2, 1, 1, 1, 4, 0, 0], // 76
[4, 1, 3, 1, 1, 1, 0, 0], // 77
[2, 4, 1, 1, 1, 2, 0, 0], // 78
[1, 3, 4, 1, 1, 1, 0, 0], // 79
[1, 1, 1, 2, 4, 2, 0, 0], // 80
[1, 2, 1, 1, 4, 2, 0, 0], // 81
[1, 2, 1, 2, 4, 1, 0, 0], // 82
[1, 1, 4, 2, 1, 2, 0, 0], // 83
[1, 2, 4, 1, 1, 2, 0, 0], // 84
[1, 2, 4, 2, 1, 1, 0, 0], // 85
[4, 1, 1, 2, 1, 2, 0, 0], // 86
[4, 2, 1, 1, 1, 2, 0, 0], // 87
[4, 2, 1, 2, 1, 1, 0, 0], // 88
[2, 1, 2, 1, 4, 1, 0, 0], // 89
[2, 1, 4, 1, 2, 1, 0, 0], // 90
[4, 1, 2, 1, 2, 1, 0, 0], // 91
[1, 1, 1, 1, 4, 3, 0, 0], // 92
[1, 1, 1, 3, 4, 1, 0, 0], // 93
[1, 3, 1, 1, 4, 1, 0, 0], // 94
[1, 1, 4, 1, 1, 3, 0, 0], // 95
[1, 1, 4, 3, 1, 1, 0, 0], // 96
[4, 1, 1, 1, 1, 3, 0, 0], // 97
[4, 1, 1, 3, 1, 1, 0, 0], // 98
[1, 1, 3, 1, 4, 1, 0, 0], // 99
[1, 1, 4, 1, 3, 1, 0, 0], // 100
[3, 1, 1, 1, 4, 1, 0, 0], // 101
[4, 1, 1, 1, 3, 1, 0, 0], // 102
[2, 1, 1, 4, 1, 2, 0, 0], // 103
[2, 1, 1, 2, 1, 4, 0, 0], // 104
[2, 1, 1, 2, 3, 2, 0, 0], // 105
[2, 3, 3, 1, 1, 1, 2, 0] // 106
];

/***/ }),

/***/ 157:
/*!**********************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/utils/qrcode.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var QR = function () {

  // alignment pattern
  var adelta = [
  0, 11, 15, 19, 23, 27, 31, // force 1 pat
  16, 18, 20, 22, 24, 26, 28, 20, 22, 24, 24, 26, 28, 28, 22, 24, 24,
  26, 26, 28, 28, 24, 24, 26, 26, 26, 28, 28, 24, 26, 26, 26, 28, 28];


  // version block
  var vpat = [
  0xc94, 0x5bc, 0xa99, 0x4d3, 0xbf6, 0x762, 0x847, 0x60d,
  0x928, 0xb78, 0x45d, 0xa17, 0x532, 0x9a6, 0x683, 0x8c9,
  0x7ec, 0xec4, 0x1e1, 0xfab, 0x08e, 0xc1a, 0x33f, 0xd75,
  0x250, 0x9d5, 0x6f0, 0x8ba, 0x79f, 0xb0b, 0x42e, 0xa64,
  0x541, 0xc69];


  // final format bits with mask: level << 3 | mask
  var fmtword = [
  0x77c4, 0x72f3, 0x7daa, 0x789d, 0x662f, 0x6318, 0x6c41, 0x6976, //L
  0x5412, 0x5125, 0x5e7c, 0x5b4b, 0x45f9, 0x40ce, 0x4f97, 0x4aa0, //M
  0x355f, 0x3068, 0x3f31, 0x3a06, 0x24b4, 0x2183, 0x2eda, 0x2bed, //Q
  0x1689, 0x13be, 0x1ce7, 0x19d0, 0x0762, 0x0255, 0x0d0c, 0x083b //H
  ];

  // 4 per version: number of blocks 1,2; data width; ecc width
  var eccblocks = [
  1, 0, 19, 7, 1, 0, 16, 10, 1, 0, 13, 13, 1, 0, 9, 17,
  1, 0, 34, 10, 1, 0, 28, 16, 1, 0, 22, 22, 1, 0, 16, 28,
  1, 0, 55, 15, 1, 0, 44, 26, 2, 0, 17, 18, 2, 0, 13, 22,
  1, 0, 80, 20, 2, 0, 32, 18, 2, 0, 24, 26, 4, 0, 9, 16,
  1, 0, 108, 26, 2, 0, 43, 24, 2, 2, 15, 18, 2, 2, 11, 22,
  2, 0, 68, 18, 4, 0, 27, 16, 4, 0, 19, 24, 4, 0, 15, 28,
  2, 0, 78, 20, 4, 0, 31, 18, 2, 4, 14, 18, 4, 1, 13, 26,
  2, 0, 97, 24, 2, 2, 38, 22, 4, 2, 18, 22, 4, 2, 14, 26,
  2, 0, 116, 30, 3, 2, 36, 22, 4, 4, 16, 20, 4, 4, 12, 24,
  2, 2, 68, 18, 4, 1, 43, 26, 6, 2, 19, 24, 6, 2, 15, 28,
  4, 0, 81, 20, 1, 4, 50, 30, 4, 4, 22, 28, 3, 8, 12, 24,
  2, 2, 92, 24, 6, 2, 36, 22, 4, 6, 20, 26, 7, 4, 14, 28,
  4, 0, 107, 26, 8, 1, 37, 22, 8, 4, 20, 24, 12, 4, 11, 22,
  3, 1, 115, 30, 4, 5, 40, 24, 11, 5, 16, 20, 11, 5, 12, 24,
  5, 1, 87, 22, 5, 5, 41, 24, 5, 7, 24, 30, 11, 7, 12, 24,
  5, 1, 98, 24, 7, 3, 45, 28, 15, 2, 19, 24, 3, 13, 15, 30,
  1, 5, 107, 28, 10, 1, 46, 28, 1, 15, 22, 28, 2, 17, 14, 28,
  5, 1, 120, 30, 9, 4, 43, 26, 17, 1, 22, 28, 2, 19, 14, 28,
  3, 4, 113, 28, 3, 11, 44, 26, 17, 4, 21, 26, 9, 16, 13, 26,
  3, 5, 107, 28, 3, 13, 41, 26, 15, 5, 24, 30, 15, 10, 15, 28,
  4, 4, 116, 28, 17, 0, 42, 26, 17, 6, 22, 28, 19, 6, 16, 30,
  2, 7, 111, 28, 17, 0, 46, 28, 7, 16, 24, 30, 34, 0, 13, 24,
  4, 5, 121, 30, 4, 14, 47, 28, 11, 14, 24, 30, 16, 14, 15, 30,
  6, 4, 117, 30, 6, 14, 45, 28, 11, 16, 24, 30, 30, 2, 16, 30,
  8, 4, 106, 26, 8, 13, 47, 28, 7, 22, 24, 30, 22, 13, 15, 30,
  10, 2, 114, 28, 19, 4, 46, 28, 28, 6, 22, 28, 33, 4, 16, 30,
  8, 4, 122, 30, 22, 3, 45, 28, 8, 26, 23, 30, 12, 28, 15, 30,
  3, 10, 117, 30, 3, 23, 45, 28, 4, 31, 24, 30, 11, 31, 15, 30,
  7, 7, 116, 30, 21, 7, 45, 28, 1, 37, 23, 30, 19, 26, 15, 30,
  5, 10, 115, 30, 19, 10, 47, 28, 15, 25, 24, 30, 23, 25, 15, 30,
  13, 3, 115, 30, 2, 29, 46, 28, 42, 1, 24, 30, 23, 28, 15, 30,
  17, 0, 115, 30, 10, 23, 46, 28, 10, 35, 24, 30, 19, 35, 15, 30,
  17, 1, 115, 30, 14, 21, 46, 28, 29, 19, 24, 30, 11, 46, 15, 30,
  13, 6, 115, 30, 14, 23, 46, 28, 44, 7, 24, 30, 59, 1, 16, 30,
  12, 7, 121, 30, 12, 26, 47, 28, 39, 14, 24, 30, 22, 41, 15, 30,
  6, 14, 121, 30, 6, 34, 47, 28, 46, 10, 24, 30, 2, 64, 15, 30,
  17, 4, 122, 30, 29, 14, 46, 28, 49, 10, 24, 30, 24, 46, 15, 30,
  4, 18, 122, 30, 13, 32, 46, 28, 48, 14, 24, 30, 42, 32, 15, 30,
  20, 4, 117, 30, 40, 7, 47, 28, 43, 22, 24, 30, 10, 67, 15, 30,
  19, 6, 118, 30, 18, 31, 47, 28, 34, 34, 24, 30, 20, 61, 15, 30];


  // Galois field log table
  var glog = [
  0xff, 0x00, 0x01, 0x19, 0x02, 0x32, 0x1a, 0xc6, 0x03, 0xdf, 0x33, 0xee, 0x1b, 0x68, 0xc7, 0x4b,
  0x04, 0x64, 0xe0, 0x0e, 0x34, 0x8d, 0xef, 0x81, 0x1c, 0xc1, 0x69, 0xf8, 0xc8, 0x08, 0x4c, 0x71,
  0x05, 0x8a, 0x65, 0x2f, 0xe1, 0x24, 0x0f, 0x21, 0x35, 0x93, 0x8e, 0xda, 0xf0, 0x12, 0x82, 0x45,
  0x1d, 0xb5, 0xc2, 0x7d, 0x6a, 0x27, 0xf9, 0xb9, 0xc9, 0x9a, 0x09, 0x78, 0x4d, 0xe4, 0x72, 0xa6,
  0x06, 0xbf, 0x8b, 0x62, 0x66, 0xdd, 0x30, 0xfd, 0xe2, 0x98, 0x25, 0xb3, 0x10, 0x91, 0x22, 0x88,
  0x36, 0xd0, 0x94, 0xce, 0x8f, 0x96, 0xdb, 0xbd, 0xf1, 0xd2, 0x13, 0x5c, 0x83, 0x38, 0x46, 0x40,
  0x1e, 0x42, 0xb6, 0xa3, 0xc3, 0x48, 0x7e, 0x6e, 0x6b, 0x3a, 0x28, 0x54, 0xfa, 0x85, 0xba, 0x3d,
  0xca, 0x5e, 0x9b, 0x9f, 0x0a, 0x15, 0x79, 0x2b, 0x4e, 0xd4, 0xe5, 0xac, 0x73, 0xf3, 0xa7, 0x57,
  0x07, 0x70, 0xc0, 0xf7, 0x8c, 0x80, 0x63, 0x0d, 0x67, 0x4a, 0xde, 0xed, 0x31, 0xc5, 0xfe, 0x18,
  0xe3, 0xa5, 0x99, 0x77, 0x26, 0xb8, 0xb4, 0x7c, 0x11, 0x44, 0x92, 0xd9, 0x23, 0x20, 0x89, 0x2e,
  0x37, 0x3f, 0xd1, 0x5b, 0x95, 0xbc, 0xcf, 0xcd, 0x90, 0x87, 0x97, 0xb2, 0xdc, 0xfc, 0xbe, 0x61,
  0xf2, 0x56, 0xd3, 0xab, 0x14, 0x2a, 0x5d, 0x9e, 0x84, 0x3c, 0x39, 0x53, 0x47, 0x6d, 0x41, 0xa2,
  0x1f, 0x2d, 0x43, 0xd8, 0xb7, 0x7b, 0xa4, 0x76, 0xc4, 0x17, 0x49, 0xec, 0x7f, 0x0c, 0x6f, 0xf6,
  0x6c, 0xa1, 0x3b, 0x52, 0x29, 0x9d, 0x55, 0xaa, 0xfb, 0x60, 0x86, 0xb1, 0xbb, 0xcc, 0x3e, 0x5a,
  0xcb, 0x59, 0x5f, 0xb0, 0x9c, 0xa9, 0xa0, 0x51, 0x0b, 0xf5, 0x16, 0xeb, 0x7a, 0x75, 0x2c, 0xd7,
  0x4f, 0xae, 0xd5, 0xe9, 0xe6, 0xe7, 0xad, 0xe8, 0x74, 0xd6, 0xf4, 0xea, 0xa8, 0x50, 0x58, 0xaf];


  // Galios field exponent table
  var gexp = [
  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1d, 0x3a, 0x74, 0xe8, 0xcd, 0x87, 0x13, 0x26,
  0x4c, 0x98, 0x2d, 0x5a, 0xb4, 0x75, 0xea, 0xc9, 0x8f, 0x03, 0x06, 0x0c, 0x18, 0x30, 0x60, 0xc0,
  0x9d, 0x27, 0x4e, 0x9c, 0x25, 0x4a, 0x94, 0x35, 0x6a, 0xd4, 0xb5, 0x77, 0xee, 0xc1, 0x9f, 0x23,
  0x46, 0x8c, 0x05, 0x0a, 0x14, 0x28, 0x50, 0xa0, 0x5d, 0xba, 0x69, 0xd2, 0xb9, 0x6f, 0xde, 0xa1,
  0x5f, 0xbe, 0x61, 0xc2, 0x99, 0x2f, 0x5e, 0xbc, 0x65, 0xca, 0x89, 0x0f, 0x1e, 0x3c, 0x78, 0xf0,
  0xfd, 0xe7, 0xd3, 0xbb, 0x6b, 0xd6, 0xb1, 0x7f, 0xfe, 0xe1, 0xdf, 0xa3, 0x5b, 0xb6, 0x71, 0xe2,
  0xd9, 0xaf, 0x43, 0x86, 0x11, 0x22, 0x44, 0x88, 0x0d, 0x1a, 0x34, 0x68, 0xd0, 0xbd, 0x67, 0xce,
  0x81, 0x1f, 0x3e, 0x7c, 0xf8, 0xed, 0xc7, 0x93, 0x3b, 0x76, 0xec, 0xc5, 0x97, 0x33, 0x66, 0xcc,
  0x85, 0x17, 0x2e, 0x5c, 0xb8, 0x6d, 0xda, 0xa9, 0x4f, 0x9e, 0x21, 0x42, 0x84, 0x15, 0x2a, 0x54,
  0xa8, 0x4d, 0x9a, 0x29, 0x52, 0xa4, 0x55, 0xaa, 0x49, 0x92, 0x39, 0x72, 0xe4, 0xd5, 0xb7, 0x73,
  0xe6, 0xd1, 0xbf, 0x63, 0xc6, 0x91, 0x3f, 0x7e, 0xfc, 0xe5, 0xd7, 0xb3, 0x7b, 0xf6, 0xf1, 0xff,
  0xe3, 0xdb, 0xab, 0x4b, 0x96, 0x31, 0x62, 0xc4, 0x95, 0x37, 0x6e, 0xdc, 0xa5, 0x57, 0xae, 0x41,
  0x82, 0x19, 0x32, 0x64, 0xc8, 0x8d, 0x07, 0x0e, 0x1c, 0x38, 0x70, 0xe0, 0xdd, 0xa7, 0x53, 0xa6,
  0x51, 0xa2, 0x59, 0xb2, 0x79, 0xf2, 0xf9, 0xef, 0xc3, 0x9b, 0x2b, 0x56, 0xac, 0x45, 0x8a, 0x09,
  0x12, 0x24, 0x48, 0x90, 0x3d, 0x7a, 0xf4, 0xf5, 0xf7, 0xf3, 0xfb, 0xeb, 0xcb, 0x8b, 0x0b, 0x16,
  0x2c, 0x58, 0xb0, 0x7d, 0xfa, 0xe9, 0xcf, 0x83, 0x1b, 0x36, 0x6c, 0xd8, 0xad, 0x47, 0x8e, 0x00];


  // Working buffers:
  // data input and ecc append, image working buffer, fixed part of image, run lengths for badness
  var strinbuf = [],eccbuf = [],qrframe = [],framask = [],rlens = [];
  // Control values - width is based on version, last 4 are from table.
  var version, width, neccblk1, neccblk2, datablkw, eccblkwid;
  var ecclevel = 2;
  // set bit to indicate cell in qrframe is immutable.  symmetric around diagonal
  function setmask(x, y)
  {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    // y*y = 1+3+5...
    bt = y;
    bt *= y;
    bt += y;
    bt >>= 1;
    bt += x;
    framask[bt] = 1;
  }

  // enter alignment pattern - black to qrframe, white to mask (later black frame merged to mask)
  function putalign(x, y)
  {
    var j;

    qrframe[x + width * y] = 1;
    for (j = -2; j < 2; j++) {
      qrframe[x + j + width * (y - 2)] = 1;
      qrframe[x - 2 + width * (y + j + 1)] = 1;
      qrframe[x + 2 + width * (y + j)] = 1;
      qrframe[x + j + 1 + width * (y + 2)] = 1;
    }
    for (j = 0; j < 2; j++) {
      setmask(x - 1, y + j);
      setmask(x + 1, y - j);
      setmask(x - j, y - 1);
      setmask(x + j, y + 1);
    }
  }

  //========================================================================
  // Reed Solomon error correction
  // exponentiation mod N
  function modnn(x)
  {
    while (x >= 255) {
      x -= 255;
      x = (x >> 8) + (x & 255);
    }
    return x;
  }

  var genpoly = [];

  // Calculate and append ECC data to data block.  Block is in strinbuf, indexes to buffers given.
  function appendrs(data, dlen, ecbuf, eclen)
  {
    var i, j, fb;

    for (i = 0; i < eclen; i++) {
      strinbuf[ecbuf + i] = 0;}
    for (i = 0; i < dlen; i++) {
      fb = glog[strinbuf[data + i] ^ strinbuf[ecbuf]];
      if (fb != 255) /* fb term is non-zero */
        for (j = 1; j < eclen; j++) {
          strinbuf[ecbuf + j - 1] = strinbuf[ecbuf + j] ^ gexp[modnn(fb + genpoly[eclen - j])];} else

      for (j = ecbuf; j < ecbuf + eclen; j++) {
        strinbuf[j] = strinbuf[j + 1];}
      strinbuf[ecbuf + eclen - 1] = fb == 255 ? 0 : gexp[modnn(fb + genpoly[0])];
    }
  }

  //========================================================================
  // Frame data insert following the path rules

  // check mask - since symmetrical use half.
  function ismasked(x, y)
  {
    var bt;
    if (x > y) {
      bt = x;
      x = y;
      y = bt;
    }
    bt = y;
    bt += y * y;
    bt >>= 1;
    bt += x;
    return framask[bt];
  }

  //========================================================================
  //  Apply the selected mask out of the 8.
  function applymask(m)
  {
    var x, y, r3x, r3y;

    switch (m) {
      case 0:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(x + y & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;}}
        break;
      case 1:
        for (y = 0; y < width; y++) {
          for (x = 0; x < width; x++) {
            if (!(y & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;}}
        break;
      case 2:
        for (y = 0; y < width; y++) {
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!r3x && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }}
        break;
      case 3:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = r3y, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!r3x && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 4:
        for (y = 0; y < width; y++) {
          for (r3x = 0, r3y = y >> 1 & 1, x = 0; x < width; x++, r3x++) {
            if (r3x == 3) {
              r3x = 0;
              r3y = !r3y;
            }
            if (!r3y && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }}
        break;
      case 5:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!((x & y & 1) + !(!r3x | !r3y)) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 6:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!((x & y & 1) + (r3x && r3x == r3y) & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;
      case 7:
        for (r3y = 0, y = 0; y < width; y++, r3y++) {
          if (r3y == 3)
          r3y = 0;
          for (r3x = 0, x = 0; x < width; x++, r3x++) {
            if (r3x == 3)
            r3x = 0;
            if (!((r3x && r3x == r3y) + (x + y & 1) & 1) && !ismasked(x, y))
            qrframe[x + y * width] ^= 1;
          }
        }
        break;}

    return;
  }

  // Badness coefficients.
  var N1 = 3,N2 = 3,N3 = 40,N4 = 10;

  // Using the table of the length of each run, calculate the amount of bad image 
  // - long runs or those that look like finders; called twice, once each for X and Y
  function badruns(length)
  {
    var i;
    var runsbad = 0;
    for (i = 0; i <= length; i++) {
      if (rlens[i] >= 5)
      runsbad += N1 + rlens[i] - 5;}
    // BwBBBwB as in finder
    for (i = 3; i < length - 1; i += 2) {
      if (rlens[i - 2] == rlens[i + 2] &&
      rlens[i + 2] == rlens[i - 1] &&
      rlens[i - 1] == rlens[i + 1] &&
      rlens[i - 1] * 3 == rlens[i]
      // white around the black pattern? Not part of spec
      && (rlens[i - 3] == 0 // beginning
      || i + 3 > length // end
      || rlens[i - 3] * 3 >= rlens[i] * 4 || rlens[i + 3] * 3 >= rlens[i] * 4))

      runsbad += N3;}
    return runsbad;
  }

  // Calculate how bad the masked image is - blocks, imbalance, runs, or finders.
  function badcheck()
  {
    var x, y, h, b, b1;
    var thisbad = 0;
    var bw = 0;

    // blocks of same color.
    for (y = 0; y < width - 1; y++) {
      for (x = 0; x < width - 1; x++) {
        if (qrframe[x + width * y] && qrframe[x + 1 + width * y] &&
        qrframe[x + width * (y + 1)] && qrframe[x + 1 + width * (y + 1)] || // all black
        !(qrframe[x + width * y] || qrframe[x + 1 + width * y] ||
        qrframe[x + width * (y + 1)] || qrframe[x + 1 + width * (y + 1)])) // all white
          thisbad += N2;}}

    // X runs
    for (y = 0; y < width; y++) {
      rlens[0] = 0;
      for (h = b = x = 0; x < width; x++) {
        if ((b1 = qrframe[x + width * y]) == b)
        rlens[h]++;else

        rlens[++h] = 1;
        b = b1;
        bw += b ? 1 : -1;
      }
      thisbad += badruns(h);
    }

    // black/white imbalance
    if (bw < 0)
    bw = -bw;

    var big = bw;
    var count = 0;
    big += big << 2;
    big <<= 1;
    while (big > width * width) {
      big -= width * width, count++;}
    thisbad += count * N4;

    // Y runs
    for (x = 0; x < width; x++) {
      rlens[0] = 0;
      for (h = b = y = 0; y < width; y++) {
        if ((b1 = qrframe[x + width * y]) == b)
        rlens[h]++;else

        rlens[++h] = 1;
        b = b1;
      }
      thisbad += badruns(h);
    }
    return thisbad;
  }

  function genframe(instring)
  {
    var x, y, k, t, v, i, j, m;

    // find the smallest version that fits the string
    t = instring.length;
    version = 0;
    do {
      version++;
      k = (ecclevel - 1) * 4 + (version - 1) * 16;
      neccblk1 = eccblocks[k++];
      neccblk2 = eccblocks[k++];
      datablkw = eccblocks[k++];
      eccblkwid = eccblocks[k];
      k = datablkw * (neccblk1 + neccblk2) + neccblk2 - 3 + (version <= 9);
      if (t <= k)
      break;
    } while (version < 40);

    // FIXME - insure that it fits insted of being truncated
    width = 17 + 4 * version;

    // allocate, clear and setup data structures
    v = datablkw + (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (t = 0; t < v; t++) {
      eccbuf[t] = 0;}
    strinbuf = instring.slice(0);

    for (t = 0; t < width * width; t++) {
      qrframe[t] = 0;}

    for (t = 0; t < (width * (width + 1) + 1) / 2; t++) {
      framask[t] = 0;}

    // insert finders - black to frame, white to mask
    for (t = 0; t < 3; t++) {
      k = 0;
      y = 0;
      if (t == 1)
      k = width - 7;
      if (t == 2)
      y = width - 7;
      qrframe[y + 3 + width * (k + 3)] = 1;
      for (x = 0; x < 6; x++) {
        qrframe[y + x + width * k] = 1;
        qrframe[y + width * (k + x + 1)] = 1;
        qrframe[y + 6 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 6)] = 1;
      }
      for (x = 1; x < 5; x++) {
        setmask(y + x, k + 1);
        setmask(y + 1, k + x + 1);
        setmask(y + 5, k + x);
        setmask(y + x + 1, k + 5);
      }
      for (x = 2; x < 4; x++) {
        qrframe[y + x + width * (k + 2)] = 1;
        qrframe[y + 2 + width * (k + x + 1)] = 1;
        qrframe[y + 4 + width * (k + x)] = 1;
        qrframe[y + x + 1 + width * (k + 4)] = 1;
      }
    }

    // alignment blocks
    if (version > 1) {
      t = adelta[version];
      y = width - 7;
      for (;;) {
        x = width - 7;
        while (x > t - 3) {
          putalign(x, y);
          if (x < t)
          break;
          x -= t;
        }
        if (y <= t + 9)
        break;
        y -= t;
        putalign(6, y);
        putalign(y, 6);
      }
    }

    // single black
    qrframe[8 + width * (width - 8)] = 1;

    // timing gap - mask only
    for (y = 0; y < 7; y++) {
      setmask(7, y);
      setmask(width - 8, y);
      setmask(7, y + width - 7);
    }
    for (x = 0; x < 8; x++) {
      setmask(x, 7);
      setmask(x + width - 8, 7);
      setmask(x, width - 8);
    }

    // reserve mask-format area
    for (x = 0; x < 9; x++) {
      setmask(x, 8);}
    for (x = 0; x < 8; x++) {
      setmask(x + width - 8, 8);
      setmask(8, x);
    }
    for (y = 0; y < 7; y++) {
      setmask(8, y + width - 7);}

    // timing row/col
    for (x = 0; x < width - 14; x++) {
      if (x & 1) {
        setmask(8 + x, 6);
        setmask(6, 8 + x);
      } else
      {
        qrframe[8 + x + width * 6] = 1;
        qrframe[6 + width * (8 + x)] = 1;
      }}

    // version block
    if (version > 6) {
      t = vpat[version - 7];
      k = 17;
      for (x = 0; x < 6; x++) {
        for (y = 0; y < 3; y++, k--) {
          if (1 & (k > 11 ? version >> k - 12 : t >> k)) {
            qrframe[5 - x + width * (2 - y + width - 11)] = 1;
            qrframe[2 - y + width - 11 + width * (5 - x)] = 1;
          } else
          {
            setmask(5 - x, 2 - y + width - 11);
            setmask(2 - y + width - 11, 5 - x);
          }}}
    }

    // sync mask bits - only set above for white spaces, so add in black bits
    for (y = 0; y < width; y++) {
      for (x = 0; x <= y; x++) {
        if (qrframe[x + width * y])
        setmask(x, y);}}

    // convert string to bitstream
    // 8 bit data to QR-coded 8 bit data (numeric or alphanum, or kanji not supported)
    v = strinbuf.length;

    // string to array
    for (i = 0; i < v; i++) {
      eccbuf[i] = strinbuf.charCodeAt(i);}
    strinbuf = eccbuf.slice(0);

    // calculate max string length
    x = datablkw * (neccblk1 + neccblk2) + neccblk2;
    if (v >= x - 2) {
      v = x - 2;
      if (version > 9)
      v--;
    }

    // shift and repack to insert length prefix
    i = v;
    if (version > 9) {
      strinbuf[i + 2] = 0;
      strinbuf[i + 3] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 3] |= 255 & t << 4;
        strinbuf[i + 2] = t >> 4;
      }
      strinbuf[2] |= 255 & v << 4;
      strinbuf[1] = v >> 4;
      strinbuf[0] = 0x40 | v >> 12;
    } else
    {
      strinbuf[i + 1] = 0;
      strinbuf[i + 2] = 0;
      while (i--) {
        t = strinbuf[i];
        strinbuf[i + 2] |= 255 & t << 4;
        strinbuf[i + 1] = t >> 4;
      }
      strinbuf[1] |= 255 & v << 4;
      strinbuf[0] = 0x40 | v >> 4;
    }
    // fill to end with pad pattern
    i = v + 3 - (version < 10);
    while (i < x) {
      strinbuf[i++] = 0xec;
      // buffer has room    if (i == x)      break;
      strinbuf[i++] = 0x11;
    }

    // calculate and append ECC

    // calculate generator polynomial
    genpoly[0] = 1;
    for (i = 0; i < eccblkwid; i++) {
      genpoly[i + 1] = 1;
      for (j = i; j > 0; j--) {
        genpoly[j] = genpoly[j] ?
        genpoly[j - 1] ^ gexp[modnn(glog[genpoly[j]] + i)] : genpoly[j - 1];}
      genpoly[0] = gexp[modnn(glog[genpoly[0]] + i)];
    }
    for (i = 0; i <= eccblkwid; i++) {
      genpoly[i] = glog[genpoly[i]];} // use logs for genpoly[] to save calc step

    // append ecc to data buffer
    k = x;
    y = 0;
    for (i = 0; i < neccblk1; i++) {
      appendrs(y, datablkw, k, eccblkwid);
      y += datablkw;
      k += eccblkwid;
    }
    for (i = 0; i < neccblk2; i++) {
      appendrs(y, datablkw + 1, k, eccblkwid);
      y += datablkw + 1;
      k += eccblkwid;
    }
    // interleave blocks
    y = 0;
    for (i = 0; i < datablkw; i++) {
      for (j = 0; j < neccblk1; j++) {
        eccbuf[y++] = strinbuf[i + j * datablkw];}
      for (j = 0; j < neccblk2; j++) {
        eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];}
    }
    for (j = 0; j < neccblk2; j++) {
      eccbuf[y++] = strinbuf[neccblk1 * datablkw + i + j * (datablkw + 1)];}
    for (i = 0; i < eccblkwid; i++) {
      for (j = 0; j < neccblk1 + neccblk2; j++) {
        eccbuf[y++] = strinbuf[x + i + j * eccblkwid];}}
    strinbuf = eccbuf;

    // pack bits into frame avoiding masked area.
    x = y = width - 1;
    k = v = 1; // up, minus
    /* inteleaved data and ecc codes */
    m = (datablkw + eccblkwid) * (neccblk1 + neccblk2) + neccblk2;
    for (i = 0; i < m; i++) {
      t = strinbuf[i];
      for (j = 0; j < 8; j++, t <<= 1) {
        if (0x80 & t)
        qrframe[x + width * y] = 1;
        do {// find next fill position
          if (v)
          x--;else
          {
            x++;
            if (k) {
              if (y != 0)
              y--;else
              {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y = 9;
                }
              }
            } else
            {
              if (y != width - 1)
              y++;else
              {
                x -= 2;
                k = !k;
                if (x == 6) {
                  x--;
                  y -= 8;
                }
              }
            }
          }
          v = !v;
        } while (ismasked(x, y));
      }
    }

    // save pre-mask copy of frame
    strinbuf = qrframe.slice(0);
    t = 0; // best
    y = 30000; // demerit
    // for instead of while since in original arduino code
    // if an early mask was "good enough" it wouldn't try for a better one
    // since they get more complex and take longer.
    for (k = 0; k < 8; k++) {
      applymask(k); // returns black-white imbalance
      x = badcheck();
      if (x < y) {// current mask better than previous best?
        y = x;
        t = k;
      }
      if (t == 7)
      break; // don't increment i to a void redoing mask
      qrframe = strinbuf.slice(0); // reset for next pass
    }
    if (t != k) // redo best mask - none good enough, last wasn't t
      applymask(t);

    // add in final mask/ecclevel bytes
    y = fmtword[t + (ecclevel - 1 << 3)];
    // low byte
    for (k = 0; k < 8; k++, y >>= 1) {
      if (y & 1) {
        qrframe[width - 1 - k + width * 8] = 1;
        if (k < 6)
        qrframe[8 + width * k] = 1;else

        qrframe[8 + width * (k + 1)] = 1;
      }}
    // high byte
    for (k = 0; k < 7; k++, y >>= 1) {
      if (y & 1) {
        qrframe[8 + width * (width - 7 + k)] = 1;
        if (k)
        qrframe[6 - k + width * 8] = 1;else

        qrframe[7 + width * 8] = 1;
      }}

    // return image
    return qrframe;
  }

  var _canvas = null,
  _size = null;

  var api = {

    get ecclevel() {
      return ecclevel;
    },

    set ecclevel(val) {
      ecclevel = val;
    },

    get size() {
      return _size;
    },

    set size(val) {
      _size = val;
    },

    get canvas() {
      return _canvas;
    },

    set canvas(el) {
      _canvas = el;
    },

    getFrame: function getFrame(string) {
      return genframe(string);
    },

    draw: function draw(string, canvas, size, ecc) {

      ecclevel = ecc || ecclevel;
      canvas = canvas || _canvas;

      if (!canvas) {
        console.warn('No canvas provided to draw QR code in!');
        return;
      }

      size = size || _size || Math.min(canvas.width, canvas.height);

      var frame = genframe(string),
      ctx = canvas.ctx,
      px = Math.round(size / (width + 8));

      var roundedSize = px * (width + 8),
      offset = Math.floor((size - roundedSize) / 2);

      size = roundedSize;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setFillStyle('#000000');

      for (var i = 0; i < width; i++) {
        for (var j = 0; j < width; j++) {
          if (frame[j * width + i]) {
            ctx.fillRect(px * (4 + i) + offset, px * (4 + j) + offset, px, px);
          }
        }
      }
      ctx.draw();
    } };


  module.exports = {
    api: api };


}();

/***/ }),

/***/ 18:
/*!***********************************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/wxcomponents/vant-weapp/dialog/dialog.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

var queue = [];

function getContext() {
  var pages = getCurrentPages();
  return pages[pages.length - 1];
}

var Dialog = function Dialog(options) {
  options = _extends({}, Dialog.currentOptions, options);
  return new Promise(function (resolve, reject) {
    var context = options.context || getContext();
    var dialog = context.selectComponent(options.selector);
    delete options.selector;

    if (dialog) {
      dialog.set(_extends({
        onCancel: reject,
        onConfirm: resolve },
      options));
      queue.push(dialog);
    } else {
      console.warn('未找到 van-dialog 节点，请确认 selector 及 context 是否正确');
    }
  });
};

Dialog.defaultOptions = {
  show: true,
  title: '',
  message: '',
  zIndex: 100,
  overlay: true,
  asyncClose: false,
  messageAlign: '',
  transition: 'scale',
  selector: '#van-dialog',
  confirmButtonText: '确认',
  cancelButtonText: '取消',
  showConfirmButton: true,
  showCancelButton: false,
  closeOnClickOverlay: false,
  confirmButtonOpenType: '' };

Dialog.alert = Dialog;

Dialog.confirm = function (options) {
  return Dialog(_extends({
    showCancelButton: true },
  options));
};

Dialog.close = function () {
  queue.forEach(function (dialog) {
    dialog.close();
  });
  queue = [];
};

Dialog.stopLoading = function () {
  queue.forEach(function (dialog) {
    dialog.stopLoading();
  });
};

Dialog.setDefaultOptions = function (options) {
  Object.assign(Dialog.currentOptions, options);
};

Dialog.resetDefaultOptions = function () {
  Dialog.currentOptions = _extends({}, Dialog.defaultOptions);
};

Dialog.resetDefaultOptions();var _default =
Dialog;exports.default = _default;

/***/ }),

/***/ 19:
/*!**********************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages/login/images/head.png ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 20:
/*!***************************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages/login/images/icon_user.png ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 21:
/*!**************************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages/login/images/icon_pwd.png ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAiCAYAAABMfblJAAACQklEQVRYR+2WwWsTURDGv9lUkjbZpdWLCgVP6kEPpSLYgoiEbA9WT568iLbm5ST6hyie8mIqePDmSRTtxiIiaEEsCiLoTVBsQNSym9BEkx3ZpbFNsptmt6ZQyF7fzPxmvve9t4/Q4UuK8piCehqg0wAOELDLK5yBPwA+A/wsgkjuiYy/9StLXgsnzn8Z1PYM32LGDBE8Y/wKMoOJMGf+WLm6eH90tTWurZgDU3cPzxPhJIAKGJIV5d7v1aEPz+9SxQs0eem7Go8OHQTXLxAoAyDGjBfWz5WpVmgbUBdmHqAZML7adm36aX7kXSfZW9dSwjpCoMcAjwI8Z0htdmNMEzB5+deYMjCwRIRq3abjC7cT74PAGrHJK6WjEYVfMyNq12rjC3dG/u1pE1BPW1kQBINuFmTiehhYIyclzBsEugaCNLKqI7P7NQOF9RHAISblWCEbX9oSMFMeJ7bfAPhkSPWwD7BUATharSQG/QzSbROnLnIsGis5Lq0aUo35TcjOgiHVQEfBrwldWG31WiXtA7vdQjfOU9KpTPkss50DsDdQteDBRSIlTbqwlrcB1miv6ABdo3CdJwt57VXwxjfPSM2aExShl+7B99J58xLBIxqcPjC4dj4ZO0vSMEbb0oR9oJdvQkuaEuYZAj10byfwdEFqj7qxcmigLqxvAPatvVCWDZnY32vgxsu+aEh1Dd4ZG37CtHkORNItzyyMnPagpxN2U/y/mmbnAol5Yj6nLYadoFNe6w94m58Y667r+SPKcfVfmtVWedJzenUAAAAASUVORK5CYII="

/***/ }),

/***/ 22:
/*!*********************************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages/login/images/icon_pwd_switch.png ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAQCAYAAACRKbYdAAADEUlEQVRIS72VTWgTQRTH/2/WJJhKVajGUwXxi9JDlSqh1ZlsxCLBgohG8CR4sSdFBb140VMR/AT1JF6tF7GlihW3s9pSNPjZg6gHT2r8KBJc22ozT0a2YmvbxI92L8vOzHv/3/zf2xlC+LS1tTnV1dUVyWSyMDo2U++Ojo75QogvmUxm2GrSqLDW+jKAzcaYRtd1H80UkNZ6FQAfQI9SatN4qOMADgJ4YYxZ67rup+kG8zxvnhDiHoBlAE4rpfaNgers7IxVVFTcAbAGgC4UCpnm5uYv0wXW3t4er6ysvA5AMnOuqqqqsba29usYKPsRWnkfgGM/jTFbpsOx0KGrABSAV8PDw41NTU2vRw342VN9fX2JoaEhTUQrANiGiwF4XiwWs+l0+vH/cszzvDohhO3f5WHOASLaKqXUY6A8z6sSQngAagE8NMZkHce5xMyNFpCIWuPxeGt9ff1flzOXy8WDIDgC4ACACIAHAG6Hffy5WCxuSqfTPT/K19XVNTcajVog+xf0G2Nc13U/5HK5SBAEx8IkswC8BXCKiC5KKd+X65zv+wuYeTeAvQAWATAAzgZBcMgeAVrrU+FcgYg2SinvkdY6C8Da+SwWi6WSyWT+V0HbZ8x8gohS4fg3ZrZlvkVEOWZ+HolEPjQ0NAz29vbOHhwcXOg4Tg0RrWbmFBHZvrHO2KfXGHPAdd2+XzV83z/HzC0A3imlEtTf3x8dGBjYGY1Gr48HGg30fX8PM5+3QQDmAIiX6xQz2/KLH2UhWiylfDM+lpnJ9/2jFl4pdfhno08mYk/6RCLxDMBSY8x2ADccx9lgjFFEVMfMS6xYGB8A+AjgJYAnRHRXCHFzZGTkDBHtAtBqRUttqCSU53nbhBBXrFA+n1+ZzWaL45NqrdmOKaUmzOf7fg0zPwVQCIJgcSaTmfIqKwmltb4FYAMRtUgpL0y0y1JQNqa7u/saETUz8/5UKnVyKrfKgbJXz3pjzA7XdYf+AcreFF1CiMOTbe63w7NUnaeaL8epP8lf0qlykmmte4iIpZTryllfas13WjtHIMMYSJIAAAAASUVORK5CYII="

/***/ }),

/***/ 224:
/*!************************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/components/lb-picker/utils.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.isArray = isArray;exports.getIndicatorHeight = getIndicatorHeight;function isArray(val) {
  return Object.prototype.toString.call(val) === '[object Array]';
}

function getIndicatorHeight() {
  return Math.round(uni.getSystemInfoSync().screenWidth / (750 / 100));
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 23:
/*!********************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages/login/images/qq.png ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 24:
/*!************************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages/login/images/wechat.png ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 25:
/*!***********************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages/login/images/weibo.png ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 288:
/*!************************************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/components/uni-icons/icons.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  'contact': "\uE100",
  'person': "\uE101",
  'personadd': "\uE102",
  'contact-filled': "\uE130",
  'person-filled': "\uE131",
  'personadd-filled': "\uE132",
  'phone': "\uE200",
  'email': "\uE201",
  'chatbubble': "\uE202",
  'chatboxes': "\uE203",
  'phone-filled': "\uE230",
  'email-filled': "\uE231",
  'chatbubble-filled': "\uE232",
  'chatboxes-filled': "\uE233",
  'weibo': "\uE260",
  'weixin': "\uE261",
  'pengyouquan': "\uE262",
  'chat': "\uE263",
  'qq': "\uE264",
  'videocam': "\uE300",
  'camera': "\uE301",
  'mic': "\uE302",
  'location': "\uE303",
  'mic-filled': "\uE332",
  'speech': "\uE332",
  'location-filled': "\uE333",
  'micoff': "\uE360",
  'image': "\uE363",
  'map': "\uE364",
  'compose': "\uE400",
  'trash': "\uE401",
  'upload': "\uE402",
  'download': "\uE403",
  'close': "\uE404",
  'redo': "\uE405",
  'undo': "\uE406",
  'refresh': "\uE407",
  'star': "\uE408",
  'plus': "\uE409",
  'minus': "\uE410",
  'circle': "\uE411",
  'checkbox': "\uE411",
  'close-filled': "\uE434",
  'clear': "\uE434",
  'refresh-filled': "\uE437",
  'star-filled': "\uE438",
  'plus-filled': "\uE439",
  'minus-filled': "\uE440",
  'circle-filled': "\uE441",
  'checkbox-filled': "\uE442",
  'closeempty': "\uE460",
  'refreshempty': "\uE461",
  'reload': "\uE462",
  'starhalf': "\uE463",
  'spinner': "\uE464",
  'spinner-cycle': "\uE465",
  'search': "\uE466",
  'plusempty': "\uE468",
  'forward': "\uE470",
  'back': "\uE471",
  'left-nav': "\uE471",
  'checkmarkempty': "\uE472",
  'home': "\uE500",
  'navigate': "\uE501",
  'gear': "\uE502",
  'paperplane': "\uE503",
  'info': "\uE504",
  'help': "\uE505",
  'locked': "\uE506",
  'more': "\uE507",
  'flag': "\uE508",
  'home-filled': "\uE530",
  'gear-filled': "\uE532",
  'info-filled': "\uE534",
  'help-filled': "\uE535",
  'more-filled': "\uE537",
  'settings': "\uE560",
  'list': "\uE562",
  'bars': "\uE563",
  'loop': "\uE565",
  'paperclip': "\uE567",
  'eye': "\uE568",
  'arrowup': "\uE580",
  'arrowdown': "\uE581",
  'arrowleft': "\uE582",
  'arrowright': "\uE583",
  'arrowthinup': "\uE584",
  'arrowthindown': "\uE585",
  'arrowthinleft': "\uE586",
  'arrowthinright': "\uE587",
  'pulldown': "\uE588",
  'closefill': "\uE589",
  'sound': "\uE590",
  'scan': "\uE612" };exports.default = _default;

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 4:
/*!*****************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/pages.json ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ 8:
/*!*********************************************************!*\
  !*** D:/桌面/空气检测/clone/airDetection/7_24/common/help.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var userImageurl = "1";
var phoneNum = "";
var code = "";
var sessionId = "";
var url = "http://2r2jch.natappfree.cc";var _default =
{
  userImageurl: userImageurl,
  phoneNum: phoneNum,
  code: code,
  sessionId: sessionId,
  url: url };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map