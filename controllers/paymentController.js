const crypto = require("crypto");
const base64 = require("base-64");

const checkout = async (req, res) => {
  const { firstName, lastName, other, amount, currency, description, orderId } =
    req.body;
  const data = {
    version: 3,
    public_key: process.env.LIQPAY_API_KEY,
    action: "pay",
    amount: amount,
    currency: currency,
    description: description,
    order_id: orderId,
    language: "ru",
    customer: firstName + " " + lastName,
    info: other,
  };
  const dataBase64 = base64.encode(JSON.stringify(data));
  const signature = crypto
    .createHash("sha1")
    .update(
      process.env.LIQPAY_API_SECRET + dataBase64 + process.env.LIQPAY_API_SECRET
    )
    .digest("base64");
  res.json({ data: dataBase64, signature });
};

const paymentVerification = async (req, res) => {
  const { data, signature } = req.body;
  const isVerified =
    crypto
      .createHash("sha1")
      .update(
        process.env.LIQPAY_API_SECRET + data + process.env.LIQPAY_API_SECRET
      )
      .digest("base64") === signature;
  if (isVerified) {
    const decodedData = JSON.parse(base64.decode(data));
    const { status } = decodedData;
    if (status === "success" || status === "sandbox") {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } else {
    res.status(400).json({ error: "Invalid signature" });
  }
};

module.exports = {
  checkout,
  paymentVerification,
};
