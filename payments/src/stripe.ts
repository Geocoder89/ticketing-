import Stripe from "stripe";
// import Paystack = require('paystack');


// export const paystack = Paystack(process.env.STRIPE_KEY!)
export const stripe = new Stripe(process.env.STRIPE_KEY!,{
  apiVersion: '2022-11-15',
})

