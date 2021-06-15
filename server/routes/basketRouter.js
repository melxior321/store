const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware')

router.put('/', authMiddleware, basketController.addDevice)
router.delete('/device/:deviceId', authMiddleware, basketController.removeDevice)
router.get('/', authMiddleware, basketController.getBasket)

module.exports = router
