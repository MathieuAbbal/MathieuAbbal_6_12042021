//importation express
const express = require('express');
//création du router
const router = express.Router();
//importation du controller
const userCtrl = require('../controllers/user');
//importation du middelware por vérifier le mot de passe
const verifyPassword = require('../middelware/verifyPassword')
//route pour enregister un utilisateur
router.post('/signup', verifyPassword, userCtrl.signup);
//route pour connecter un utilisateur existant
router.post('/login', userCtrl.login);
//exportation du router
module.exports = router;