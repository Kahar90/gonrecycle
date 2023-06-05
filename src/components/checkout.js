import { loadStripe } from "@stripe/stripe-js";
import { Button } from "antd";
import axios from "axios";

const stripePromise = loadStripe(
  "pk_test_51NFblGHbXoq1M4h4KUKrRCrY9RLiFQDYi9o43VG8CVdBPxQMsgiGxeqq6QzURSByqUOcOHMw5VfUpCuz0HtNBcDD00xUvw9Kra"
);

export default function Checkout({ cart, buttonStyle }) {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      const checkoutSession = await axios.post("/api/checkout-session", {
        cart,
      });

      

      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button style={buttonStyle} onClick={handleCheckout}>
        {" "}
        Place Order{" "}
      </Button>
    </div>
  );
}
