import isString from 'lodash.isstring';
import isPlainObject from 'lodash.isplainobject';
import assign from 'lodash.assign';

function transOptions(arg1, arg2) {
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
}

const request = (arg1, arg2) => new Promise((resolve, reject) =>
  wx.request(assign(
    {},
    transOptions(arg1, arg2),
    {
      success: resolve,
      fail: reject,
    },
  )));

const requestMethod = method => (arg1, arg2) => request(assign(transOptions(arg1, arg2), { method }));

request.get = request;
request.options = requestMethod('OPTIONS');
request.head = requestMethod('HEAD');
request.post = requestMethod('POST');
request.put = requestMethod('PUT');
request.delete = requestMethod('DELETE');
request.trace = requestMethod('TRACE');
request.connect = requestMethod('CONNECT');

export default request;
