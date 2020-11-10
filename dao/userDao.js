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
async function deleteUser(attrArr) {
  return await poolConfig.connect(`delete from user where id = ?`, attrArr)
}


module.exports = {
  login,
  getInfo,
  // deleteUser,
}
