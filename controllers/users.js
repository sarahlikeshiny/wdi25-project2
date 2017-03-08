const User = require('../models/user');
const Rock = require('../models/rock');

function indexRoute(req, res) {
  User
    .find()
    .exec()
    .then((users) => {
      res.render('users/index', { users });
    })
    .catch((err) => {
      res.status(500).end(err);
    });
}

function newRoute(req, res){
  res.render('users/new');
}

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .populate('comments.createdBy')//populate the created by object
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/show', { user });
    })
    .catch(next);
}

function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  if(req.file) req.body.image.filename = req.file.key;

  Rock
    .create(req.body)
    .then(() => res.redirect('/users'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function editRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      return res.render('users/edit', { user });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

function deleteRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return user.remove();
    })
    .then(() => res.redirect('/ users'))
    .catch(next);
}




module.exports = {
  index: indexRoute,
  new: newRoute,
  show: showRoute,
  create: createRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute
};
