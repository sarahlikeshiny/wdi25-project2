//checks if user is logged in and if they have an active session, if not redirect to the login page. gets used in routes.

function secureRoute(req, res, next) {
  if(!req.session.isAuthenticated || !req.session.userId) {
    return req.session.regenerate(() => res.unauthorized());
  }
  next();
}

module.exports= secureRoute;
