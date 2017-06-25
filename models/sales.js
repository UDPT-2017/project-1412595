var sales = [];
exports.sales = sales;
exports.update = exports.create = function(key, title, body, callback) {
    sales[key] = { title: title, body: body };
    callback(null);
}
  
exports.read = function(key, callback) {
    if(!(key in sales))
        callback("No such Key existed", null);
    else
        callback(null, sales[key]);
}
  
exports.destroy = function(key, callback) {
    if(!(key in sales))
        callback("Wrong Key");
    else {
        delete sales[key];
        callback(null);
    }
}
  
exports.keys = function() {
    return Object.keys(sales);
}