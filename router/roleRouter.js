const router = require('../middleware/router')
const roleCtrl = require('../controller/roleCtrl')


// router.get('/role/getAllRoles',roleCtrl.getAllRoles)
router.post('/role/addRole',roleCtrl.addRole)
// router.get( '/role/deleteRoleOnUser',roleCtrl.deleteRoleOnUser)
// router.get( '/role/deleteRoleOnPermission',roleCtrl.deleteRoleOnPermission)
router.get( '/role/deleteRoleByRid',roleCtrl.deleteRoleByRid)

module.exports = router
