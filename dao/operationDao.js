const poolConfig = require('../config/poolConfig')

async function getOperation(array) {
  return await poolConfig.connect(` SELECT  path, title ,permission.pid, fid
                            FROM permission_role pu
                            LEFT JOIN permission ON permission.pid=pu.pid
                            LEFT JOIN roles ON roles.rid=pu.rid
                            WHERE roles.rname= ? AND isRoute=1 `, array)
}
module.exports = {
  getOperation
}
