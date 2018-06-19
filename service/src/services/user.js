var mongoose = require('mongoose');
var UserModel = require('../models/user');

class UserService {
    constructor(){}
    saveNewUser(data) {
        return UserModel.create(data);
    }
    getUserIP(req) {
        return req.headers['x-forwarded-for'] || 
               req.connection.remoteAddress || 
               req.socket.remoteAddress ||
               (req.connection.socket ? req.connection.socket.remoteAddress : null);
    }
    getUserFromDB( data ) {
        return UserModel.getUser( data );
    }
    getUsers( data ) {
        return UserModel.getUsers( data );
    }
}
module.exports = new UserService();
