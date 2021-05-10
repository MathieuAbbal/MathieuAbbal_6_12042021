//importation du modele pour le mot de passe
const passwordSchema = require('../models/Password')
//eporte le module de vérification du mot de passe
module.exports = (req, res, next) => {
    //verifie si le mot de passe entré par l'utilisateur ne respecte pas schéma 
    if (!passwordSchema.validate(req.body.password)) {
        //on indique que le mot de passe n'est pas assez fort
        console.log('Mot de passe pas assez fort: veuillez saisir un mot de passe avec au minimum 8 caractères, une majuscule, une minuscule et 2 chiffres  !');
        return res.status(400).json({ error: 'Mot de passe pas assez fort: veuillez saisir un mot de passe avec au minimum 8 caractères, une majuscule, une minuscule et 2 chiffres  !' }) ;
       //sinon on passe a la fonction suivante
    } else {
        next();
    }
};