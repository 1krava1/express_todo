var mongoose = require('mongoose');

class UserModel {
    constructor( userSchema = null,
                 User = null ){
        this.setUserSchema();
    }
    setUserSchema() {
        this.userSchema = mongoose.Schema({
            login: String,
            password: String,
            email: String,
            firstName: String,
            lastName: String,
            avatar: String,
            registrationIP: String,
            registrationDate: String,
            lastLoginIP: String,
            lastLoginDate: String,
            roles: [String],
        });
        try{
            this.User = mongoose.model( 'User', this.userSchema );
        } catch (err) {
            console.log(err);
        }
    };
    create( data ) {
        let user = new this.User( data );
        return new Promise((resolve) => {
            user.save(function (err, newUser) {
                if (err) return console.error(err);
                resolve(newUser);
            });
        });
    };
    getUser( data ) {
        return this.User.findOne(data, (err, users) => {
            if (err) return console.log(err);
        });
    };
    getUsers( data ) {
        return this.User.find(function(err, users) {
            if (err) return console.log(err);
        });
    };
    update( data ) {
        return {'models/User.update()': data};
    };
    delete( data ) {
        return {'models/User.delete()': data};
    };
    authUser() {

    }
}

module.exports = new UserModel();
