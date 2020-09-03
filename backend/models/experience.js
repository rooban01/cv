const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
  date1: { type: String },
  societe: { type: String },
  poste: { type: String },
  description: { type: String },


});

module.exports = mongoose.model('Experience', experienceSchema);
