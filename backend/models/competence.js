const mongoose = require('mongoose');

const competanceSchema = mongoose.Schema({
  sujet: { type: String },
  commentaire: { type: String},
  niveau: { type: Number},

});

module.exports = mongoose.model('Competance', competanceSchema);
