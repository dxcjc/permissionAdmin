const operationDao = require('../dao/operationDao')

module.exports = {
  async getBtnInfo(data, resp) {
    let desc = JSON.parse(data.desc).desc
    let roles = JSON.parse(data.desc).roles
    let hasPermission = false
    let operations = []
    for (let i in roles) {
      let {info} = await operationDao.getOperation(roles[i])
      operations = operations.concat(info)
    }
    operations.forEach(o => {
      if (o.path === desc) {
        hasPermission = true
      }
    })
    resp.send({code: 0, data: hasPermission})
  },
}
