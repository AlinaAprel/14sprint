const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: (value) => validator.isURL(value, {
      message: 'Ваша ссылка не валидна',
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: true,
    }),
  },
});

module.exports = mongoose.model('user', User);
