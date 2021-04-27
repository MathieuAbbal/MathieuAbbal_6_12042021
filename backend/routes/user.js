//importation express
const express = require('express');
//création du router
const router = express.Router();
//importation du controller
const userCtrl = require('../controllers/user');
//route pour enregister un utilisateur
router.post('/signup', userCtrl.signup);
//route pour connecter un utilisateur existant
router.post('/login', userCtrl.login);
//exportation du router
module.exports = router;