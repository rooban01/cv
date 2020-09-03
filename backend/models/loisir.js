const mongoose = require('mongoose');

const loisirSchema = mongoose.Schema({
  titre: { type: String },
  description: { type: String },


});

module.exports = mongoose.model('Loisir', loisirSchema);
