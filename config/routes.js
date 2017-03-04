const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const rocks = require('../controllers/rocks');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index'));//homepage. Will display the login.


router.route('/rocks')
  .get(rocks.index)
  .post(secureRoute, rocks.create);

router.route('/rocks/new')
  .get(secureRoute, rocks.new);

router.route('/rocks/:id')//rocks show, user show?
  .get(rocks.show)
  .put(secureRoute, rocks.update)
  .delete(secureRoute, rocks.delete);

router.route('/rocks/:id/edit')
  .get(secureRoute, rocks.edit);

router.route('/rocks/:id/comments')
  .post(secureRoute, rocks.createComment);

router.route('/rocks/:id/comments/:commentId')
    .delete(secureRoute, rocks.deleteComment);

router.route('/rock/images/new')
  .get(secureRoute, rocks.newImage);

router.route('/rock/images')
  .post(secureRoute, upload.single('filename'), rocks.createImage);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
    .get(sessions.new)
    .post(sessions.create);

router.all('*', (req, res) => res.notFound());

module.exports = router;

//
