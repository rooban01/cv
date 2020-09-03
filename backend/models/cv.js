const mongoose = require('mongoose');

const cvSchema = mongoose.Schema({

  nom: { type: String},
  cvPath: { type: String },


});

module.exports = mongoose.model('Cv', cvSchema);
