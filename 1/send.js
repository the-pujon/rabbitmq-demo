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
    const msg = "Hello World!";

    // Ensure the queue exists before sending a message
    channel.assertQueue(queue, { durable: false });

    console.log(" [x] Sending %s", msg);

    // Send the message to the queue
    channel.sendToQueue(queue, Buffer.from(msg));

    console.log(" [x] Sent %s", msg);
  });

  // Close the connection after a short delay to ensure the message is sent
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
});
