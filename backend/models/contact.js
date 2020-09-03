const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  gender: { type: String},
  nom: { type: String, required: true },
  prenom1: { type: String},
  poste: { type: String},
  societe: { type: String},
  addresse: { type: String},
  telephone: { type: String},
  email: { type: String},

  rdv: { type: String},
  commentaire: { type: String},
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true }

});

module.exports = mongoose.model('Contact', postSchema);
