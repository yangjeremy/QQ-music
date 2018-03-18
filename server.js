const express = require('express')
const request = require('request-promise')
const app = express()
const cors = require('cors')
// const {PORT = 3000} = process.env

app.use(cors())
 
app.get ('/', async (req, res) => {
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
      try {
          res.json(await request({
              uri: url,
              json: true,
              headers: {
                  'accept': 'application/json',
                  'authority': 'c.y.qq.com',
                  'origin': 'https://m.y.qq.com',
                  'referer': 'https://m.y.qq.com/',
                  'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36'
              }
          }))
          
      } catch (e) {
          res.json({error:e.message})
      }  
})


app.get('/search',async(req, res) => {
    const {keyword, page = 1} = req.query
    const url = `https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+ new Date()}`
    try {
        res.json(await request({
            uri: url,
            json: true,
            headers: {
                'accept': 'application/json',
                'authority': 'c.y.qq.com',
                'origin': 'https://m.y.qq.com',
                'referer': 'https://m.y.qq.com/',
                'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36'
            }
        }))

    } catch (e) {
        res.json({ error: e.message })
    }  
})


app.listen(4000)
// curl 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1513085144958' - H 'origin: https://m.y.qq.com' - H 'accept-encoding: gzip, deflate, br' - H 'accept-language: zh-CN,zh;q=0.9,en;q=0.8' - H 'user-agent: Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Mobile Safari/537.36' - H 'accept: application/json' - H 'referer: https://m.y.qq.com/' - H 'authority: c.y.qq.com' - H 'cookie: pgv_pvi=8806974464; tvfe_boss_uuid=0c2af14c41a015bd; RK=hVPuEKbPG2; pgv_pvid=9554926273; o_cookie=328199005; pac_uid=1_328199005; ptcz=c3147da08493a680bb8a8b1bb39f26d7a8984f594ea1578acbaa5112225b101a; pt2gguin=o0328199005; ts_uid=6145718100; yq_index=0; yqq_stat=0; pgv_si=s6390956032; pgv_info=ssid=s2603815460; qqmusic_fromtag=10; checkmask=3; ts_last=y.qq.com/; ts_refer=ADTAGmyqq' --compressed
// copy url