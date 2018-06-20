var TodoModel = require('../models/todo');

class TodoService {
    constructor(){}
    saveNewTodo(data) {
        return TodoModel.create(data);
    }
    updateTodo(data) {
        return TodoModel.update(data);
    }
    deleteTodo(data) {
        return TodoModel.delete(data);
    }
    getTodos( data ) {
        return TodoModel.getTodos( data );
    }
    getTodo( data ) {
        return TodoModel.getTodo( data );
    }
}
module.exports = new TodoService();
