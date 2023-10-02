const mongoose = require('mongoose');
const regExLink = require('../utils/utils');

const movieSchema = new mongoose.Schema({

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regExLink.test(v);
      },
      message: 'Неверный формат ссылки',
    },
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regExLink.test(v);
      },
      message: 'Неверный формат ссылки',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regExLink.test(v);
      },
      message: 'Неверный формат ссылки',
    },
  },

  owner: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('movie', movieSchema);
