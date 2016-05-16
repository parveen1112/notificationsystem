module.exports = {
    get : function(req, res){
        if (req.session.isLoggedIn) {
            req.session.user = req.session.user;
            req.session.isLoggedIn = true;
            return res.render('index.ejs', {
                host : notSys.config.host.toString(),
                port : notSys.config.port,
                isLoggedIn : true,
                user : req.session.user
            });
        } else {
            return res.render('index.ejs', {
                isLoggedIn : false
            });
        }
    },
    /**
     * Controller when user logs in
     * @param req
     * @param res
     * @returns {String}
     */
    addUser : function(req, res){
        var user = req.body['username'];
        if (user) {
            req.session.user = user;
            req.session.isLoggedIn = true;
            return res.redirect('/');
        } else {
            return res.render('index.ejs', {
                isLoggedIn : false,
                error : "Not a valid user"
            });
        }
    },
    /**
     * Controller when User logs out
     * @param req
     * @param res
     */
    logout : function(req, res) {
        req.session.user = null;
        req.session.isLoggedIn = null;
        delete req.session.user;
        delete req.session.isLoggedIn;
        return res.redirect('/');
    }
};