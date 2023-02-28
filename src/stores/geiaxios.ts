import axios from 'axios'

async function getres(userinfo: any, url: string) {
  const p = await axios({
    method: 'get',
    url: 'http://127.0.0.1' + url,
    data: {
      userinfo
    },
    headers: {
      Authorization: window.localStorage.token
    }
  }).then((response) => {
    return response
  })
  console.log('get方法被调用了')
  return await p.data
}

async function postres(userinfo: any, url: string) {
  const p = await axios({
    method: 'post',
    url: 'http://127.0.0.1' + url,
    data: {
      ...userinfo
    },
    headers: {
      Authorization: window.localStorage.token
    }
  }).then((response) => {
    return response
  })
  return await p.data
}

export default {
  getres,
  postres
}
