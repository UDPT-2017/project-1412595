var express = require('express');
var router = express.Router();
var sales = undefined;
exports.configure = function(params) {
    sales = params;
}
 
exports.index = router.get('/', function(req, res, next) {
    res.render('index', { title: 'Sales', sales: sales });
});