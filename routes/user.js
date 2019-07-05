const router = require('express').Router();
const Users = require('../controllers/users');

router.get('/', Users.getUsers);
router.get('/:id', Users.getUsersById);
router.post('/', Users.postUsers);
router.put('/:id', Users.putUsers);
router.delete('/:id', Users.deleteUsers);

module.exports = router;