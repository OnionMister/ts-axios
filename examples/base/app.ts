// AUTHOR：YANGSHAOTONG
// 实例2
import axios from '../../src/index'

axios({   // 最终请求的 url 是 /base/get?a=1&b=2
  method: 'get',
  url: '/base/get',
  params: {
    a: 1,
    b: 2
  }
})

// 参数值是数组：
axios({  // 最终请求的 url 是/base/get?foo[]=bar&foo[]=baz'
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// 参数值是对象
axios({  // 最终请求的 url 是/base/get?foo=%7B%22bar%22:%22baz%22%7D
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// 参数值是Date类型:
const date = new Date()
axios({  // 最终请求的 url 是/base/get?date=2019-12-28T09:12:23.213Z
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// 特殊字符支持:
axios({  // 最终请求的 url 是 /base/get?foo=@:$+
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// 空值忽略:
axios({  // 最终请求的 url是 /base/get?foo=bar
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

// 丢弃 url 中的哈希标记:
axios({  // 最终请求的 url 是 /base/get?foo=bar
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar',
    baz: '11'
  }
})

axios({   // post 发送数据
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
})



const arr = new Int32Array([21, 32])
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
})


axios({  // 带有headers配置的请求
  method:'post',
  url:'/base/post',
  headers:{
    'content-type':'application/json',
    'Accept':'application/json,text/plain,*/*'
  },
  data:{
    a:111,
    b:222
  }
})

const paramsString='q=URLUtils.searchParams&topic=api'
const searchParams=new URLSearchParams(paramsString)

axios({
  method:'post',
  url:'/base/post',
  data:searchParams
})


axios({  // 带有headers配置的请求,输出返回数据
  method:'post',
  url:'/base/post',
  headers:{
    'content-type':'application/json',
    'Accept':'application/json,text/plain,*/*'
  },
  data:{
    a:111,
    b:222
  }
}).then((res)=>{
  console.log(res)
})


axios({  // 没有配置，输出返回数据
  method:'post',
  url:'http://switch.tutestudio.net/ajax?userid=sa&pwd=111',
  data:{
    a:111,
    b:222
  }
}).then((res)=>{
  console.log(res)
})


axios({  // 有响应类型的,输出返回数据
  method:'post',
  url:'/base/post',
  responseType:'json',
  data:{
    a:111,
    b:222
  }
}).then((res)=>{
  console.log(res)
})
