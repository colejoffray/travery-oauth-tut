module.exports = {
    ensureAuth: function(req, res, next) {
        if(process.env.NODE_ENV == 'development') return next()

        if(req.isAuthenticated()){
            return next()
        }else {
            res.redirect('/')
        }
    },

    ensureGuest: function(req,res, next){
        if(process.env.NODE_ENV == 'development') return next()
        
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        }else {
            return next()
        }
    }
}