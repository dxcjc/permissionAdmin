const poolConfig = require('../config/poolConfig')

// [userName, password]
async function login(attrArr) {
  return await poolConfig.connect(`select *
                            from user
                            where username= ? and pwd = ? `, attrArr);
}

async function getInfo(attrArr) {
  return await poolConfig.connect(`SELECT user.uid ,username ,pwd , GROUP_CONCAT(rname)  rname
                            FROM user_role ru
                            LEFT JOIN USER ON user.uid=ru.uid
                            LEFT JOIN roles ON roles.rid=ru.rid
                            WHERE user.username= ?
                            GROUP BY user.uid`, attrArr)
}
async function deleteUser(attrArr) {
  return await poolConfig.connect(`delete from user where uid = ?`, attrArr)
}


module.exports = {
  login,
  getInfo,
  // deleteUser,
}
