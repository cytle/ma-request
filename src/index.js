import { isString, isPlainObject, assign, isFunction } from 'lodash';

/**
 * 转换options
 * @param {String|Object} arg1 如果类型是String,表示请求的url,如果是Object表示参数
 * @param {Object} arg2 optional,附加参数
 */
const transOptions = (arg1, arg2) => {
  if (arg2 && !isPlainObject(arg2)) {
    throw new Error(`arg2 ${arg2} is not a plain object`);
  }
  let options;
  if (isString(arg1)) {
    options = { url: arg1 };
  } else if (isPlainObject(arg1)) {
    options = arg1;
  } else {
    throw new Error(`arg1 ${arg1} is not a plain object or a string`);
  }
  if (arg2) {
    assign(options, arg2);
  }
  return options;
};

const globalHooks = {
  success: res => Promise.resolve(res.data),
  fail: res => Promise.reject(res),
  before: res => res,
};

/**
 * 设置全局钩子
 * @param {Object} hooks 钩子
 * @example
 * setGlobalHooks({
 *   before(options) {
 *     // 拦截请求，最后需要返回一个promise
 *   },
 *   success(res, options) {
 *     // 请求成功，可以处理结果，最后需要返回一个promise
 *   },
 *   fail(res, options) {},
 * })
 */
export function setGlobalHooks(hooks) {
  Object
    .keys(hooks)
    .filter(vo => (vo in globalHooks) && isFunction(hooks[vo]))
    .forEach((vo) => {
      globalHooks[vo] = hooks[vo];
    });
}

const promisRequest = options => new Promise((resolve, reject) =>
  wx.request(assign(
    {},
    options,
    {
      success: resolve,
      fail: reject,
    },
  )));

const request = (arg1, arg2) =>
  Promise.resolve(transOptions(arg1, arg2))
    .then(globalHooks.before)
    .then(options =>
      promisRequest(options)
        .then(
          res => globalHooks.success(res, options),
          res => globalHooks.fail(res, options),
        ));

const requestMethod = method =>
  (arg1, arg2) =>
    request(assign(transOptions(arg1, arg2), { method }));

request.get = request;
request.options = requestMethod('OPTIONS');
request.head = requestMethod('HEAD');
request.post = requestMethod('POST');
request.put = requestMethod('PUT');
request.delete = requestMethod('DELETE');
request.trace = requestMethod('TRACE');
request.connect = requestMethod('CONNECT');

export default request;
