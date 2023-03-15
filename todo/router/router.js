const router = require('express').Router()
const mongoose = require('mongoose');
const amqp = require('amqplib');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { postRabbit, getTodos } = require('../controller/controller')

router.post('/todos', jsonParser, postRabbit);
router.get('/todos', getTodos)

module.exports = router