//importation express (Framework basé sur node.js)
const express = require('express');
// Création d'une application express
const app = express();
//importation mongoose
const mongoose = require('mongoose');
//importation du package pour avoir accès au chemin du fichier
const path = require('path');
//importation des routes
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces')
//logique pour se connecter à la BDD
mongoose.connect('mongodb+srv://MathieuA:charlyabbal@cluster0.8wwi9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie :) !'))
  .catch(() => console.log('Connexion à MongoDB échouée :/ !'));

//// Middleware Header pour éviter les erreurs sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader('Access-Control-Allow-Origin', '*');
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
//permet de décoder une requête encodée en json
app.use(express.json());
//applique les routers et les enregistres
app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes);
//Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));
//Export de l'application express pour déclaration dans server.js
module.exports = app;