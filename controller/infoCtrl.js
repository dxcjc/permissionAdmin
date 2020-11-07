const infoDao = require('../dao/infoDao')
const jwt = require('jsonwebtoken');

module.exports = {
  async getList(res, resp) {

    let {err, info} = await infoDao.getList()
    if (info) {
      let infos = {}
      let roles = []
      let list = []
      for (let i in info) {
        let {uid, username, pwd, rname, rid} = info[i]
        rname = rname.split(',')
        rid = rid.split(',')
        for (let j in rid) {
          roles.push({rid: parseInt(rid[j]), rname: rname[j]})
        }
        infos = {uid, username, pwd, roles: roles}
        roles = []
        list.push(infos)
      }
      resp.send({code: 0, data: list})
    }

  },
  async getInfoByUid(infos, resp) {
    let id = infos.id
    let {err, info} = await infoDao.getInfoByUid([id])
    if (info) {
      let infos = {}
      let roles = []
      let list = []
      for (let i in info) {
        let {uid, username, pwd, rname, rid} = info[i]
        rname = rname.split(',')
        rid = rid.split(',')
        for (let j in rid) {
          roles.push({rid: parseInt(rid[j]), rname: rname[j]})
          roles.reverse()
        }
        infos = {uid, username, pwd, roles: roles}
        list.push(infos)
      }
      resp.send({code: 0, data: list})
    } else {
      resp.status(500).send({code: 500, data: {}, message: '服务异常'})
    }
  },
  // async deleteByUid(data, resp) {
  //   let uid = data.uid
  //   let {err, info} =await infoDao.deleteByUid(uid)
  //     if (info) {
  //       resp.send({code: 0, data: {}})
  //     } else {
  //       resp.status(500).send({code: 500, data: {}, message: '服务异常'})
  //     }
  //
  // },
  async edit(data, resp) {
    let uid = data.uid
    let roles = data.roleList
    try {
      await infoDao.deleteByUid(uid)
      console.log(roles);
      for (let i in roles) {
        await infoDao.edit([uid, roles[i]])
      }
      // await this.getList(data, resp)
      resp.send({code: 0, data: {}})
    } catch (e) {
      resp.status(500).send({code: 500, data: {}, message: '服务异常'})
    }

  }
  ,
  async deleteUser(data, resp) {
    let uid = data.uid
    try {
      await infoDao.deleteByUid(uid)
      await infoDao.deleteUser([uid])
      resp.send({code: 0, data: {}})
    } catch (e) {
      resp.status(500).send({code: 500, data: {}, message: '删除失败'})
    }
  }


}
