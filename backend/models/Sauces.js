//le modèle va permettre d'insérer des données dans MongoDB en respectant le schéma précisé et d'aller faire des requêtes dessus 
//Création d'un modèle Sauces avec mongoose
//importation mongoose
const mongoose = require('mongoose');
//création du schema de donnée Sauces
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: {type: Number, required: true},
    likes: { type: Number},
    dislikes: { type: Number},
    usersLiked: { type: [String]},
    usersDisliked: { type: [String]}
});
//exporte le schéma sous forme de modèle : le modèle s'appellera Sauces et on lui passe le schéma de données SaucesSchema
module.exports = mongoose.model('Sauces', sauceSchema);
