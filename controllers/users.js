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

module.exports.createUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные' });
      } else {
        res.status(500).send({ message: 'Ошибка при создании user' });
      }
    });
};
