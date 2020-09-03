const mongoose = require('mongoose');

const atoutsSchema = mongoose.Schema({
  titre: { type: String },
  description: { type: String },


});

module.exports = mongoose.model('Atout', atoutsSchema);
