const stripe = require("stripe")("sk_test_51IhsigDSZiNelETqeNJBlo62FfbUsZBk3CfkZ0ROhugBYjX6rVybIM1LXCvE35G6mf7HVh7Ai0V4zxEYb0QbD1LN00lsebOGYP")
const PaymentModel = require("../../models/payment/payment.model.js")
const { response201WithMessage, response400WithMessage, response500WithMessage } = require("../../helpers/expressRes.js")

const payment = async (req, res) => {
  const name = req.body.name
  const cardNumber = req.body.cardNumber

  const firebaseId = req.user[0][0].uid

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: name
    })
    .then((customer) => {
      return stripe.paymentIntents.create({
        amount: 4000,
        description: "Subscribe at stockOs",
        currency: "eur",
        customer: customer.id,
      })
    })
    .then(() => {
      try {
        const data = PaymentModel.payment(cardNumber, firebaseId)
        if (!data) {
          return response400WithMessage(res, "Your bankcard is invalid")
        }
        return response201WithMessage(res, "Successful payment")
      } catch (e) {
        return response500WithMessage(res, "Oups ! error T_T")
      }
    })
    .catch((err) => {
      res.send(err)
    })
}

module.exports = { payment }