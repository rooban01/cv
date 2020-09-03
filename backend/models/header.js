const mongoose = require('mongoose');

const headerSchema = mongoose.Schema({

  gender: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  numero: { type: String, required: true },
  rue: { type: String, required: true },
  complementaire: { type: String},
  code: { type: String, required: true },
  commune: { type: String, required: true },
  telephone: { type: String, required: true },
  email: { type: String, required: true },
  titre: { type: String, required: true },
  phrase: { type: String, required: true },

  imagePath: { type: String },
  //cvPath: { type: String },

});

module.exports = mongoose.model('Header', headerSchema);
