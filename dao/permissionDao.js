const poolConfig = require('../config/poolConfig')

async function getRouter(array) {
  // roles.id, rname,
  return await poolConfig.connect(` SELECT  path, title ,permission.id, permission.fid,isRoute
                            FROM permission_role pu
                            LEFT JOIN permission ON permission.id=pu.pid
                            LEFT JOIN roles ON roles.id=pu.rid
                            WHERE roles.id= ? `, array)
}
async function getChildRoutes(array) {
  return await poolConfig.connect(`select permission from permission where fid = ?`, array)
}
async function getAllRoutes(array) {
  return await poolConfig.connect(` SELECT  path, title ,permission.id, permission.fid,isRoute
                            FROM permission_role pu
                            LEFT JOIN permission ON permission.id=pu.pid
                            LEFT JOIN roles ON roles.id=pu.rid
                            WHERE roles.id= ? `, array)
}
async function deleteRouteByRid(array) {
  return await poolConfig.connect(`delete from permission_role where rid = ?`,array)
}
async function updatePermission(array) {
  return await poolConfig.connect(`INSERT INTO permission_role (rid,pid)
                           VALUES (?,?)  `, array)
}


module.exports = {
  getRouter,
  getChildRoutes,
  getAllRoutes,
  deleteRouteByRid,
  updatePermission
}
