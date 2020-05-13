// AUTHOR：YANGSHAOTONG
// 实现请求逻辑  -- 模块化 单独拆分
// MDN查阅XMLHttpRequest资料

import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'  // 导入请求配置、响应数据返回类型
import { parseHeaders } from './helpers/headers'  // 将响应头 从字符串转换成对象
import { createError} from './helpers/error'  // 导入 Error  方法


export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {  // reject错误响应

        const { data = null, url, method = 'get', headers, responseType, timeout } = config // 解构赋值获得config中的data，url，method，headers

        const request = new XMLHttpRequest()
        if (responseType) {  // 有响应类型
            request.responseType = responseType  // 配置响应类型
        }
        if (timeout) {  // 若有超时时间
            request.timeout = timeout  // 配置超时时间
        }
        request.open(method.toUpperCase(), url, true)  // method必须大写toUpperCase()；第三参数为同步、异步，true异步
        request.onreadystatechange = function handleLoad() {
            if (request.readyState !== 4) {  // 就绪状态码为4代表请求接收到，可拿响应结果
                return
            }
            if (request.status === 0) { // 网络错误和超时错误，状态码 为0
                return
            }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders()) // 获取响应头
            const responseData = responseType !== 'text' ? request.response : request.responseText  // 根据响应类型，到对应属性中获取值
            const response: AxiosResponse = {  // 构造AxiosResponse
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            handleResponse(response) // 通过 then()拿到数据
        }
        request.onerror = function handleError() {  // 网络错误处理
            reject(createError('Network Error',config,null,request))  // 错误拿不到response，所以不传
        }
        request.ontimeout = function handleTimeout() {  // 超时错误处理
            reject(createError(`Timeout of ${timeout}ms exceeded`,config,'ECONNABORTED',request))  // ‘ECONNABORTED’网络请求术语，表示被终止
        }
        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {  // 没有请求数据，头内配置无用
                delete headers[name]  // 删除配置
            } else {
                request.setRequestHeader(name, headers[name])  // 设置请求头
            }
        })
        request.send(data)

        function handleResponse(response: AxiosResponse): void {
            if (response.status >= 200 && response.status < 300) {  // 状态码非200 错误处理
                resolve(response)  // 成功
            }else{
                reject(createError(`Request failed with status code ${response.status}`,config,null,request,response))
            }
        }
    })
}