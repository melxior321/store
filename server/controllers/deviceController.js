const uuid = require('uuid')
const path = require('path');
const {Device, DeviceInfo, Brand} = require('../models/models')
const ApiError = require('../error/ApiError');
const {Op} = require("sequelize");
const {Sequelize} = require("sequelize");

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    };

    async update(req, res, next) {
        try {
            let {deviceId} = req.params;
            let {name, price, brandId, typeId, info} = req.body;
            const updateData = {name, price, brandId, typeId};

            const img = req.files ? req.files.img : null;

            if (img) {
                let fileName = uuid.v4() + ".jpg";
                img.mv(path.resolve(__dirname, '..', 'static', fileName));
                updateData.img = fileName;
            }
            const device = await Device.update(
                updateData,
               {where: {id: deviceId}}
            );

            if (info) {
                await DeviceInfo.destroy({where: {deviceId}});
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: deviceId
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query;
        page = Number.parseInt(page) || 1;
        limit = Number.parseInt(limit) || 9;
        let offset = page * limit - limit;
        let devices;

        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({limit, offset, include: Brand})
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset, include: Brand})
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset, include: Brand})
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId, brandId}, limit, offset, include: Brand})
        }

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async remove(req, res) {
        const {id} = req.params
        const device = await Device.destroy({where: {id}})
        return res.json(device)
    }

    async getInfoList(req, res, next) {
        const {term} = req.query;
        const infoList = await DeviceInfo.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('title')), 'value']
            ],
            where: {
                title: {
                    [Op.like]: `${term}%`
                }
            }
        });

        return res.json(infoList);
    }
}

module.exports = new DeviceController()
