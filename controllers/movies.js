const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFound');
const ForbiddenError = require('../errors/Forbidden');
const BadRequestError = require('../errors/BadRequest');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ 'owner._id': req.user._id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = { _id: req.user._id };
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Введен некорректный тип данных'));
      } else next(error);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (movie.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять фильмы других пользователей');
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then((deletedMovie) => {
          res.send(deletedMovie);
        });
    })
    .catch(next);
};
