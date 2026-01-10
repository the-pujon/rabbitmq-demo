const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (error0, connection) => {
  if (error0) {
    throw error0;
  }

  connection.createChannel((error1, channel) => {
    if (error1) {
      throw error1;
    }

    const queue = "hello";

    // Ensure the queue exists before sending a message
    channel.assertQueue(queue, { durable: false });

    console.log(" [x] Waiting for messages in %s. To exit press CTRL+C", queue);

    // Set up a consumer to receive messages from the queue
    channel.consume(
      queue,
      (msg) => {
        console.log(" [x] Received %s", msg.content.toString());
      },
      { noAck: true }
    );
  });
});
