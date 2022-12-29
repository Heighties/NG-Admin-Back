const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const realisationCtrl = require('../controllers/realisation');
const Image = require('../models/Image');

router.post('/', auth, multer, (req, res) => {
// Récupère l'image envoyée dans la requête
const image = req.file;
// Vérifie si l'image a bien été envoyée
if (!image) {
// Si l'image n'a pas été envoyée, renvoie une réponse avec un code de statut HTTP 400 (Bad Request)
return res.status(400).json({error: 'No image provided'});
}
// Si l'image a bien été envoyée, enregistre l'image en base de données ou la stocke sur le serveur (selon ta méthode de stockage choisie)
const newImage = new Image({
user: req.user.id, // l'identifiant de l'utilisateur qui a envoyé l'image (récupéré grâce au middleware auth)
imageUrl: image.path, // l'URL de l'image stockée sur le serveur
});
newImage.save()
.then(() => {
// Renvoie une réponse au client avec un code de statut HTTP 201 (Created) pour indiquer que l'image a bien été enregistrée
res.status(201).json({message: 'Image saved'});
})
.catch(error => {
// Si une erreur s'est produite lors de l'enregistrement, envoie une réponse avec un code de statut HTTP 500 (Internal Server Error)
res.status(500).json({error});
});
});

module.exports = router;