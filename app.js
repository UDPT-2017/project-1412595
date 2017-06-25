var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var passport = require('passport');

 
var routes = require('./routes/index');
var users = require('./routes/users');
var sales = require('./routes/sales');

var models = require('./models-mongoose/sales');
models.connect("mongodb://localhost/sales", function(err) {
    if(err)
    throw err;
});


require('./models-mongoose/passport')(passport);


sales.configure(models);
routes.configure(models);
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({ secret: 'xxxxxxxxxxxxx' })); 
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 
 
app.use('/', routes.index);
app.get('/saleadd', sales.add);
app.post('/salesave', sales.save);
app.use('/saleview', sales.view);
app.use('/saleedit', sales.edit);
app.use('/saledestroy', sales.destroy);
app.post('/saledodestroy', sales.dodestroy);

app.use('/profile', users.isLoggedIn);
app.get('/login', users.login);
app.post('/login', users.dologin);
app.get('/signup', users.signup);
app.post('/signup', users.dosignup);
app.get('/profile', users.isLoggedIn, user.profile);
app.get('/logout', user.logout);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
// error handlers
 
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
 
 
module.exports = app;