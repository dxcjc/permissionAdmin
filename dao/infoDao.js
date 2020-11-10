const poolConfig = require('../config/poolConfig')
async function getList() {
// , GROUP_CONCAT(rname) rname , GROUP_CONCAT(ru.rid) rid
  return await poolConfig.connect(`SELECT id ,username ,pwd 
                          FROM user`)
}
async function getInfoByUid(array) {
// , GROUP_CONCAT(rname) rname , GROUP_CONCAT(ru.rid) rid
  return await poolConfig.connect(`SELECT roles.id, roles.fid
                           FROM user_role ru
                           LEFT JOIN USER ON user.id=ru.uid
                           LEFT JOIN roles ON roles.id=ru.rid
                           WHERE user.id = ?`, array)
}
async function edit(array, fun) {
  return await poolConfig.connect(`INSERT INTO user_role (uid,rid)
                                        VALUES (?,?)  `, array, fun)
}
async function deleteByUid(array ) {
  return await poolConfig.connect(`delete from user_role where uid = ?`,array)
}
async function deleteUser(attrArr) {
  return await poolConfig.connect(`delete from user where id = ?`, attrArr)
}
async function getRoles(attrArr) {
  return await poolConfig.connect(`select * from roles`, attrArr)
}


module.exports = {
  getList,
  getInfoByUid,
  deleteByUid,
  edit,
  deleteUser,
  getRoles,
}
