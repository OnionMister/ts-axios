// AUTHOR：YANGSHAOTONG
// 实例3
import axios, { AxiosError } from '../../src/index'


axios({
    method: 'get',
    url: '/error/get1'  // 故意写错路由地址  404错误
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)   // 捕获 错误
})

axios({   //  有几率出现结果，有几率500错误
    method: 'get',
    url: '/error/get'
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})


setTimeout(() => {   // 延时5s请求，模拟网络错误
    axios({
        method: 'get',
        url: '/error/get'
    }).then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
}, 5000)

axios({   // 超时时间2s
    method: 'get',
    url: '/error/timeout',
    timeout: 2000
}).then((res) => {
    console.log(res)
}).catch((e:AxiosError) => {
    console.log(e.config)
    console.log(e.code)
    console.log(e.request)
    console.log(e.isAxiosError)
})