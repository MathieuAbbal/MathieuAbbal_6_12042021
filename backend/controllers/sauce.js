//stocke toute la logique métier de chaques fonctions
//Importation du modèle mongoose
const Sauces = require('../models/Sauces');
//importation du module 'file system' de Node permettant de gérer les téléchargements et modifications d'images
const fs = require('fs');
//Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
  //On stocke les données envoyées par le front-end et on les transforme en objet JavaScript 
  const sauceObject = JSON.parse(req.body.sauce);
  //supprime l'Id généré automatiquement et envoyé par le front-end. L'id de la sauce est créé par la base MongoDB lors de la création dans la sauce
  delete sauceObject._id;
  //Création d'une instance du modèle Sauces
  const sauce = new Sauces({
    //copie les champs du corps de la requête
    ...sauceObject,
    //génére l'url de l'image   
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
  });
  //Sauvegarde de la sauce dans la base de données
  sauce.save()
    //envoi une réponse au frontend avec un statut 201 sinon on a une expiration de la requête
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !' }))
    // On ajoute un code erreur en cas de problème
    .catch(error => res.status(400).json({ error }));
};
// Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  let sauceObject = {};
  //on regarde si il y a un fichier dans la requête
  //Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux   
  req.file ? (
    Sauces.findOne({ _id: req.params.id })
      //On utilise la méthode findOne et on lui passe l'objet de comparaison, on veut que l'id de la sauce soit le même que le paramètre de requête
      .then(sauce => {
        //supprime l'ancienne images 
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      })
      .catch(error => res.status(500).json({ error })),

    sauceObject = {
      //si il existe on traite l'image
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }
  )
    : sauceObject = { ...req.body };

  Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then((sauce) => { res.status(200).json({ message: "Sauces modifiée !" }) })//recupère l'objet et modifie l'identifiant
    .catch(error => res.status(400).json({ error }));
};
// Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  // Avant de suppr l'objet, on va le chercher pour obtenir l'url de l'image et supprimer le fichier image de la base
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      // Avec le de fichier, on appelle unlink pour supprimer le fichier
      fs.unlink(`images/${filename}`, () => {
        //On supprime le document correspondant de la base de données
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
//Lecture d'une sauce avec son Id
exports.getOneSauce = (req, res, next) => {
  //On utilise la méthode findOne et on lui passe l'objet de comparaison, on veut que l'id de la sauce soit le même que le paramètre de requête
  Sauces.findOne({ _id: req.params.id })
    //Si ok on retourne une réponse et l'objet
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error: error }))
};
//Affichage de toutes les sauces
exports.getAllSauce = (req, res, next) => {
  //On utilise la méthode find pour obtenir la liste complète des sauces trouvées dans la BDD
  Sauces.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error: error }));
};

//Pour liker et disliker
exports.like = (req, res, next) => {
  //On utilise la méthode findOne pour obtenir la sauce en fonction de son Id dans la BDD
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => {
      //
      if (req.body.like === 1) {
        sauce.likes++;
        sauce.usersLiked.push(req.body.userId)
        console.log('like ajouté !')
      }

      if (req.body.like === -1) {
        sauce.dislikes++;
        sauce.usersDisliked.push(req.body.userId)
      }
      if (req.body.like === 0) {
        if (sauce.usersLiked.some(userId => req.body.userId == userId)) {
          sauce.likes--;
          sauce.usersLiked = sauce.usersLiked.filter(userId => req.body.userId != userId);

        }
        else {
          sauce.dislikes--;
          sauce.usersDisliked = sauce.usersDisliked.filter(userId => req.body.userId != userId);
        }
      }
      sauce.save()
        //envoi une réponse au frontend avec un statut 200 sinon on a une expiration de la requête
        .then((sauce) => res.status(200).json({ message: ' Votre avis est pris en compte !' }))
        // On ajoute un code erreur en cas de problème
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};
