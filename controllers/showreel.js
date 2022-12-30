const Showreel = require('../models/Showreel');


exports.createShowreel = (req, res, next) => {
    delete req.body._id;
    const showreel = new Showreel({
      ...req.body
    });
    showreel.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyShowreel = (req, res, next) => {
    Showreel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteShowreel = (req, res, next) => {
    Showreel.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.getOneShowreel =(req, res, next) => {
    Showreel.findOne({ _id: req.params.id })
      .then(showreel => res.status(200).json(showreel))
      .catch(error => res.status(404).json({ error }));
};

exports.getAllShowreels = (req, res, next) => {
    Showreel.find()
      .then(showreels => res.status(200).json(showreels))
      .catch(error => res.status(400).json({ error }));
};