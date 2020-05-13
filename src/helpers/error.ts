// AUTHOR：YANGSHAOTONG
import { AxiosRequestConfig, AxiosResponse } from '../types'  // 导入

export class AxiosError extends Error {  // 继承Error
    isAxiosError: boolean
    config: AxiosRequestConfig
    code?:string|null
    request?:any
    response?:AxiosResponse

    constructor(message:string,config:AxiosRequestConfig,code?:string|null,request?:any,response?:AxiosResponse){
        super(message)  // 继承父类函数
        this.config=config
        this.code=code
        this.request=request
        this.response=response
        this.isAxiosError=true

        // 继承内置对象，如Error、Map等 有可能调用方法 的情况
        Object.setPrototypeOf(this,AxiosError.prototype) 
    }
}

// 为了方便使用，创建该方法
export function createError(message:string,config:AxiosRequestConfig,code?:string|null,request?:any,response?:AxiosResponse){
    const error=new AxiosError(message,config,code,request,response)
    return error
}