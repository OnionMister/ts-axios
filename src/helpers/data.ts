// AUTHOR：YANGSHAOTONG
// 请求对象转化成JSON字符串

// 相应字符串转换成JSON对象


import { isPlainObject } from './util'  // 导入是否为对象判断
export function transformRequest(data: any): any {   // 请求和相应都要对data进行操作
    if (isPlainObject(data)) {  // 是否为普通对象
        return JSON.stringify(data)  // 转化为JSON字符串
    }
    return data
}


export function transfromResponse(data: any): any {   // 响应字符串 转换成 JSON对象
    if (typeof data === 'string') {
        try {  // 响应对象不一定是json字符串
            data = JSON.parse(data)  // 转换成JSON对象
        } catch(e){
            // doNothing
        }
    }
    return data
}