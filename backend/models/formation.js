const mongoose = require('mongoose');

const formationSchema = mongoose.Schema({
  date1: { type: String },
  diplome: { type: String },
  lieu: { type: String },
  description: { type: String },


});

module.exports = mongoose.model('Formation', formationSchema);
