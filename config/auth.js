  
module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    unAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      
      if (req.user.role=='basic'){
      res.redirect('/');
      
      }
      if (req.user.role=='admin'){
      res.redirect('/admin');
      
      }
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    },
    authRole(role){
      return (req,res,next)=>{
        if (req.user.role!=role){
          return res.send('Not allow')
        }
        next();
      }
    }
  };