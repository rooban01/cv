const mongoose = require('mongoose');

const langueSchema = mongoose.Schema({
  titre: { type: String },
  description: { type: String },


});

module.exports = mongoose.model('Langue', langueSchema);
