const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UserService {

    async create(data) {
        const hash = await bcrypt.hash(data.password, 10);
        const newUser = await models.User.create({
            ...data,
            password: hash
        });
        delete newUser.dataValues.password;
        return newUser;
    }


    async find(desde) {
        const usuarios = await models.User.findAll({
            offset: desde, limit: 5
        });

        const total = await models.User.count();

        return {
            usuarios,
            total
        };
    }

    async allUsers(){
        const usuarios = await models.User.findAll();
        return {
            usuarios,
        };
    }


    async findByEmail(email) {
        const rta = await models.User.findOne({
            where: { email }
        });
        return rta;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) {
            throw boom.notFound('user not found');
        }
        return user;
    }

    async update(id, changes) {

        const user = await this.findOne(id);
        const rta = await user.update(changes);
        return rta;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();
        return { id };
    }
}

module.exports = UserService;
