const poolConfig = require('../config/poolConfig')

// [userName, password]
async function login(attrArr) {
  return await poolConfig.connect(`select *
                            from user
                            where username= ? and pwd = ? `, attrArr);
}

async function getInfo(attrArr) {
  return await poolConfig.connect(`SELECT  GROUP_CONCAT(roles.id)  id
                            FROM user_role ru
                            LEFT JOIN USER ON user.id=ru.uid
                            LEFT JOIN roles ON roles.id=ru.rid
                            WHERE user.username= ?
                            GROUP BY user.id`, attrArr)
}
async function findPwdByName(arr) {
  return await poolConfig.connect(`select pwd from user where username = ?`, arr)
}
async function changePwd(arr) {
  return await poolConfig.connect(`update user set pwd = ? where username = ?`, arr)
}


module.exports = {
  login,
  getInfo,
  findPwdByName,
  changePwd
}
