var mongoose = require('mongoose');

class TodoModel {
    constructor( todoSchema = null,
                 Todo = null ){
        this.setTodoSchema();
    }
    setTodoSchema() {
        this.todoSchema = mongoose.Schema({
            userId: String,
            description: String,
            status: Boolean,
        });
        try{
            this.Todo = mongoose.model( 'Todo', this.todoSchema );
        } catch (err) {
            console.log(err);
        }
    };
    create( data ) {
        let todo = new this.Todo( data );
        return new Promise((resolve) => {
            todo.save(function (err, newTodo) {
                if (err) return console.error(err);
                resolve(newTodo);
            });
        });
    };
    getTodo( data ) {
        return this.Todo.findOne(data, (err, todos) => {
            if (err) return console.log(err);
        });
    };
    getTodos( data ) {
        return new Promise((resolve, reject) => {
            return this.Todo.find(data, function(err, todos) {
                if (err) return console.log(err);
                resolve(todos);
            });
        });
    };
    update( data ) {
        return new Promise((resolve, reject) => {
            this.Todo.findByIdAndUpdate(data._id, { $set: data }, { new: true }, function(err, todo){
                resolve(todo);
            });
        });
    };
    delete( data ) {
        return {'models/Todo.delete()': data};
    };
    authTodo() {

    }
}

module.exports = new TodoModel();
