const usersModel = require('../models/users');
const bcrypt = require('bcrypt');

const controllers = {

    // @Get users/register
    getRegister: (req, res) => {
        res.render('register', {
            title: 'Registro'
        });
    },

    // @Post users/register
    postRegister: (req, res) => {
        let datos = req.body;
        datos.price = Number(datos.precio);
        datos.img = req.files.map(file => '/img/users/' + file.filename);

        // encriptación contraseña
        const hashedPassword = bcrypt.hashSync(datos.password, 10);
        datos.password = hashedPassword;

        // Encriptación confirmación contraseña
        const hashedConfirmPassword = bcrypt.hashSync(datos['confirm-password'], 10);
        datos['confirm-password'] = hashedConfirmPassword;

        usersModel.create(datos);
        // Debe redirreccionar a la vista de perfil usuario.
        res.redirect('/products');
    },

    getUsersProfile: (req, res) => {
        const userId = Number(req.params.userId);
        const user = usersModel.findById(userId)

        res.render('usersProfile', {
            title: 'Perfil de Usuario',
            user
        });

    },

    deleteUsersProfile: (req, res) => {

        const id = Number(req.params.userId);

        usersModel.deleteById(userId);

        res.redirect('/');
    },
}

module.exports = controllers;
