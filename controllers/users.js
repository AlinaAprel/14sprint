const bcrypt = require('bcryptjs');
const { isIterable } = require('core-js');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(new Error('NotFound', 'CastError'))
    .then((users) => {
      res.status(200).json({ data: users });
    })
    .catch((err) => {
      if (err.message === 'CastError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'Объект не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotFound', 'CastError'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Невалидный id' });
      } else if (err.message === 'NotFound') {
        res.status(404).send({ message: 'id не найден' });
      } else {
        res.status(500).send({ message: 'Ошибка сервера' });
      }
    });
};
// eslint-disable-next-line max-len

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Переданы некорректные данные ${err}` });
      } else {
        res.status(500).send({ message: 'Ошибка при создании user' });
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Неправильные почта или пароль 1' });
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        res.status(401).send({ message: 'Неправильные пароль или почта' });
      }
      const token = jwt.sign({
        _id: user._id,
      }, 'secret-key');
      return res.status(201).send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: `Что-то пошло не так ${err}` });
    });
};
