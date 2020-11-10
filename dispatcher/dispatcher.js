const events = require('../utils/events')
const config = require('../static/routerConfig')
const eventLogDao = require('../dao/eventLogDao')

function dispatcher() {
  events.on('dispatcher', async (item) => {
    try {
      let hasPermission = false
      let a = item.url.split('/')

      for (const c of config) {
        if (c.serverName === a[1] && c.eventName === a[2]) {

          if (c.roles==='ALL') {
            await c.dispatcher(item.data, item.resp)
          } else {
            for (const i in c.roles) {
              if (item.roles.includes(c.roles[i])) hasPermission = true
            }
            hasPermission ? await c.dispatcher(item.data, item.resp) : item.resp.send({code: 500, message: '1权限不足'})
          }

        }
      }
      await eventLogDao.update([item.id])
    } catch (e) {
      console.log(item.url, e);
      item.resp.send({code: 500, message: '2权限不足'})
    }
  })
}

module.exports = dispatcher
