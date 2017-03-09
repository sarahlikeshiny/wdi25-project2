const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const rocks = require('../controllers/rocks');
const users = require('../controllers/users');
const oauthController = require('../controllers/oauth');
const oauth = require('../config/oauth');
const upload = require('../lib/upload');

router.get('/', (req, res) => res.render('statics/index', { oauth }));


router.route('/rocks')
  .get(secureRoute, rocks.index)
  .post(upload.single('image[filename]'), rocks.create);

router.route('/rocks/new')
  .get(secureRoute, rocks.new);

router.route('/rocks/:id')
  .get(secureRoute, rocks.show)
  .put(secureRoute, rocks.update)
  .delete(secureRoute, rocks.delete);

router.route('/rocks/:id/edit')
  .get(secureRoute, rocks.edit);

router.route('/rocks/:id/comments')
  .post(secureRoute, rocks.createComment);


router.route('/rocks/:id/comments/:commentId')
  .delete(secureRoute, rocks.deleteComment);

router.route('/users')
  .get(secureRoute, users.index);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .put(secureRoute, users.update)
  .delete(secureRoute, users.delete);

router.route('/users/:id/edit')
  .get(secureRoute, users.edit);


router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/oauth/github')
  .get(oauthController.github);

router.route('/oauth/facebook')
  .get(oauthController.facebook);

router.all('*', (req, res) => res.notFound());

module.exports = router;
