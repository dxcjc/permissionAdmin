const express = require('express')
const eventLogDao = require('../dao/eventLogDao')
const router = express.Router()
const jwt = require('jsonwebtoken');
const queue = require('../utils/queue')


router.use(function (req, res, next) {
  if (req.headers.hasOwnProperty('authorization')) {
    jwt.verify(req.headers.authorization, 'secret12345', function (err) {
      if (err) {
        res.json({
          status: 401,
          message: 'token不存在或已过期'
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

router.use(async (req, resp, nuxt) => {
  let eventLog = []
  let token
  let roles
  setInfo(req, eventLog)
  // 2.存到数据库
  let {info} = await eventLogDao.save(eventLog)
  if (req.url !== '/user/login') {
    if (req.headers.hasOwnProperty('authorization')) {
      token = jwt.verify(req.headers.authorization, 'secret12345')
      roles = token.roles
    }
  }


  queue.push({roles,url: eventLog[1], data: JSON.parse(eventLog[3]), resp, id: info.insertId})
})

function setInfo(req, eventLog) {
  // 1.重token拿username.  请求路径( path) date ip  data status
  if (req.url === '/user/login') {
    eventLog.push(req.body.username)
  } else if (req.headers.hasOwnProperty('authorization')) {
    let {name} = jwt.verify(req.headers.authorization, 'secret12345')
    eventLog.push(name)
  }

  let url = req.url.split('?')
  eventLog.push(url[0])
  // console.log(new Date());
  eventLog.push(new Date())

  if (req.method === 'POST') {
    eventLog.push(JSON.stringify(req.body))
  } else {
    eventLog.push(JSON.stringify(req.query))
  }

  eventLog.push(0)
}

module.exports = router
