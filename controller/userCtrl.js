const userDao = require('../dao/userDao')
const jwt = require('jsonwebtoken');

module.exports = {
  async login(data, resp) {
    let userName = data.username;
    let password = data.password;
    let {err, info} = await userDao.login([userName, password])
    if (info.length) {
      let payload = {
        "roles": [],
        "introduction": "I am a super administrator",
        "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        "name": userName,
      };
      let secret = 'secret12345';
      let token = jwt.sign(payload, secret, {
          expiresIn: 1000 * 60 * 10000
        }
      );
      resp.send({code: 0, data: {msg: '登录成功', token: token},})
    } else {
      resp.send({code: -1, data: {msg: '登录失败'}})
    }

  },
  async getInfo(data, resp) {
    let token = jwt.verify(data.token, 'secret12345')
    let {err, info} = await userDao.getInfo([token.name])
    if (info) {
      token.roles = info[0].id.split(',')
      token.roles = token.roles.map(i => parseInt(i))
      resp.send({code: 0, data: token})
    } else {
      resp.status(500).send({code: 500, data: {}, message: '服务异常'})
    }

  },
  logout(data, resp) {
    resp.send({code: 0, data: 'success'})
  },

}
