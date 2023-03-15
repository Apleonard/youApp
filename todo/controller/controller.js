const router = require('express').Router()
const mongoose = require('mongoose');
const amqp = require('amqplib');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://root:rootpassword@172.17.0.1:27017', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define 'todo' schema and model
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
});
const Todo = mongoose.model('Todo', todoSchema);
const queueName = 'todos';

async function postRabbit(req, res) {
    amqp.connect('amqp://admin:password@172.17.0.1').then(async (conn) => {
        const channel = await conn.createChannel();
        await channel.assertQueue(queueName);
        const todo = new Todo({
            text: req.body.text,
            completed: req.body.completed,
        });
        await todo.save();
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(todo)));
        res.status(201).send(todo);
    }).catch(console.error);

}

async function getTodos(req, res) {

    try {
        const data = await Todo.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { postRabbit, getTodos }