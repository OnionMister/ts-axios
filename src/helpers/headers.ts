// AUTHOR：YANGSHAOTONG
// 请求头处理，防止服务端无法正常解析数据
// 响应头 从字符串转换成对象

import { isPlainObject } from './util'  // 导入 普通对象 判断方法
import { parse } from 'path'

function normalizeHeaderName(headers: any, normalizedName: string): void {  // headers属性大小写不敏感，统一规范会
    if (!headers) {
        return
    }
    Object.keys(headers).forEach((name) => {  // headers是对象，通过key遍历，获取name
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            // 名字本身不想等，然后两者全转换成大写后相等，说明是大小写不敏感的两个相等属性名
            headers[normalizedName] = headers[name]  // 首字母小写的content-type赋给大写的
            delete headers[name]  // 把小写的从headers里删除
        }
    })
}


export function processHeaders(headers: any, data: any): any {  // 需要判断data是不是普通对象，从而进行相应处理
    normalizeHeaderName(headers, 'Content-Type')  // 大小是不敏感，对配置规范化
    if (isPlainObject(data)) {  // 数据是 普通对象
        if (headers && !headers['Content-Type']) {  // 判断headers未配置Content-Type（大小写不敏感）
            headers['Content-Type'] = 'application/json;charset=utf-8'  // 给请求数据标准，防止服务端无法解析
        }
    }
    return headers
}

// 响应中headers是一个字符串，用去来不方便，所以将其转化成 对象格式
// header字符串特点 ：每隔属性之间用\r\n分隔，形如：
/** 
 * date: Fri, 05 Apr 2019 12:40:49 GMT
 * etag: W/"d-Ssxx4FRxEutDLwo2+xkkxKc4y0k"
 * connection: keep-alive
 * x-powered-by: Express
 * content-length: 13
 * content-type: application/json; charset=utf-8
 */
export function parseHeaders(headers: string): any {
    let parsed = Object.create(null)  // 创建空对象
    if (!headers) {
        return parsed  // 如果headers是个空字符串，则直接返回空对象
    }

    // headers字符串按照“\r\n”分隔成字符串数组
    headers.split('\r\n').forEach((line) => {  // 遍历获得 每一行的数据
        let [key,val]=line.split(':')  // 根据特点，解构赋值
        key=key.trim().toLowerCase()  // 对key操作，收尾去空格，全小写 
        if(!key){
            return  // 空key跳到 下一次循环
        }
        if(val){
            val=val.trim()  // val不空，收尾去空格
        }
        parsed[key]=val   // 赋值给 对象  
    })
    return parsed
}