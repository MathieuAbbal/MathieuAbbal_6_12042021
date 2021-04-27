//vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes
//importation du package pour créer et verifier les TOKENS
const jwt = require('jsonwebtoken');
// Création d'une authentification avec TOKEN 
module.exports = (req, res, next) => {
  try {
    //recupère le token dans le header
    const token = req.headers.authorization.split(' ')[1];
    //décode le token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    //récupere l'userId
    const userId = decodedToken.userId;
    //vérifie si l'userId de la reqête correspond à celui du token 
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID non valable !';
    } else {
      //passe la requête au prochain middelware
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Requête non authentifiée !')
    });
  }
};