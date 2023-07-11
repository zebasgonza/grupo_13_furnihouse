const path = require('path');
const controllers = {
    
   
    /* configuración para vista EJS */
    getIndex: (req, res) => {
         return res.render('index', { title: 'Home' });
    }, 
};
module.exports = controllers;
