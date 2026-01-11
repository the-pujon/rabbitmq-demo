// const amqp = require("amqplib/callback_api");

// amqp.connect("amqp://localhost", (error0, connection) => {
//   if (error0) {
//     throw error0;
//   }

//   connection.createChannel((error1, channel) => {
//     if (error1) {
//       throw error1;
//     }

//     const queue = "pppp";
//     const msg = "Hello World!";

//     // Ensure the queue exists before sending a message
//     channel.assertQueue(queue, { durable: true });

//     console.log(" [x] Sending %s", msg);

//     // Send the message to the queue
//     for (let i = 1; i <= 1000000; i++) {
//       channel.sendToQueue(queue, Buffer.from(msg + " " + i));
//       console.log(" [x] Sent %s", msg + " " + i);
//     }
//   });

//   // Close the connection after a short delay to ensure the message is sent
//   setTimeout(() => {
//     connection.close();
//     process.exit(0);
//   }, 500);
// });

// const amqp = require("amqplib/callback_api");

// const startTime = Date.now();
// amqp.connect("amqp://localhost", (err, connection) => {
//   if (err) throw err;

//   connection.createConfirmChannel((err2, channel) => {
//     if (err2) throw err2;

//     const queue = "pppp";
//     const msg = "Hello World!";

//     channel.assertQueue(queue, { durable: true });

//     async function publishMessages() {
//       for (let i = 1; i <= 1000000; i++) {
//         const ok = channel.sendToQueue(queue, Buffer.from(msg + " " + i), {
//           persistent: true,
//         });

//         if (!ok) {
//           await new Promise((resolve) => channel.once("drain", resolve));
//         }

//         if (i % 10000 === 0) {
//           console.log("Sent:", i);
//         }
//       }

//       channel.waitForConfirms(() => {
//         console.log("All messages confirmed");
//         connection.close();
//         process.exit(0);
//       });
//     }

//     publishMessages();
//   });
// });
// const endTime = Date.now();
// console.log("Setup time:", endTime - startTime, "ms");

const amqp = require("amqplib/callback_api");

const startTime = Date.now();

amqp.connect("amqp://localhost", (err, connection) => {
  if (err) throw err;

  connection.createConfirmChannel((err2, channel) => {
    if (err2) throw err2;

    const queue = "pppp";
    const msg = "Hello World!";

    channel.assertQueue(queue, { durable: true });

    async function publishMessages() {
      for (let i = 1; i <= 1000000; i++) {
        const ok = channel.sendToQueue(queue, Buffer.from(msg + " " + i), {
          persistent: true,
        });

        if (!ok) {
          await new Promise((resolve) => channel.once("drain", resolve));
        }

        // no console.log here to measure pure sending
      }

      channel.waitForConfirms(() => {
        const endTime = Date.now();
        console.log("All messages confirmed");
        console.log("Publish time:", endTime - startTime, "ms");
        connection.close();
        process.exit(0);
      });
    }

    publishMessages();
  });
});
