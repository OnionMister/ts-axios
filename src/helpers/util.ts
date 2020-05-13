// AUTHOR：YANGSHAOTONG
// 通用操作

// 后续类型鉴别直接使用toString
const toString = Object.prototype.toString  // 类型校验前缀一般都为Object.prototype.toString，做一个统一缓存


export function isDate(val: any): val is Date {  // 高级类型--类型保护，使用类型谓词，保证调用时系统推断可清楚的知道参数为什么类型
    return toString.call(val) === '[object Date]'// 判断是否为日期类型
}

// export function isObject(val: any): val is Object { // 高级类型--类型保护，使用类型谓词，保证调用时系统推断可清楚的知道参数为什么类型
//     return val !== null && typeof val === 'object' // 判断是对象类型
// }

export function isPlainObject(val:any):val is Object{ // 高级类型--类型保护，使用类型谓词，保证调用时系统推断可清楚的知道参数为什么类型
return toString.call(val)==='[object Object]'   // 判断是 普通 对象
}