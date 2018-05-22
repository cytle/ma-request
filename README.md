# ma-request

小程序请求，返回一个`promise`.

## Usage

```js
import request from 'ma-request';

// 基本用法仅为示例，并非真实的接口地址
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

async function demo() {
  const res1 = await request.get({
    url: 'test.php',
  });
  const res2 = await request.get('test.php'); // 等同上面

  // 除get外还有options, head, post, put, delete, trace, connect
  const res3 = await request.post('test.php', {
    data: { x: '' },
  });
}
```
