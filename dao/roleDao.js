const poolConfig = require('../config/poolConfig')

async function getAllRoles(fun) {
  return await poolConfig.connect('select rid, rname from roles', fun)
}
async function addRole(array) {
  return await poolConfig.connect(`INSERT INTO roles (rname)
                           VALUES (?) `, array)
}
async function deleteRoleOnUser(array) {
  return await poolConfig.connect(`DELETE FROM user_role WHERE rid = ? `, array)
}
async function deleteRoleOnPermission (array) {
  return await poolConfig.connect(`DELETE FROM permission_role WHERE rid = ? `, array)
}
async function deleteRoleByRid(array){
  return await poolConfig.connect(`DELETE FROM roles WHERE rid = ? `, array)
}

module.exports = {
  getAllRoles,
  addRole,
  deleteRoleOnUser,
  deleteRoleOnPermission,
  deleteRoleByRid
}
