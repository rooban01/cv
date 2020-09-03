const mongoose = require('mongoose');

const moiSchema = mongoose.Schema({
  titre1: { type: String },
  titre2: { type: String },
  titre3: { type: String },
  titre4: { type: String },
  presentation1: { type: String},
  presentation2: { type: String},
  presentation3: { type: String},
  presentation4: { type: String},

});

module.exports = mongoose.model('Moi', moiSchema);
