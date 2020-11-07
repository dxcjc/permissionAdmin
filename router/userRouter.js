const router = require('../middleware/router')
const userCtrl = require('../controller/userCtrl')

router.post('/user/login',userCtrl.login)
router.get('/user/info',userCtrl.getInfo)
router.post('/user/logout',userCtrl.logout)


module.exports = router;



