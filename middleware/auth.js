const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // Récupération du token dans l'en-tête de la requête
    const token = req.headers.authorization.split(" ")[1];
    // Vérification de la validité du token
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "userId non valide";
    } else {
      next();
    }
  } catch (error) {
    // Envoi d'une réponse avec un statut 401 (Non autorisé) en cas d'erreur
    res.status(401).json({
      error: error || "Requête non authentifiée !",
    });
  }
};