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

// const amqp = require("amqplib/callback_api");
// const startTime = Date.now();
// amqp.connect("amqp://localhost", (error0, connection) => {
//   if (error0) throw error0;

//   connection.createChannel((error1, channel) => {
//     if (error1) throw error1;

//     const queue = "pppp";

//     channel.assertQueue(queue, { durable: true });

//     channel.prefetch(50);

//     console.log(" [x] Waiting for messages in %s", queue);

//     channel.consume(
//       queue,
//       (msg) => {
//         // console.log(" [x] Received %s", msg.content.toString());

//         // simulate some work if needed
//         // setTimeout(() => {
//         channel.ack(msg);
//         // }, 10);
//       },
//       { noAck: false }
//     );
//     console.log("all done");
//   });
// });
// const endTime = Date.now();
// console.log("Setup time:", endTime - startTime, "ms");
// // const amqp = require("amqplib/callback_api");

// const amqp = require("amqplib/callback_api");

// const startTime = Date.now();

// amqp.connect("amqp://localhost", (error0, connection) => {
//   if (error0) throw error0;

//   connection.createChannel((error1, channel) => {
//     if (error1) throw error1;

//     const queue = "pppp";
//     let receivedCount = 0;

//     channel.assertQueue(queue, { durable: true });
//     channel.prefetch(50000);

//     channel.consume(
//       queue,
//       (msg) => {
//         // process message
//         // channel.ack(msg);
//         receivedCount++;

//         if (receivedCount % 100000 === 0) {
//           channel.ack(msg, true); // ack all messages up to this one
//         }

//         // When all messages are received, calculate time
//         if (receivedCount === 1000000) {
//           const endTime = Date.now();
//           console.log("All messages received");
//           console.log("Consumer processing time:", endTime - startTime, "ms");
//           connection.close();
//           process.exit(0);
//         }
//       },
//       { noAck: false }
//     );
//   });
// });
