'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign2 = require('lodash/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _isPlainObject2 = require('lodash/isPlainObject');

var _isPlainObject3 = _interopRequireDefault(_isPlainObject2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transOptions(arg1, arg2) {
  if (arg2 && !(0, _isPlainObject3.default)(arg2)) {
    throw new Error('arg2 ' + arg2 + ' is not a plain object');
  }
  var options = void 0;
  if ((0, _isString3.default)(arg1)) {
    options = {
      url: arg1
    };
  } else if ((0, _isPlainObject3.default)(arg1)) {
    options = arg1;
  } else {
    throw new Error('arg1 ' + arg1 + ' is not a plain object or a string');
  }
  if (arg2) {
    (0, _assign3.default)(options, arg2);
  }
  return options;
}

var request = function request(arg1, arg2) {
  return new Promise(function (resolve, reject) {
    return wx.request((0, _assign3.default)({}, transOptions(arg1, arg2), {
      success: resolve,
      fail: reject
    }));
  });
};

var requestMethod = function requestMethod(method) {
  return function (arg1, arg2) {
    return request((0, _assign3.default)(transOptions(arg1, arg2), { method: method }));
  };
};

request.get = request;
request.options = requestMethod('OPTIONS');
request.head = requestMethod('HEAD');
request.post = requestMethod('POST');
request.put = requestMethod('PUT');
request.delete = requestMethod('DELETE');
request.trace = requestMethod('TRACE');
request.connect = requestMethod('CONNECT');

exports.default = request;