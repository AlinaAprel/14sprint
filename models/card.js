const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { ObjectId } = require('bson');
const validator = require('validator');

const Card = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: (value) => validator.isURL(value, {
      message: 'Ваша ссылка не валидна',
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: true,
    }),
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  likes: {
    type: ObjectId,
    default: null,
  },
  createdAd: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', Card);
