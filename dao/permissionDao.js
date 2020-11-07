const poolConfig = require('../config/poolConfig')

async function getRouter(array) {
  return await poolConfig.connect(` SELECT roles.rid, rname, path, title ,permission.pid, fid,isRoute
                            FROM permission_role pu
                            LEFT JOIN permission ON permission.pid=pu.pid
                            LEFT JOIN roles ON roles.rid=pu.rid
                            WHERE roles.rname= ? `, array)
}
async function getChildRoutes(array) {
  return await poolConfig.connect(`select permission from permission where fid = ?`, array)
}
async function getAllRoutes() {
  return await poolConfig.connect(`select * from permission`)
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
