const io = require('socket.io')(4000);
const amqp = require('amqplib/callback_api');

amqp.connect('amqp://admin:password@172.17.0.1:5672', function (error0, connection) {
    if (error0) {
        throw error0;
    }

    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        const queue = 'todos';
        channel.assertQueue(queue);
        console.log("Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(msg.content.toString())
            const a = msg.content.toString()
            const b = JSON.parse(a)
            io.emit('message', b);
        }, {
            noAck: true
        });
    });
});