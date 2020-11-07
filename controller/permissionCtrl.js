

const permissionDao = require('../dao/permissionDao')
const convertTree = require('../utils/convertTree')
module.exports = {
  async edit(data, resp) {
    let rname = data.rname
    // try {
      let {info} = await permissionDao.getRouter([rname])

      info = info.filter((item) => {
        let isParentNode = false
        info.forEach(i=>{
          if (item.pid===i.fid) isParentNode=true
        })
        // if(!isParentNode)  return item.pid
        return !isParentNode
      })
      info = info.map(i=>{
        return i.pid
      })
      let routes = await permissionDao.getAllRoutes()
      routes = routes.info
      let list = [] //定义一个空数组，这个是用来装真正路由数据的
      routes.forEach((m, i) => {
        if (m.fid === 0) {
          m.children = []
          list.push(m)
        }
      })
       convertTree.convertTree(routes,list)
      resp.send({code: 0, data: {info, routes: list}})
    // } catch (e) {
    //   resp.send({code: 500, data: {}, message: '服务异常'})
    // }

  },
  async getRouter(data, resp) {
    let roles = data.roles
    let list = []
    for (let i in roles){
      let {info} = await permissionDao.getRouter([roles[i]])
      list = list.concat(info)
    }
    resp.send({code: 0, data: {list}})

  },
  // async getAllRouter(data, resp) {
  //   let {err, info} = await permissionDao.getAllRoutes()
  //   if (info) {
  //     let list = [] //定义一个空数组，这个是用来装真正路由数据的
  //     info.forEach((m, i) => {
  //       if (m.fid == null) {
  //         m.children = []
  //         list.push(m)
  //       }
  //     })
  //     convertTree.convertTree(info, list)
  //     resp.send({code: 0, data: list})
  //   } else {
  //     resp.send({code: 500, data: {}, message: '服务异常'})
  //   }
  //
  // },
  // async getChildRoutes(data, resp) {
  //   let pid = data.pid
  //
  //   let {err, info} = await permissionDao.getChildRoutes([pid])
  //   if (info) {
  //     let permission = info.map(v => v.permission)
  //     resp.send({code: 0, data: permission})
  //   } else {
  //     resp.send({code: 500, data: {}, message: '服务异常'})
  //   }
  //
  // },
  async deleteRoute(data, resp) {
    let rid = data.rid
    // console.log(rid);
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
    try {
      await permissionDao.deleteRouteByRid([rid])
      for (let i in list) {
        await permissionDao.updatePermission([rid, list[i]])
      }
      resp.send({code: 0, data: {}})
    } catch (e) {
      resp.status(500).send({code: 500, data: {e}, message: '服务异常'})
    }
  }
}
