const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const realisationCtrl = require('../controllers/realisation');

router.post('/', multer, (req, res) => {
  // Récupère l'image envoyée dans la requête
  const image = req.file;
  // Vérifie si l'image a bien été envoyée
  if (!image) {
    // Si l'image n'a pas été envoyée, renvoie une réponse avec un code de statut HTTP 400 (Bad Request)
    return res.status(400).json({error: 'No image provided'});
  }
  // Si l'image a bien été envoyée, enregistre l'image en base de données ou la stocke sur le serveur (selon ta méthode de stockage choisie)
  // ...
  // Renvoie une réponse au client avec un code de statut HTTP 201 (Created) pour indiquer que l'image a bien été enregistrée
  res.status(201).json({message: 'Image saved'});
});

module.exports = router;