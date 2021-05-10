//importation du package http 
const http = require('http');
//Importation de app pour utilisation de l'application sur le serveur
const app = require('./app');
//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {  // si la constante "port" n'est pas un Nombre (isNaN) 
    return val;       // renvoie de l'argument qui passé à la fonction
  }
  if (port >= 0) {    // si la valeur de la constante "port" est supérieur à zéro donc valide: la fonction renvoie la consante port
    return port;
  }
  return false;       //sinon (port<0) la fonction renvoie alors false
};
//si process.env.PORT(port d'environnement lors du démarage) n'est pas disponible alors on se sert du port 3000
const port = normalizePort(process.env.PORT || '3000');
//attribue un nom a une valeur
app.set('port', port);
// la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée.
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
// Créer un serveur avec express qui utilise app
// création d'une constante pour les appels serveur 
const server = http.createServer(app);
// Lance le serveur et affiche sur quel port se connecter ou gère les erreurs s'il y en a
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
// Le serveur écoute le port
server.listen(port);
