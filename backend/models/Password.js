//importation du package pour validé le mot de passe
const passwordValidator = require('password-validator');
//créer le schema de validation de mot de passe
const passwordSchema = new passwordValidator();
passwordSchema
.is().min(8)         //longeur min
.is().max(15)        //longeur max 
.has().uppercase()   //doit avoir des lettres minuscule
.has().lowercase()   //doit avoir des lettres majuscule
.has().digits(2)     // 2 chiffres min
.has().not().spaces()//ne doit pas avoir d'espace
//exporte le schema
module.exports= passwordSchema;