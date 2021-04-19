const PaymentModel = require("../../models/payment/payment.model.js")

const { response200WithMessage, response201WithMessage, response500WithMessage } = require("../../helpers/expressRes.js")

const stripe = require("stripe")(process.env.STRIPE_KEY)

const payment = async (req, res) => {
  const userId = req.user[1]
  const subscription = req.body.subscription
  const bankCard = req.body.bankCard

  const paymentIntent = await stripe.paymentIntent
    .create({
      amount: product.price * 100,
      currency: "eur",
      description: "x1" + " " + subscription,
      statement_descriptor: "x1" + " " + subscription.substr(0, 22),
    })
    .then(() => {
      return response201WithMessage(res, "successful")
    })
    .catch(() => {
      return response500WithMessage(res, "failed")
    })

  try {
    const data = await PaymentModel.payment(userId, subscription, bankCard)
    return response200WithMessage(res, "your payment has been made")
  } catch (e) {
    return response500WithMessage(res, e)
  }
}

module.exports = {
  payment,
}
