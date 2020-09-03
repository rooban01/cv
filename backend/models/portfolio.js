const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
  nom: { type: String },
  description: { type: String },
  description1: { type: String },
  lien: { type: String },
  btn: { type: String },



});

module.exports = mongoose.model('Portfolio', portfolioSchema);
