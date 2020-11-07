const permissionCtrl = require('../controller/permissionCtrl')
const router = require('../middleware/router')

// router.get('/routes/getRouter',permissionCtrl.getRouter)
// router.get('/routes/getChildRoutes',permissionCtrl.getChildRoutes)
// router.get('/routes/getAllRoute',permissionCtrl.getAllRouter)
router.post('/routes/deleteRoute',permissionCtrl.deleteRoute)
router.post('/routes/updatePermission',permissionCtrl.updatePermission)

module.exports = router;
