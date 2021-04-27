//Routeur qui contient la logique de routing
//importation express
const express = require('express');
//création du Routeur
const router = express.Router();
//importation du controller
const sauceCtrl = require('../controllers/sauce');
//importation de la fonction pour l'authentification pour sécuriser les routes
const auth = require('../middelware/auth')
//importation de multer configuré pour la gestion des images
const multer = require('../middelware/multer-config')

//on applique les fonctions aux routes
//Route pour créer une  sauce 
router.post('/', auth, multer,  sauceCtrl.createSauce);
//Route pour modifier une sauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//Route pour supprimer une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//Route pour récupérer toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauce);
//Route pour récupérer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);
//Route pour gérer les likes des sauces
router.post('/:id/like', auth, sauceCtrl.like);


//exporte le router
module.exports = router;