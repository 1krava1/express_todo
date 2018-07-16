const express = require('express');
const router = express.Router();
const TodoService = require('../services/todo');

/** Create todo form */
router.get('/create', function(req, res, next){
    res.render('../views/todo-create.pug');
});
/** Create todo */
router.post('/create', function(req, res, next){
    const newTodo = {
        description: req.body.description,
        status: false,
    };
    TodoService.saveNewTodo(newTodo).then((response) => {
        res.send(response);
    });
});
/** Get todo list */
router.get('/list', function(req, res, next){
    if (req.query.done) {
        TodoService.getTodos({status: req.query.done || false}).then((response) => {
            res.send(response);
        });
    } else {
        TodoService.getTodos().then((response) => {
            res.send(response);
        });
    }
});
router.get('/list-view', function(req, res, next){
    if (req.query.done) {
        TodoService.getTodos({status: true}).then((response) => {
            res.render('../views/todo-list.pug', {subtitle: "Todo list", todos: response});
        });
    } else {
        TodoService.getTodos().then((response) => {
            res.render('../views/todo-list.pug', {subtitle: "Todo list", todos: response});
        });
    }
});
/** Get todo */
router.get('/:id', function(req, res, next){
    if (!!req.params.id) {
        TodoService.getTodo({_id: req.params.id}).then((response) => {
            res.send(response);
        });
    }
});
/** Update todo */
router.patch('/:id', function(req, res, next){
    let updatedTodo = {};
    if (!!req.params.id) {
        updatedTodo._id = req.params.id;
        if (req.body.description) updatedTodo.description = req.body.description;
        if (req.body.status) { updatedTodo.status = true } else { updatedTodo.status = false };
        TodoService.updateTodo(updatedTodo).then((response) => {
            res.send(response);
        });
    }
});
/** Delete todo */
router.delete('/:id', function(req, res, next){
    if (!!req.params.id) {
        TodoService.deleteTodo({_id: req.params.id}).then((response) => {
            res.send(response);
        });
    }
});

module.exports = router;
