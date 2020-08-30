import request from '@/utils/request'

export function getInfo(data) {
  return request({
    url: 'api/Admin/info',
    method: 'post',
    data
  })
}

export function logout(data) {
  return request({
    url: 'api/Admin/logout',
    method: 'post',
    data
  })
}

export function getMenu(data) {
  return request({
    url: 'api/permission/getMenu',
    method: 'post',
    data
  })
}

export function editPassword(data) {
  return request({
    url: 'api/Admin/editPassword',
    method: 'post',
    data
  })
}
