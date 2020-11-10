const infoDao = require('../dao/infoDao')
const convertTree = require('../utils/convertTree')
const jwt = require('jsonwebtoken');

module.exports = {
  async getList(res, resp) {
    let {err, info} = await infoDao.getList()
    if (info) {
      resp.send({code: 0, data: info})
    }
  },
  async getInfoByUid(infos, resp) {
    //1：获取所有的角色树
    //2:获取当前用户角色id
    let id = infos.id
    let {err, info} = await infoDao.getRoles()
    let list = [] //定义一个空数组，这个是用来装真正路由数据的
    convertTree.setPremission(info, list)
    let data = await infoDao.getInfoByUid([id])
    info = data.info.map(i => i.id)
    resp.send({code: 0, data: {info, roles: list}})
  },

  async edit(data, resp) {
    let uid = data.uid
    let roles = data.list
    await infoDao.deleteByUid(uid)
    console.log(roles);
    for (let i in roles) {
      await infoDao.edit([uid, roles[i]])
    }
    resp.send({code: 0, data: {}})
  }
  ,
  async deleteUser(data, resp) {
    let uid = data.uid
    await infoDao.deleteByUid(uid)
    await infoDao.deleteUser([uid])
    resp.send({code: 0, data: {}})
  }


}
