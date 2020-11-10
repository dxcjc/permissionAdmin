const poolConfig = require('../config/poolConfig')

async function getOperation(array) {
  return await poolConfig.connect(` SELECT  path, title ,permission.id,permission.fid
                            FROM permission_role pu
                            LEFT JOIN permission ON permission.id=pu.pid
                            LEFT JOIN roles ON roles.id=pu.rid
                            WHERE roles.id= ? AND isRoute=1 `, array)
}
module.exports = {
  getOperation
}
