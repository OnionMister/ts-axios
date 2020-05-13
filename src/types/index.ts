// AUTHOR：YANGSHAOTONG
// //定义合法数据类型，用于用户传输数据约束  --  字符串自变量类型
export type Method = 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
// 公共类型 定义文件
export interface AxiosRequestConfig {  // export 用于外部导出
    url: string
    method?: Method  // 不传 默认为get请求；Method类型定义了合法数据的种类，对传输入数据进行约束
    data?: any  // post用，类型不定
    params?: any  // 请求参数
    headers?: any // 给予请求数据标准，防止服务端无法解析
    responseType?:XMLHttpRequestResponseType   // 响应类型
    timeout?:number  // 处理超时
}

export interface AxiosResponse {  // 响应
    data: any  // 响应数据
    status: number  // 响应状态码
    statusText: string  // 响应状态描述
    headers:any // 响应头
    config:AxiosRequestConfig  // 请求配置
    request:any   // XHttpRequest实例相应类型
}

// 定义axios 返回类型，promise 对象
export interface AxiosPromise extends Promise<AxiosResponse>{

}

// Error扩展接口
export interface AxiosError extends Error{
    isAxiosError:boolean
    config:AxiosRequestConfig,
    code?:string|null
    request?:any
    response?:AxiosResponse
}