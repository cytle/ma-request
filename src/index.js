import { isString, isPlainObject, assign, isFunction } from 'lodash';

let transOptions = (arg1, arg2) => {
  if (arg2 && !isPlainObject(arg2)) {
    throw new Error(`arg2 ${arg2} is not a plain object`);
  }
  let options;
  if (isString(arg1)) {
    options = {
      url: arg1,
    };
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

export function setGlobalOptionsHandler(handler) {
  if (!isFunction(handler)) {
    throw new Error(`handler ${handler} is not a function`);
  }
  const oldHandler = transOptions;
  transOptions = (arg1, arg2) => handler(oldHandler(arg1, arg2));
}

let successHandler = res => Promise.resolve(res.data);
export function setGlobalSuccessHandler(handler) {
  if (!isFunction(handler)) {
    throw new Error(`handler ${handler} is not a function`);
  }
  const oldHandler = successHandler;
  successHandler = res => handler(oldHandler(res));
}

let failHandler = res => Promise.reject(res);
export function setGlobalFailHandler(handler) {
  if (!isFunction(handler)) {
    throw new Error(`handler ${handler} is not a function`);
  }
  const oldHandler = failHandler;
  failHandler = res => handler(oldHandler(res));
}

const request = (arg1, arg2) => new Promise(resolve =>
  wx.request(assign(
    {},
    transOptions(arg1, arg2),
    {
      success: res => resolve(successHandler(res)),
      fail: res => resolve(failHandler(res)),
    },
  )));

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
