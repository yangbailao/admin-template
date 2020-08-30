import md5 from 'js-md5'
/*
 * @Author: chenjun
 * @Date:   2017-12-28 17:09:21
 * @Last Modified by:   0easy-23
 * @Last Modified time: 2017-12-29 10:09:23
 * 签名生成
 * kAppKey,kAppSecret为常量，
 * params，传入的参数，string || object
 * 需要借助md5.js
 * 规则：将所有参数字段按首字母排序， 拼接成key1 = value1 & key2 = value2的格式，再在末尾拼接上key = appSecret， 再做MD5加密生成sign
 */

export function getSign(params) {
  // console.log(JSON.stringify(params))
  const AppSecret = 'ys@e3DBSm9mp%#Fsd6nsjp;t347dgfS#'
  let content
  if (typeof params === 'string') {
    content = params
  } else if (typeof params === 'object') {
    var arr = []
    for (var i in params) {
      arr.push(i + '=' + params[i])
    }
    content = arr.join('&')
  }
  const url = content
  const urlStr = url.split('&').sort().join('&')
  const newUrl = urlStr + '&key=' + AppSecret
  // console.log(newUrl)
  //   const md5str = md5(newUrl)
  //   return newUrl
  return md5(newUrl)
}
