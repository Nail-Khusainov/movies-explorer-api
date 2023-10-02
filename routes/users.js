const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');
const { profileUpdateValidator } = require('../validators/validator');

router.get('/me', getCurrentUser);

router.patch('/me', profileUpdateValidator, updateProfile);

module.exports = router;
