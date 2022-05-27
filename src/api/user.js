import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/userLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/userGetUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/userLogout',
    method: 'post'
  })
}
// 验证码
export function getCodeImg(params = {}) {
  return request('/userCaptcha', 'get', params, false)
}

export function register(data) {
  return request({
    url: '/userRegister',
    method: 'post',
    data
  })
}

// 个人信息模块
export function getData(data) {
  return request({
    url: '/user/querFindAll',
    method: 'get',
    params: { ...data }
  })
}
export function userUpdate(data) {
  return request({
    url: '/user/UpdateUser',
    method: 'post',
    data
  })
}
export function findPeple(data) {
  return request({
    url: '/electron/findPeple',
    method: 'get',
    params: { ...data }
  })
}

export function statusChange(data) {
  return request({
    url: '/users/statusChange',
    method: 'get',
    params: { ...data }
  })
}
export function passwordChange(data) {
  return request({
    url: '/users/passwordChange',
    method: 'post',
    data
  })
}
export function peopleFind(data) {
  return request({
    url: '/users/findPeople',
    method: 'get',
    params: { ...data }
  })
}
export function changeImg(data) {
  return request({
    url: '/users/changeImg',
    method: 'post',
    data
  })
}
export function updatePeople(data) {
  return request({
    url: '/users/updatePeople',
    method: 'post',
    data
  })
}

// 疾病
export function findDiease(data) {
  return request({
    url: '/user/findDiease',
    method: 'get',
    params: { ...data }
  })
}

export function saveOrUpdateDiease(data) {
  return request({
    url: '/historyDiease/saveOrUpdateDiease',
    method: 'post',
    data
  })
}

// 生活
export function findLife(data) {
  return request({
    url: '/user/queryLife',
    method: 'get',
    params: { ...data }
  })
}
export function saveOrUpdateLife(data) {
  return request({
    url: '/life/saveOrUpdateLife',
    method: 'post',
    data
  })
}
// 预约
export function findAppoint(data) {
  return request({
    url: '/user/userappoint',
    method: 'get',
    params: { ...data }
  })
}
export function findDoctor(data) {
  return request({
    url: '/user/findDoctor',
    method: 'get',
    params: { ...data }
  })
}
export function saveAppoint(data) {
  return request({
    url: '/user/saveAppoint',
    method: 'post',
    data
  })
}
export function panAppoint(data) {
  return request({
    url: '/user/panAppoint',
    method: 'get',
    params: { ...data }
  })
}

export function updateStatusAppoint(data) {
  return request({
    url: '/user/updateStatusAppoint',
    method: 'post',
    data
  })
}

export function queryDoctor(data) {
  return request({
    url: '/user/queryDoctor',
    method: 'get',
    params: { ...data }
  })
}

// 文章
export function queryArticle(data) {
  return request({
    url: '/user/queryArticle',
    method: 'get',
    params: { ...data }
  })
}

export function queryDetail(data) {
  return request({
    url: '/user/detailsArticle',
    method: 'get',
    params: { ...data }
  })
}

export function updateCount(data) {
  return request({
    url: '/user/updateCount',
    method: 'post',
    data
  })
}
// 运动
export function findSport(data) {
  return request({
    url: '/user/findSport',
    method: 'get',
    params: { ...data }
  })
}
export function foryouSport(data) {
  return request({
    url: '/user/foryouSport',
    method: 'get',
    params: { ...data }
  })
}
// 食物
export function findFood(data) {
  return request({
    url: '/user/findFood',
    method: 'get',
    params: { ...data }
  })
}
export function foryouFood(data) {
  return request({
    url: '/user/foryouFood',
    method: 'get',
    params: { ...data }
  })
}
// 家族病史
export function familyDiease(data) {
  return request({
    url: '/user/familyDiease',
    method: 'get',
    params: { ...data }
  })
}

export function saveFamily(data) {
  return request({
    url: '/user/saveFamily',
    method: 'post',
    data
  })
}
