const express = require('express');
const { readTodos, createTodos, upsertTodos, deleteTodos } = require('../../data/todo');
const router = express.Router();

router.get('/', (req, res) => {
    readTodos().then(data => {
        res.send(data)
    })
})

router.post('/', (req, res) => {
    const body = req.body
    createTodos(body).then(data => {
        res.send(data)
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    upsertTodos(id, body).then(data =>  res.send(data));
})

router.delete('/:id', (req,res) => {
    const id = req.params.id
    deleteTodos(id).then(data => res.send(data));
})

module.exports = router;
