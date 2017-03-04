//all the errors are caught, and passed to this file, which turns the errors into an html error message.

const { env } = require('../config/environment');
//if no status is passed, just make a generic 500 error and redirect to 500 view.
function errorHandler(err, req, res, next){
  err.status = err.status || 500;
  err.message = err.message || 'Internal Server Error';

  if(env === 'production') delete err.stack;

  res.status(err.status);
  res.locals.err = err;//anything on res.locals will display

  res.render(`statics/${err.status}`);
  next(err);
}

module.exports = errorHandler;
