// this will control the rocks routes. Images and comments are embedded in the rocks model

const Rock = require('../models/rock');
// const User = require('../models/user');

//index Rock route,
function indexRoute(req, res, next) {
  Rock
    .find()
    .populate('createdBy')
    .exec()
    .then((rocks) => res.render('rocks/index', { rocks }))
    .catch(next);
}

//new rocks route,
function newRoute(req, res) {
  return res.render('rocks/new');
}

//create rocks route
function createRoute(req, res, next) {

  req.body.createdBy = req.user;

  Rock
    .create(req.body)
    .then(() => res.redirect('/rocks'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/rocks/${req.params.id}/edit`, err.toString());
      next(err);
    });
}
//show rocks route,
function showRoute(req, res, next) {
  Rock
    .findById(req.params.id)
    .populate('comments.createdBy')//populate the created by object
    .exec()
    .then((rock) => {
      if(!rock) return res.notFound();
      return res.render('rocks/show', { rock });
    })
    .catch(next);
}
//show user route,
// function showRoute(req, res, next) {
//   User
//     .findById(req.params.id)
//     .populate('comments.createdBy')//populate the created by object
//     .exec()
//     .then((rock) => {
//       if(!rock) return res.notFound();
//       return res.render('rocks/show', { rock });
//     })
//     .catch(next);
// }


//edit rocks
function editRoute(req, res, next) {
  Rock
    .findById(req.params.id)
    .exec()
    .then((rock) => {
      return res.render('rocks/edit', { rock });
    })
    .catch(next);
}
//update rocks
function updateRoute(req, res, next) {
  Rock
    .findById(req.params.id)
    .exec()
    .then((rock) => {
      if(!rock) return res.notFound();

      for(const field in req.body) {
        rock[field] = req.body[field];
      }

      return rock.save();
    })
    .then(() => res.redirect(`/rocks/${req.params.id}`))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest(`/rocks/${req.params.id}/edit`, err.toString());
      next(err);
    });
}

//delete rocks
function deleteRoute(req, res, next) {
  Rock
    .findById(req.params.id)
    .exec()
    .then((rock) => {
      if(!rock) return res.notFound();
      return rock.remove();
    })
    .then(() => res.redirect('/ rocks'))
    .catch(next);
}
//create comment

function createCommentRoute(req, res, next) {

  req.body.createdBy = req.user;//forced the user on to the body(user is attached to req.body)

  Rock
    .findById(req.params.id)
    .exec()
    .then((rock) => {
      if (!rock) return res.notFound();

      rock.comments.push(req.body);//create an embedded record
      return rock.save();
    })
  .then((rock) => res.redirect(`/rocks/${rock.id}`))
  .catch(next);
}
//delete comment

function deleteCommentRoute(req, res, next){
  Rock
    .findById(req.params.id)
    .exec()
    .then((rock) => {
      if (!rock) return res.notFound();
      const comment = rock.comments.id(req.params.commentId);//retieve an embedded record using it's id(even though its embedded inside another record)
      comment.remove();

      return rock.save();//save the hotel without the comment
    })
    .then((rock) => res.redirect(`/rocks/${rock.id}`))
    .catch(next);
}
//new image

function newImageRoute(req, res) {
  res.render('rocks/newImage');
}

//create image
function createImageRoute(req, res, next) {
  if(req.file) req.body.filename = req.file.key;

  // For some reason multer's req.body doesn't behave like body-parser's
  req.body = Object.assign({}, req.body);

  req.user.images.push(req.body);

  req.user
    .save()
    .then(() => res.redirect('/user'))
    .catch((err) => {
      console.log(err);
      if(err.name === 'ValidationError') return res.badRequest('/user/images/new', err.toString());
      next(err);
    });
}
module.exports = {
  index: indexRoute,
  new: newRoute,
  create: createRoute,
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  delete: deleteRoute,
  createComment: createCommentRoute,
  deleteComment: deleteCommentRoute,
  newImage: newImageRoute,
  createImage: createImageRoute
};
