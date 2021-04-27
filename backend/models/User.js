//le modèle va nous permettre d'insérer des données dans MongoDB en respectant le schéma précisé et d'aller faire des requêtes dessus 
//importation de mongoose
const mongoose = require('mongoose');
//Importation du package pour éviter que 2 utilisateurs utilise la même adresse mail
const uniqueValidator = require('mongoose-unique-validator');
//création du schéma de donnée pour l'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
//applique le validateur au schéma avant d'en faire un modèle et on appelle la méthode plugin et on lui passe uniqueValidator en argument
userSchema.plugin(uniqueValidator);
//exporte le schéma sous forme de modèle : le modèle s'appellera User et on lui passe le schéma de données userSchema
module.exports = mongoose.model('User', userSchema);