const functions = require("firebase-functions");

exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  const stripe= require("stripe")("sndof");
  const session= await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost3000/success",
    cancel_url: "http://localhost3000/cancel",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "inr",
          unit_amount: (100)* 100,
          product_data: {
            name: "New Camera",
          },
        },
      },
    ],
  });

  return {
    id: session.id,
  };
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
