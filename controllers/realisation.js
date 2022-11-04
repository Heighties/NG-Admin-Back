// in controllers/stuff.js

const Realisation = require('../models/Realisation');


exports.createRealisation = (req, res, next) => {
    delete req.body._id;
    const realisation = new Realisation({
      ...req.body
    });
    realisation.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyRealisation = (req, res, next) => {
    Realisation.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteRealisation = (req, res, next) => {
    Realisation.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

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