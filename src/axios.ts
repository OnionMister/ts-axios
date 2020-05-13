// AUTHOR：YANGSHAOTONG
//  为了将方法导入到外部文件

// 将方法 全部写于此处，然后 index.ts中统一导出一次


import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'  // 导入自定义的config类型
import xhr from './xhr'   // 导入请求逻辑方法
import { buildURL } from './helpers/url'  // 导入url处理方法(拼接url和params)
import { transformRequest, transfromResponse } from './helpers/data'  // 导入对data的处理方法（转为JSON字符串）
import { processHeaders } from './helpers/headers'  // 导入对headers的处理方法（Content-type属性配置）

function axios(config: AxiosRequestConfig): AxiosPromise {  // config默认为any类型，报错，所以自定义类型
   console.log(config)
    processConfig(config)// url存于config，使用config之前对其进行处理
    return xhr(config).then((res) => {
        return transformResponseData(res)  // 对响应DATA做处理，字符串转JSON对象
    })  // 调用请求方法
}
function processConfig(config: AxiosRequestConfig): void {  // 对请求参数做处理
    config.url = transformURL(config)  // 对url进行处理，拼接params参数
    config.headers = transfromHeaders(config)  // 处理对象前，先对请求头进行处理，规范请求数据格式
    config.data = transfromRequestData(config)  // 对data进行处理，普通对象转换成JSON字符串
}

function transformURL(config: AxiosRequestConfig): string {// 对url进行处理，拼接params参数
    const { url, params } = config  // 从config中解构赋值出 url，params
    return buildURL(url, params)  // 拼接url params
}

function transfromRequestData(config: AxiosRequestConfig): any {  // 对请求data进行处理
    return transformRequest(config.data)  // data转换为JSON字符串
}


function transfromHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config  // 赋值解构
    return processHeaders(headers, data)
}


function transformResponseData(res: AxiosResponse): AxiosResponse {  // 转化成JSON对象
    res.data = transfromResponse(res.data) // 转化成JSON对象
    return res
}

export default axios  // 导出