import express from "express";
import bodyParser from "body-parser";
import { Stripe } from "stripe";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { STRIPE_PRIVATE_KEY, SECRET_IMAGES_LOCATION } from "./constants.js";
import crypto from "crypto";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const stripe = new Stripe(STRIPE_PRIVATE_KEY, {
    apiVersion: "2020-08-27",
    typescript: true
});
// Middleware
app.use(express.static(path.join(__dirname, "/build")));
app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));
let images = [];
const sessions = [];
fs.readdir(path.join(__dirname, "/img"), (err, albums) => {
    if (err)
        return console.log(`Unable to open dir: `, err);
    albums.forEach(album => {
        fs.readdir(path.join(__dirname, `/img/${album}`), (err, files) => {
            if (err)
                return console.log(`Unable to open dir: `, err);
            files.forEach((fileName, i) => {
                images.push({
                    path: path.join(__dirname, `/img/${album}/${fileName}`),
                    original: fs.readFileSync(path.join(__dirname, `/img/${album}/${fileName}`)).toString("base64"),
                    index: i,
                    id: crypto.randomBytes(16).toString("hex"),
                    album: album,
                    filename: fileName,
                    previewPath: path.join(__dirname, `/previews/${album}/${fileName}`),
                    preview: fs.readFileSync(path.join(__dirname, `/previews/${album}/${fileName}`)).toString("base64")
                });
            });
        });
    });
});
function generateSession() {
    const newSession = {
        id: crypto.randomBytes(16).toString("hex"),
        bought: false,
        boughtImages: []
    };
    sessions.push(newSession);
    return newSession;
}
app.get("/begin-session/:session_id?", (req, res) => {
    const toFindSession = sessions.find(session => session.id === req.params.session_id);
    if (!req.params.session_id || !toFindSession) {
        const session = generateSession();
        return res.json({ imagesLocation: SECRET_IMAGES_LOCATION, session: session });
    }
    else {
        return res.json({ session: toFindSession, imageLocation: SECRET_IMAGES_LOCATION });
    }
});
app.get(`/${SECRET_IMAGES_LOCATION}/:img_id`, (req, res) => {
    const img = images.find(image => image.id === req.params.img_id);
    if (!img)
        return res.status(400);
    res.json(fs.readFileSync(img.path).toString("base64"));
});
app.get("/images/:album_name", (req, res) => {
    const imagesToSend = images.filter(image => image.album === req.params.album_name);
    res.json(imagesToSend);
});
app.get("/previews/:img_id", (req, res) => {
    const image = images.find(image => image.id === req.params.img_id);
    if (!image)
        return res.status(404);
    res.sendFile(image.previewPath);
});
app.post("/checkout/:session_id", async (req, res) => {
    const session = sessions.find(s => s.id === req.params.session_id);
    if (!session)
        return res.status(400);
    session.bought = true;
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
});
app.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "/success.html"));
});
app.get("/cancel", (req, res) => {
    res.sendFile(path.join(__dirname, "/cancel.html"));
});
// Server listening
app.listen(process.env.PORT || 5000, () => console.log(`Server listening on port 5000`));
