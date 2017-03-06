const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const rocks = require('../controllers/rocks');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));//homepage. Will display the login eventually


router.route('/rocks')
  .get(rocks.index)
  // .post(secureRoute, rocks.create)
  .post(upload.single('image[filename]'), rocks.create);//this one is doing somthign weird?

router.route('/rocks/new')
  .get(secureRoute, rocks.new);

router.route('/rocks/:id')//rocks show, user show?
  .get(rocks.show)
  .put(secureRoute, rocks.update)
  .delete(secureRoute, rocks.delete);

router.route('/rocks/:id/edit')
  .get(secureRoute, rocks.edit);

router.route('/rocks/:id/comments')
  // .post(secureRoute, rocks.createComment);
  .post(rocks.createComment);

router.route('/rocks/:id/comments/:commentId')
    // .delete(secureRoute, rocks.deleteComment);
    .delete(rocks.deleteComment);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
    .get(sessions.new)
    .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;

//
