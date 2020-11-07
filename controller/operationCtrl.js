const btnPermission = require('../static/btn-permission')
const operationDao = require('../dao/operationDao')

module.exports = {
  async getBtnInfo(data, resp) {
    let desc = JSON.parse(data.desc).desc
    let roles = JSON.parse(data.desc).roles
    let hasPermission = false
    let operations = []
    for (let i in roles) {
      let {info} = await operationDao.getOperation(roles[i])
      console.log(info);
      operations = operations.concat(info)
    }

    try {
      operations.forEach(o => {
        console.log(o);
        if (o.path===desc) {
          hasPermission = true
        }
      })
      resp.send({code: 0, data: hasPermission})
    } catch (e) {
      resp.send({code: 500, message: '该按钮不存在'})
    }
  },
  getOperation(data, resp){
    resp.send({code:0,data:btnPermission})
  }


}
