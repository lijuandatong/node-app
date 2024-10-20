const db = require('./db')

// Testing numbers
module.exports.absolute = function(number){
    return number >= 0 ? number : -number
}

// Testing strings
module.exports.greet = function(name){
    return 'welcome' + name 
}

// Testing arrays
module.exports.getCurrencies = function(){
    return ['USD', 'AUD', 'EUR']
}

// testing object
module.exports.getProduct = function(id){
    return {id: id, price: 10}
}

// testing exceptions
module.exports.registerUser = function(name){
    if(!name) throw new Error('Username is required')
    return {id: new Date().getTime(), username: name}
}

module.exports.applyDiscount = function(order) {
    const customer = db.getCustomerSync(order.customerId)
    
    if(customer.points > 10){
        order.totalPrice *= 0.9
    }
}