const productModel = require('../models/products');


const controllers = {

    // get /products/Sebas
    getProducts: (req, res) => {
        // buscamos todos los productos que tenemos en la base de datos.
        const productos = productModel.findAll();
        res.render('listProducts', {
            title: 'Lista de productos',
            productos
        });

    },
   //get/Create/Sebas
    getCreate: (req, res) => {
        res.render('creacionProductos', {
            title: 'Creación de productos'
        });
    },
    
    deleteProducts: (req, res) => {
        const id = Number(req.params.id);
    
        productModel.deleteById(id);
    
        res.redirect('/products');
      },

    // get /productscard/ Omar
    getCard: (req, res) => {
        const productos = productModel.findAll();
        res.render('productCard', {
            title: 'carrito',
            productos 
        });
        console.log(productos);
    },

    updateProducts: (req, res) => { 
        const id = Number (req.params.id); 
        const nuevosDatos = req.body;

        productModel.updateById(id, nuevosDatos)
        
        res.redirect('/products');
    },
    //get/products/:id/detail/Mawe

    getProductDetail: (req, res) => {

        const id = Number(req.params.id);


        const productoAMostrar = productModel.findById(id);

        if (!productoAMostrar) {
            return res.send('error de id');
        }

        res.render('productDetail', { title: 'Detalle', product: productoAMostrar });
    },


    // @GET /products/:id/update

    getUpdate: (req, res) => {
        const id = Number (req.params.id);
        const productsToModify = productModel.findById(id)
        if (!productsToModify) {
            return res.send('El producto que desea buscar no se encuentra disponible :( ');
        }
        res.render('edicionProductos', {
            title: 'Edición Productos',
            product: productsToModify
        });
    },

    // // post/products


    postProduct: (req, res) => {

         let datos = req.body;

         datos.price = Number(datos.precio);

         /* datos.img = '/imgs/products/' + req.file.filename; */
         datos.img = req.files.map(file => '/img/' + file.filename);

         productModel.create(datos);


         res.redirect('/products');
     }

}
     
module.exports = controllers;

