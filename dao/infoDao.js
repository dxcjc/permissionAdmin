const poolConfig = require('../config/poolConfig')
async function getList() {
  return await poolConfig.connect(`SELECT user.uid ,username ,pwd , GROUP_CONCAT(rname) rname , GROUP_CONCAT(ru.rid) rid
                          FROM user_role ru
                          LEFT JOIN USER ON user.uid=ru.uid
                          LEFT JOIN roles ON roles.rid=ru.rid
                          GROUP BY user.uid`)
}
async function getInfoByUid(array) {
  return await poolConfig.connect(`SELECT user.uid ,username ,pwd  , GROUP_CONCAT(rname) rname , GROUP_CONCAT(ru.rid) rid
                           FROM user_role ru
                           LEFT JOIN USER ON user.uid=ru.uid
                           LEFT JOIN roles ON roles.rid=ru.rid
                           where user.uid = ?
                           GROUP BY user.uid`, array)
}
async function edit(array, fun) {
  return await poolConfig.connect(`INSERT INTO user_role (uid,rid)
VALUES (?,?)  `, array, fun)
}
async function deleteByUid(array ) {
  return await poolConfig.connect(`delete from user_role where uid = ?`,array)
}
async function deleteUser(attrArr) {
  return await poolConfig.connect(`delete from user where uid = ?`, attrArr)
}

module.exports = {
  getList,
  getInfoByUid,
  deleteByUid,
  edit,
  deleteUser
}
