const axios = require('axios')
const { parse } = require('node-html-parser')

const url = 'http://www.data5u.com/'

async function craw() {
  const { data } = await axios({
    url,
    headers: {
      Accept: 'text/html',
      Host: 'www.data5u.com'
    }
  })
  const result = []
  const lines = parse(data).querySelectorAll('.wlist ul .l2')

  lines.forEach(line => {
    const eles = line.childNodes
    result.push({
      ip: eles[1].text,
      port: parseInt(eles[3].text),
      type: eles[7].text
    })
  })
  return result
}

module.exports = {
  craw,
  url
}
