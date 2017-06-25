var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var dburl = undefined;
exports.connect = function(thedburl, callback) {
    dburl = thedburl;
    mongoose.connect(dburl);
}
 
exports.disconnect = function(callback) {
    mongoose.disconnect(callback);
}
 
var SaleSchema = new Schema({
    salekey: String,
    title: String,
    body: String
});
 
mongoose.model('Sale', SaleSchema);
var Sale = mongoose.model('Sale');
 
exports.create = function(key, title, body, callback) {
    var newSale = new Sale();
    newSale.salekey = key;
    newSale.title = title;
    newSale.body = body;
    newSale.save(function(err) {
        if(err)
            callback(err);
        else
            callback();
    });
}
 
exports.update = function(key, title, body, callback) { 
    exports.read(key, function(err, doc) {    
        if(err)
            callback(err);
        else { 
            doc.salekey = key;
            doc.title = title;
            doc.body = body;
            doc.save(function(err) {
                if(err)
                    callback(err);
                else
                    callback();
            });
        }
    });
}
 
exports.read = function(key, callback) {
    Sale.findOne({ salekey: key }, function(err, doc) {
        if(err) 
            callback(err);
        else
            callback(null, doc);
    });
}
 
exports.destroy = function(key, callback) {
    exports.read(key, function(err, doc) {
        if(err)
            callback(err);
        else {
            doc.remove();
            callback();
        }
    });
}
 
exports.titles = function(callback) {
    Sale.find().exec(function(err, docs) {
        if(err)
            callback(err);
        else {
            if(docs) {
                var saleList = [];
                docs.forEach(function(sale) {
                    saleList.push({
                    key: sale.salekey,
                    title: sale.title 
                    }); 
                });
                callback(null, saleList);
            } else { 
                callback();
            }
        }
    });
}