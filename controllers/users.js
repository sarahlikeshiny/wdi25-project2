
const Rock = require('../models/rock');
const User = require('../models/user');

//new users route,
function newRoute(req, res) {
  return res.render('users/new');
}


//index user route,
function indexRoute(req, res, next) {
  User
    .find()
    .populate('comments.createdBy')
    .exec()
    .then((users) => res.render('users/index', { users }))
    .catch(next);
}

//create users route
function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  if(req.file) req.body.image.filename = req.file.key;

  User
    .create(req.body)
    .then(() => res.redirect('/users'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/users/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

//show users route,
function showRoute(req, res, next) {
  User.findById(req.params.id)
  .then((user) => {
    return Rock.find({createdBy: user.id})
    .then((rocks) => {
      res.render('users/show', { user, rocks });
    })
    .catch(next);
  });
}

//edit users
function editRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((user) => {
      return res.render('users/edit', { user });
    })
    .catch(next);
}
//update users
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

//delete users
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
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute


};
