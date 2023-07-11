const express = require("express");
const path = require("path");
const router = express.Router();

//requerimos multer para que el usuario pueda subir archivos.
const multer = require("multer");
//requerimos para llamar a los controladores de products
const usersControllers = require('../controllers/usersControllers');


// configuración de multer para administra la carga de los archivos y especificar su ubicación de guardado
// TIP: Cada uno debe instalarlo en su pc (npm i multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/users');
    },
    filename: (req, file, cb) => {
        console.log(path.extname(file.originalname))
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage }); //nos habilita para guardar el archivo y usar en una ruta de archivos especifica.

// //metodos http 

// // users (GET) nos MUESTRA la vista del login
// router.get('/login', usersControllers.getLogin);//Omar

// users/register (GET) nos MUESTRA la vista del register
router.get('/register', usersControllers.getRegister);//Sebas

// users/register (POST) permite que el usuario pueda CREAR y ENVIAR la info del registro al servidor 
router.post('/', upload.any('img'), usersControllers.postRegister);//Sebas

// // users/usersProfile' (GET) nos MUESTRA la vista del perfil en especifico de acuerdo a su ID 
router.get('/usersProfile/:userId', usersControllers.getUsersProfile); //Mawe

// // users/:id/delete (DELETE) ELIMINA información del detalle de un producto en especifico de acuerdo a su 
router.delete('/delete/:userId', usersControllers.deleteUsersProfile);// tener en cuenta de crear la vista perfil..//Mawe

// //products/:id/update (GET) nos MUESTRA la vista para editar una info de perfil ya existente
router.get('/edit/:id',usersControllers.getEdit);//Rosa

//@PUT /products/:id/update permite reemplazar un dato ya existente de un  perfil
router.put('/edit/:id', upload.single('image'), usersControllers.putEdit);//Rosa

 module.exports = router;