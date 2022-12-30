const Realisation = require('../models/Realisation');
const fs = require('fs')


exports.createRealisation = (req, res, next) => {
  console.log("Données de la réalisation reçues :", req.body); // Affiche les données de la réalisation reçues dans la requête HTTP
  const realisationObject = req.body;
  if ('_id' in realisationObject) {
    delete realisationObject._id;
  }
  if('_userId' in realisationObject){
  delete realisationObject._userId;
  }
  
  if (!req.file) {
    return res.status(400).json({error: 'No image provided'});
  }
  const realisation = new Realisation({
    ...realisationObject,
    userId: req.user._id,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  console.log("Realisation créée :", realisation); // Affiche l'objet réalisation créé
  realisation.save()
    .then(() => {
      console.log("Realisation enregistrée en base de données"); // Affiche un message de réussite lors de l'enregistrement
      res.status(201).json({ message: 'Objet enregistré !'});
    })
    .catch(error => {
      console.error("Erreur lors de l'enregistrement de l'objet :", error); // Affiche une erreur potentielle lors de l'enregistrement
      res.status(400).json({ message: 'Erreur lors de l\'enregistrement de l\'objet', details: error });
    });
};

// exports.modifyRealisation = (req, res, next) => {
//     Realisation.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
// };


exports.modifyRealisation = (req, res, next) => {
  let realisationObject = {};
  if (req.file) {
    // Si la modification contient une image => Utilisation de l'opérateur ternaire comme structure conditionnelle.
    Realisation.findOne({
      _id: req.params.id
    }).then((realisation) => {
      // Supperssion de l'ancienne image du serveur
      const filename = realisation.picture.split('/images/')[1]
      fs.unlinkSync(`images/${filename}`)
    })
    realisationObject = {
      // Modification des données et ajout de la nouvelle image
      ...JSON.parse(req.body.realisation),
      picture: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
    }
  } else {
    realisationObject = {
      ...req.body
    }
  }

  Realisation.updateOne(
      // Application des paramètre de realisationObject
      {
        _id: req.params.id
      }, {
        ...realisationObject,
        _id: req.params.id
      }
    )
    .then(() => res.status(200).json({
      message: 'Realisation modifiée !'
    }))
    .catch((error) => res.status(400).json({
      error
    }))
}

exports.deleteRealisation = (req, res, next) => {
  // Recherche de l'URL de l'image afin de supprimer le fichier avant suppression de l'objet
  Realisation.findOne({
      _id: req.params.id
    })
    .then(realisation => {
      // Pour extraire ce fichier, on récupère l'url de la realisation, et on le split autour de la chaine de caractères, donc le nom du fichier
      const filename = realisation.picture.split('/images/')[1];
      // Avec ce nom de fichier, on appelle unlink pour suppr le fichier
      fs.unlink(`images/${filename}`, () => {
        // Suppression du document correspondant de la base de données
        Realisation.deleteOne({
            _id: req.params.id
          })
          .then(() => res.status(200).json({
            message: 'Realisation supprimée !'
          }))
          .catch(error => res.status(400).json({
            error
          }));
      });
    })
    .catch(error => res.status(500).json({
      error
    }));
};


// exports.deleteRealisation = (req, res, next) => {
//     Realisation.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
// };

exports.getOneRealisation =(req, res, next) => {
    Realisation.findOne({ _id: req.params.id })
      .then(realisation => res.status(200).json(realisation))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllRealisations = (req, res, next) => {
    Realisation.find()
      .then(realisations => res.status(200).json(realisations))
      .catch(error => res.status(400).json({ error }));
};