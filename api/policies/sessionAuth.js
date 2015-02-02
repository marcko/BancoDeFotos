/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil');
  var values = actionUtil.parseValues(req);
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
if (req.isAuthenticated()) {
   console.log(values);
    return next();
 }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
return res.redirect('/');
};
