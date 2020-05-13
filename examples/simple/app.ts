// AUTHOR：YANGSHAOTONG
// 实例1
import axios from '../../src/index'  // 导入请求方法

axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})