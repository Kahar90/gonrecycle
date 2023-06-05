const stripe = require("stripe")(
  "sk_test_51NFblGHbXoq1M4h4UrD8eRBBnpMmAbjrHYwsQE95pAsdHE9RslL6EkESxmjVw7FUYODGGq4Oa3o0dfZkvkAZFYoG00b01erC8T"
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cart } = req.body;
    console.log(cart);

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
        line_items: cart.map((pizza) => {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: pizza.name,
              },
              unit_amount: pizza.price * 100,
            },
            quantity: 1,
          };
        }),
      });
      return res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
