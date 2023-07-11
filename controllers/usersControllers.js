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
        const userId = datos.id;
        // Debe redirreccionar a la vista de perfil usuario.
        res.redirect('/users/usersProfile/' + userId);
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

    
        usersModel.deleteById(id);
    

        res.redirect('/');
    },

    getEdit: (req, res) => {
        const id = Number (req.params.id);
        const usersToModify = usersModel.findById(id)
        if (!usersToModify) {
            return res.send('El usuario que desea buscar no se encuentra disponible :( ');
        }
        res.render('edit', {
            title: 'Edición del perfil',
            user: usersToModify
        });
    },

    putEdit: (req, res) => { 
        const id = Number (req.params.id); 
        const nuevosDatos = req.body;

        if (req.file) {
            nuevosDatos.image = req.file.filename;
        } else {
            nuevosDatos.image = 'default-image.png';
        }

        // nuevosDatos.image = req.file ? req.file.filename : 'default-image.png';
        usersModel.updateById(id, nuevosDatos)
        res.redirect('/');
    },

    
}

module.exports = controllers;
