const mongoose = require('mongoose');

const electroniqueSchema = mongoose.Schema({
  titre: { type: String },
  description: { type: String },


});

module.exports = mongoose.model('Electronique', electroniqueSchema);
