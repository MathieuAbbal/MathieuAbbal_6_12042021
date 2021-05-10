//importation du model mongoose
const User = require('../models/User');
//importation du package de cryptage
const bcrypt = require('bcrypt');
//importation du package pour créer et verifier les TOKENS
const jwt = require('jsonwebtoken');
//module node pour masquer l'email
const MaskData = require('../node_modules/maskdata');
//exportation de la fonction pour l'enregistrement d'un utilisateur
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)//crypte le mot de passe
        .then(hash => {
            const user = new User({ //création d'un nouvel utilisateur
                email: MaskData.maskEmail2(req.body.email),
                password: hash
            });
            user.save()//enregistre dans la BDD
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};
//exportation de la fonction pour connecter un utilisateur existant
exports.login = (req, res, next) => {
    //récupére l'utilisateur
    User.findOne({ email: MaskData.maskEmail2(req.body.email) })//objet de comparaison
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)//compare le mot de passe de la requête avec le hash de la BDD
                .then(valid => {//retourne un boolean
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({//retourne les données attendu par le front
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },//on encode les données que l'on souhaite
                            'RANDOM_TOKEN_SECRET',//clé secrète pour l'encodage
                            { expiresIn: '24h' }//expiration du TOKEN

                        )
                    });
                })
                .catch(error => res.status(500).json({ error}));
        })
        .catch(error => res.status(500).json({ error }));
};





