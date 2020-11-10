const roleDao = require('../dao/roleDao')
const convertTree = require('../utils/convertTree')
module.exports = {
  async getRoles(data, resp) {
    // 更据当前用户的角色名数组查询其下属角色
    let roles = data.roles
    let list = []
    console.log(list);
    for (let i in roles) {
      await findRoles(roles[i], list)
    }
    list =convertTree.unique(list)
    resp.send({code: 0, data: list})
  },
  async addRole(data, resp) {
    let rname = data.role.rname
    let fid = data.role.fid
    let {err, info} = await roleDao.addRole([rname, fid])
    if (info) {
      resp.send({code: 0, data: info})
    } else {
      resp.send({code: 500, data: {}, message: '添加失败'})
    }
  },
  async deleteRoleByRid(data, resp) {
    let rid = data.rid
    // 1: delete 用户角色表中的角色相关信息
    await roleDao.deleteRoleOnUser(rid)
    // // 2: delete 角色权限表中的角色相关信息
    await roleDao.deleteRoleOnPermission(rid)

    await roleDao.deleteRoleByRid([rid])

    resp.send({code: 0, data: {message: '删除成功'}})
  },

}

async function findRoles(id, list) {
  //dao方法 返回role对象 回调方法
  let {info} = await roleDao.getRoles(id)
  if (info) {
    for (const i in info) {
      list.push(info[i])
      await findRoles(info[i].id, list)
    }
  }
}
