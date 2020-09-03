const mongoose = require('mongoose');

const informatiqueSchema = mongoose.Schema({
  titre: { type: String },
  description: { type: String },


});

module.exports = mongoose.model('Informatique', informatiqueSchema);
