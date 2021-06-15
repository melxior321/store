const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/', deviceController.create)
router.put('/:deviceId', deviceController.update)
router.delete('/:id', deviceController.remove)
router.get('/', deviceController.getAll)
router.get('/infoList', deviceController.getInfoList)
router.get('/:id', deviceController.getOne)

module.exports = router
