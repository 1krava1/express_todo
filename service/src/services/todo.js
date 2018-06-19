var TodoModel = require('../models/todo');

class TodoService {
    constructor(){}
    saveNewTodo(data) {
        return TodoModel.create(data);
    }
    updateTodo(data) {
        return TodoModel.update(data);
    }
    getTodoFromDB( data ) {
        return TodoModel.getTodo( data );
    }
    getTodos( data ) {
        return TodoModel.getTodos( data );
    }
}
module.exports = new TodoService();
