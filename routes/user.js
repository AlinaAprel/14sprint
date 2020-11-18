const router = require('express').Router();
const { getUsers, getUserId, createUsers } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserId);
router.post('/', createUsers);

module.exports = router;
