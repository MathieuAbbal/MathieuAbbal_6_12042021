/**
 * CONFIGURATION DE MULTER
 * package qui permet de gérer les fichiers entrants dans les requêtes HTTP
*/
//Importation du package qui permet de capturer les fichiers envoyer avec une requête
const multer = require('multer');
//création d'un dictionnaire des types MIME pour définir le format des images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};
//Création d'un objet de configuration pour préciser à multer où enregistrer les fichiers images et les renommer
//Sauvegarde des images dans le dossier images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //on passe null pour dire qu'il n'y a pas d'erreur et on passe le dossier images qu'on a créé dans le backend,
    callback(null, 'images');
  },
  // Modification du nom du fichier 
  filename: (req, file, callback) => {
    //création du nom et on remplace les espaces par des underscores
    const name = file.originalname.split(' ').join('_');
    //création de l'extention du fichier
    const extension = MIME_TYPES[file.mimetype];
    //création du filename complet , on ajoute un timestamp, un point et enfin l'extension du fichier
    callback(null, name + Date.now() + '.' + extension);
  }
});
//exporte le module configuré, on lui passe l'objet storage, la méthode single pour dire que c'est un fichier unique et on précise que c'est une image
module.exports = multer({storage: storage}).single('image');