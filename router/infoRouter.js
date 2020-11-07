const infoCtrl = require('../controller/infoCtrl')
const router = require('../middleware/router')

//infoCtrl.getList
router.get('/info/list',infoCtrl.getList)
router.get('/info/getInfoByUid',infoCtrl.getInfoByUid)
router.post('/info/edit', infoCtrl.edit)

module.exports = router;
