// AUTHOR：YANGSHAOTONG
//  URL相关辅助函数


import { isDate, isPlainObject } from './util' // 导入通用方法

function encode(val: string): string {
    return encodeURIComponent(val)  // 把编码后的URL中的特殊字符转换回来
        .replace(/%40/g, '@')  // g表示全文查找
        .replace(/%3A/ig, ':') // ig表示全文查找，忽略大小写
        .replace(/%24/g, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/%5D/ig, ']')
}


/* 拼接思路：
1.判断是否有params，有拼接，没有直接返回
2.获取params的键值对应值
3.params的不一定是数组，将其规范会成数组，方便遍历操作
    1）遍历中判断是否为日期、对象，日期toISOString()标准化格式，对象转换成JSON字符串
    2）存成键值对
4.对键值对数组用&分隔，分隔后拼接
5.拼接时需要对原有url进行判断
    1）url有hash，舍去hash部分
    2）url带有参数，后拼接‘&’，再拼接分隔后的键值对数组；若不带参数，后拼接‘？’，再拼接分隔后的键值对数组
6.拼接完成返回url
*/

export function buildURL(url: string, params?: any):string {  // 完成URL和params拼接
    if (!params) { // 判断params
        return url  // 没有params 直接返回url
    }

    //  遍历params
    const parts: string[] = []   // 键值对数组

    Object.keys(params).forEach((key) => {  // params是对象，通过Object.keys().forEach()获取key
        console.log(`params中键：${key}`)  // key是键
        const val = params[key]  // 获取key值

        if (val === null || typeof val === 'undefined') { // key为空
            return  //  不用加入键值对数组，这里的return只能跳出本次循环，进行下一次循环
        }

        //  val不为空，val可能为数组，也可能不是数组，下面将其规范化成数组
        let values = []  // 临时数组，用于规范化val
        if (Array.isArray(val)) {
            values = val
            key += '[]'  // 把key拼接成带有‘[]’的形式，表示数组
        } else {
            values = [val]  // 规范成数组
        }

        // 规范成数组之后，遍历获取值
        values.forEach((val) => {
            if (isDate(val)) {  // 通过导入方法，判断是否为日期
                val = val.toISOString()  // 使用 ISO 标准返回 Date 对象的字符串格式:2019-12-28T07:50:52.541Z
            } else if (isPlainObject(val)) {  // 通过导入方法，判断是否为对象
                val = JSON.stringify(val)  //  是对象，转化为json字符串
            }

            parts.push(`${encode(key)}=${encode(val)}`)  // 拼接成键值对并保存
        })
    })
    // url和键值对‘&’连接
    let serializedParams = parts.join('&')
    console.log(`params中分隔后的键值对：${serializedParams}`)
    if (serializedParams) {  // 不为空，判断url的几种特殊情况
        const markIndex = url.indexOf('#')  // 是否已拼接hash，未找到返回-1
        if (markIndex !== -1) {
            url = url.slice(0, markIndex)  // 拼接的hash去掉，截取
        }

        // 判断url是否已拼接参数，已拼接加&，未拼接加？
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
    return url
}