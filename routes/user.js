const router = require('express').Router();
const {
  getUsers, getUserId, createUser, login,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
