const {Todo} = require('../models')

class TodoController {
    static findTodos(req, res) {
        Todo.findAll({
            where: {
                user_id: +req.user.id
            },
            attributes: {
                exclude: [ 'createdAt', 'updatedAt']
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: "Internal Server Error"})
        })
    }

    static addTodos(req, res) {
        const { title, description, status, due_date} = req.body
        console.log(req.user.id, 'ini disini')
        const user_id = req.user.id
        let obj = {
            title,
            description,
            status,
            due_date,
            user_id
        }
        console.log(obj)
        Todo.create(obj)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: 'Internal Server Error'})
        })
    }
    
    static findTodoById(req, res) {
        let id = req.params.id
        Todo.findByPk(id, {
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(404).json({message: 'Data Not Found'})
        })
    }

    static update(req, res) {
        let id = req.params.id
        const { title, description, status, due_date} = req.body
        let obj = {
            title,
            description,
            status,
            due_date
        }
        Todo.update(obj, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

    static editStatus(req, res) {
        let id = req.params.id
        const { status } = req.body
        let obj = { status }
        Todo.update(obj, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }
    
    static delete(req, res) {
        let id = req.params.id
        Todo.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json({message: 'Todo Has Been Succesfully Deleted'})
        })
        .catch(err => {
            res.status(500).json({message: 'Internal Server Error'})
        })
    }

}

module.exports = {TodoController}