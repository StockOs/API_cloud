const stripe = require("stripe")("sk_test_51IhsigDSZiNelETqeNJBlo62FfbUsZBk3CfkZ0ROhugBYjX6rVybIM1LXCvE35G6mf7HVh7Ai0V4zxEYb0QbD1LN00lsebOGYP")
const PaymentModel = require("../../models/payment/payment.model.js")
const { response201WithMessage, response400WithMessage, response500WithMessage } = require("../../helpers/expressRes.js")

const payment = async (req, res) => {
  const name = req.body.name

  const cardNumber = req.body.cardNumber
  const expMonth = req.body.expMonth
  const expYear = req.body.expYear
  const cardCVC = req.body.cardCVC

  const firebaseId = req.user[0][0].uid

  let paymentMethod
  let customers
  let paymentToCustomer
  let paymentIntent
  let charge

  try {
    paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: cardNumber,
        exp_month: expMonth,
        exp_year: expYear,
        cvc: cardCVC,
      },
    })
  } catch (e) {
  }

  try {
    customers = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: name,
    })
  } catch (e) {
  }

  let id = customers.id

  try {
    paymentToCustomer = await stripe.paymentMethods.attach(paymentMethod.id, { customer: id })
  } catch (e) {
  }
  try{
    charge = await stripe.charges.create({
    amount: 1000,
    currency: 'eur',
    source: 'tok_visa',
    description: 'Subscribe at stockOs',
  });
  }catch(e){

  }
  try {
    const data = await PaymentModel.payment(cardNumber, firebaseId)
    if (!data) {
      return response400WithMessage(res, "Your bankcard is invalid")
    }
    return response201WithMessage(res, "Successful payment")
  } catch (e) {
    return response500WithMessage(res, "Oups ! error T_T")
  }
  
}

module.exports = { payment }

