module.exports = {
    ensureAuthenticated : function(req,res,next){
        if(req.isAthenticated()){
            return next();
        }
        req.flash('errpr_msg','please log in to view this page')
        res.redirect('/login')
    }
}