const validate = require('mongoose-validator');

exports.nameValidator = [ // Validation du champ 'nom de la sauce'
  validate({
    validator: 'isLength',
    arguments: [3, 60], // Le nom doit contenir entre 3 et 60 caractères
    message: 'Le nom de votre Sauce doit contenir entre 3 and 60 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, // Regex pour restreindre le type de symboles utilisables
    message: "Vous ne pouvez utiliser que des chiffres et des lettres pour nommer votre sauce",
  }),
];


exports.descriptionValidator = [ //  Validation pour la decription de la sauce
  validate({
    validator: 'isLength',
    arguments: [10, 150],
    message: 'La description de la sauce doit contenir entre 10 et 150 caractères',
  }),
  validate({
    validator: 'matches',
    arguments: /^[a-z\d\-_\s]+$/i, // Regex pour restreindre le type de symboles pour la description de la sauce
    message: "Vous ne pouvez utiliser que des chiffres et des lettres pour la description de la sauce",
  }),
];

