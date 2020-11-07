const roleDao = require('../dao/roleDao')

module.exports = {
  async getAllRoles(data, resp) {
    let {err, info} = await roleDao.getAllRoles()
    if (info) {
      resp.send({code: 0, data: info})
    } else {
      resp.status(500).send({code: 500, data: {}, message: '添加失败'})
    }
  },
  async addRole(data, resp) {
    let rname = data.rname
    let {err, info} = await roleDao.addRole([rname])
    if (info) {
      resp.send({code: 0, data: info})
    } else {
      resp.status(500).send({code: 500, data: {}, message: '添加失败'})
    }

  },
  // async deleteRoleOnUser(data, resp) {
  //   let rid = data.rid
  //   let {err, info} = await roleDao.deleteRoleOnUser([rid])
  //   if (info) {
  //     resp.send({code: 0, data: info})
  //   } else {
  //     resp.status(500).send({code: 500, data: {}, message: '添加失败'})
  //   }
  // },
  // async deleteRoleOnPermission(data, resp) {
  //   let rid = data.rid
  //   let {err, info} = await roleDao.deleteRoleOnPermission([rid])
  //   if (info) {
  //     resp.send({code: 0, data: info})
  //   } else {
  //     resp.status(500).send({code: 500, data: {}, message: '添加失败'})
  //   }
  // },
  async deleteRoleByRid(data, resp) {
    let rid = data.rid
    try {
      console.log(rid);
      // 1: delete 用户角色表中的角色相关信息
      await roleDao.deleteRoleOnUser(rid)
      console.log(rid);
      // // 2: delete 角色权限表中的角色相关信息
      await roleDao.deleteRoleOnPermission(rid)
      console.log(rid);
      await roleDao.deleteRoleByRid([rid])
      console.log(rid);
      // await this.getAllRoles(data,resp)
      resp.send({code: 0, data: {}})
    } catch (e) {
      resp.status(500).send({code: 500, data: {e}, message: '删除失败'})
    }

  }

  ,
}
