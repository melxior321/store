const {Device, Basket, BasketDevice, Type, Brand} = require('../models/models')

class BasketController {

    async addDevice(req, res, next) {
        const device = req.body.device;
        let result = null;
        try {
            const basket = await Basket.findOne({where: {userId: req.user.id}});
            result = await BasketDevice.create({basketId: basket.id, deviceId: device.id});
        } catch (e) {
            result = false;
        }

        res.json({result});
    }

    async removeDevice(req, res, next) {
        const deviceId = req.params.deviceId;
        try{
            const basket = await Basket.findOne({where: {userId: req.user.id}});
            await BasketDevice.destroy({where: {basketId: basket.id, deviceId}});
            res.json({status: true});
        }catch (e){
            res.json({status: false});
        }
    }

    async getBasket(req, res, next) {
        const basket = await Basket.findOne({where: {userId: req.user.id}});
        const rowFromBasket = await BasketDevice.findAll({where: {basketId: basket.id} });
        const devicesIdList = rowFromBasket.map(row => row.deviceId);
        const devicesList = await Device.findAll({where: {id: devicesIdList}, include: [Type, Brand]});

        res.json(devicesList);
    }
}

module.exports = new BasketController();
