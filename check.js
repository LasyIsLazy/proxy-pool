const axios = require('axios')
const TIME_OUT = 3000
/**
 *
 * @param {string} host 域名
 * @param {number}} port 端口
 * @returns {number} 收到响应所需时长（ms）
 */
function check(host = '', port = 0) {
  let proxy
  if (host && port) {
    proxy = {
      host,
      port
    }
  }

  if (!host || !port) {
    return 0
  }
  const source = axios.CancelToken.source()
  return new Promise(resolve => {
    if (TIME_OUT) {
      setTimeout(() => {
        source.cancel(`Timeout of ${TIME_OUT} ms`)
        resolve(-1)
      }, TIME_OUT)
    }
    const time = Date.now()
    axios({
      url: 'https://www.baidu.com',
      timeout: 1000,
      cancelToken: source.token,
      proxy
    })
      .then(function(response) {
        resolve(Date.now() - time)
      })
      .catch(function(error) {
        console.log(error)
      })
  })
}

// check('39.106.114.143', 80).then(time => {
//   console.log(time)
// })

module.exports = {
  check
}
