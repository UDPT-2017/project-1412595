var sales = undefined;
exports.configure = function(params) {
    sales = params;
}
 
var readSale = function(key, res, done) {
    sales.read(key, 
        function(err, data) {
            if(err) {
            res.render('showerror', {
                title: "Could not read sale " + key,
                error: err
            });
        done(err);
    } else
        done(null, data);
    });
}
 
exports.view = function(req, res, next) {
    if(req.query.key) {
        readSale(req.query.key, res, function(err, data) {
            if(!err) {
                res.render('saleview', {
                    title: data.title,
                    salekey: req.query.key,
                    sale: data
                });
            }
        });
    } else {
        res.render('showerror', {
            title: "No key given for Sale",
            error: "Must provide a Key to view a Sale"
        });
    }
}
 
exports.save = function(req, res, next) {
    ((req.body.docreate === "create") ? sales.create : sales.update)
    (req.body.salekey, req.body.title, req.body.body,
        function(err) {
        if(err) {
            res.render('showerror', {
                title: "Could not update file",
                error: err
            });
        } else {
            res.redirect('/saleview?key='+req.body.salekey);
        }
        });
   }
 
exports.add = function(req, res, next) {
    res.render('saleedit', {
        title: "Add a Product",
        docreate: true,
        salekey: "",
        sale: undefined
    });
}
 
exports.edit = function(req, res, next) {
    if(req.query.key) {
        readSale(req.query.key, res, function(err, data) {
            if(!err) {
                res.render('saleedit', {
                    title: data ? ("Edit " + data.title) : "Add a Product",
                    docreate: false,
                    salekey: req.query.key,
                    sale: data
                });
            }
        });
    } else {
        res.render('showerror', {
            title: "No key given for Sale",
            error: "Must provide a Key to view a Sale"
        });
    }
}
 
exports.destroy = function(req, res, next) {
    if(req.query.key) {
        readSale(req.query.key, res, function(err, data) {
            if(!err) {
                res.render('saledestroy', {
                    title: data.title,
                    salekey: req.query.key,
                    sale: data
                });
            }
        });
    } else {
        res.render('showerror', {
            title: "No key given for Sale",
            error: "Must provide a Key to view a sale"
        });
    }
}
 
exports.dodestroy = function(req, res, next) {
    sales.destroy(req.body.salekey, function(err) {
        if(err) {
            res.render('showerror', {
            title: "Could not delete Sale " + req.body.salekey,
            error: err
            });
        } else {
            res.redirect('/');
        }
    });
}