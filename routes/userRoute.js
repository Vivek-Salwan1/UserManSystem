const express = require('express');
const userRoute = express();

userRoute.set('view engine','ejs');
userRoute.set('views','./views');

const bodyParser = require('body-parser');
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({extended:true}));

const userController =  require('../controllers/userController')
userRoute.get('/reg',userController.loadRegister);
//  calling loadRegister from userController

userRoute.post('/reg',userController.insertUser);

userRoute.get('/verify',userController.verifyMail)

module.exports = userRoute;