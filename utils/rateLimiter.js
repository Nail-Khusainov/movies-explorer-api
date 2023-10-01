const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 88,
  message: 'Превышено ограничение запросов c вашего IP, пожалуйста, повторите позже.',
});


