const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success !",
  });
});

app.post("/payment/create", async (req, res) => {
  //  // parseInt is for convert number
  const total = parseInt(req.query.total);
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be grater than 0",
    });
  }
});

app.listen("1111", (err) => {
  if (err) throw err ;
  console.log("Amazon server runing on port: 1111, http://localhost:1111");
});


