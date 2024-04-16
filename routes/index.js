const router = require('express').Router();
const NotFoundError = require('../errors/NotFound');
const auth = require('../middlewares/auth');
const { createUser, login, signOut } = require('../controllers/users');

const { createUserValidator, loginValidator } = require('../validators/validator');

router.post('/signout', signOut);

router.post(
  '/signup',
  createUserValidator,
  createUser,
);

router.post(
  '/signin',
  loginValidator,
  login,
);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.all('*', () => { throw new NotFoundError('Not found'); });

module.exports = router;
