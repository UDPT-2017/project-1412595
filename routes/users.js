var users = undefined;
exports.configure = function(passport) {
    users = passport;
}

var readUser = function(key, res, done) {
    users.read(key, 
        function(err, data) {
            if(err) {
            res.render('showerror', {
                title: "Could not read users " + key,
                error: err
            });
        done(err);
    } else
        done(null, data);
    });
}

exports.login = function(req, res) {
        res.render('login.ejs', {
        	message: req.flash('loginMessage') 
        }); 
    };
    

exports.dologin = function(req, res){
	passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login', 
        failureFlash : true
    });


exports.signup = function(req, res) {
        res.render('signup.ejs', {
        	message: req.flash('signupMessage')
        });
    };

exports.dosignup = function(req, res){
	passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    });
};

exports.profile = function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
};

exports.logout = function(req, res) {
        req.logout();
        res.redirect('/');
    };
};

exports.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}