const permissionDao = require('../dao/permissionDao')
const convertTree = require('../utils/convertTree')
module.exports = {
  async edit(data, resp) {
    let id = data.id, roles = data.roles, routes = [], {info} = await permissionDao.getRouter([id])
    info = info.filter((item) => {
      let isParentNode = false
      info.forEach(i => {
        if (item.id === i.fid) isParentNode = true
      })
      return !isParentNode
    })
    info = info.map(i =>  i.id)

    for (let i in roles) {
      let r = await permissionDao.getAllRoutes([roles[i]])
      routes = routes.concat(r.info)
    }

    let list = [] //定义一个空数组，这个是用来装真正路由数据的
    convertTree.setPremission(routes,list)
    resp.send({code: 0, data: {info, routes: list}})
  },
  async getRouter(data, resp) {
    let roles = data.roles
    let list = []
    for (let i in roles) {
      let {info} = await permissionDao.getRouter([roles[i]])
      list = list.concat(info)
    }
    resp.send({code: 0, data: {list}})

  },
  async deleteRoute(data, resp) {
    let rid = data.rid
    let {err, info} = await permissionDao.deleteRouteByRid([rid])
    if (info) {
      resp.send({code: 0, data: {}})
    } else {
      resp.send({code: 500, data: {}, message: '服务异常'})
    }
  },
  async updatePermission(data, resp) {
    let rid = data.rid
    let list = data.list

    await permissionDao.deleteRouteByRid([rid])
    for (let i in list) {
      let {err} = await permissionDao.updatePermission([rid, list[i]])
    }
    resp.send({code: 0, data: {}})

  }
}
