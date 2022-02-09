import { Stripe } from "stripe";
import images from "../models/Image.js";
import path from "path";
import sessions from "../models/Session.js";
import { config } from "dotenv";
config();
const STRIPE_PRIVATE_KEY = process.env.STRIPE_PRIVATE_KEY;
if (!STRIPE_PRIVATE_KEY)
    throw new Error("Could not get any Stripe API access key from the execution enviroment. Make sure that the variable name is STRIPE_PRIVATE_KEY");
const stripe = new Stripe(STRIPE_PRIVATE_KEY, {
    apiVersion: "2020-08-27",
    typescript: true
});
const createCheckoutSession = async (req, res) => {
    const session = sessions.find(s => s.id === req.params.session_id);
    if (!session)
        return res.status(400);
    session.boughtImages = req.body.items;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: req.body.items.map((item) => {
                const storeItem = images.find(img => img.id === item.id);
                if (!storeItem)
                    throw new Error("cannot find the requested item");
                return {
                    price_data: {
                        currency: "eur",
                        product_data: {
                            name: storeItem.filename,
                        },
                        unit_amount: 300
                    },
                    quantity: 1
                };
            }),
            success_url: process.env.NODE_ENV === "production" ? `https://fotosport-server.herokuapp.com/success` : "http://localhost:5000/success",
            cancel_url: process.env.NODE_ENV === "production" ? `https://fotosport-server.herokuapp.com/cancel` : "http://localhost:5000/cancel"
        });
        res.json({ url: session.url, boughtImages: req.body.items });
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
};
const sendSuccessPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../payment/success.html"));
};
const sendCancelPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../payment/cancel.html"));
};
export { createCheckoutSession, sendSuccessPage, sendCancelPage };
