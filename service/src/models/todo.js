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
        return new Promise((resolve, reject) => {
            todo.save(function (err, newTodo) {
                if (err) console.log(err);
                resolve(newTodo);
            });
        });
    };
    getTodo( data ) {
        return new Promise((resolve, reject) => {
            return this.Todo.findOne(data, (err, todo) => {
                if (err) console.log(err);
                if (todo) resolve(todo);
            });
        });
    };
    getTodos( data ) {
        return new Promise((resolve, reject) => {
            return this.Todo.find(data, function(err, todos) {
                if (err) console.log(err);
                if (todos) resolve(todos);
            });
        });
    };
    update( data ) {
        return new Promise((resolve, reject) => {
            this.Todo.findByIdAndUpdate(data._id, { $set: data }, { new: true }, function(err, todo){
                if(err) console.log(err);
                resolve(todo);
            });
        });
    };
    delete( data ) {
        return new Promise((resolve, reject) => {
            return this.Todo.deleteOne(data, function (err) {
                if (err) console.log(err);
                resolve({message: 'Todo, deleted successfully'});
            })
        });
    };
}

module.exports = new TodoModel();
