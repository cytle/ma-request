# wxapp-request

小程序请求

## Usage

```js
import request from 'wxapp-request';

// 仅为示例，并非真实的接口地址
request('test.php', {
  method: 'POST', // default GET
  data: {
    x: '',
    y: ''
  },
  headers: {
    'User-Agent': 'Request-Promise'
  },
})
  .then((data) => {
    console.log(data);
  }, (res) => {
    console.log(res);
  });
```
