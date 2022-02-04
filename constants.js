import crypto from "crypto";
const SECRET_IMAGES_LOCATION = crypto.randomBytes(12).toString("hex");
const STRIPE_PRIVATE_KEY = "sk_test_51K70ndGAxcO40dtlfGBXA7hdtTspL7IfV4zqvONyhFtWxbDLWI1GZ74OicjK4nvM7500PZt5XOZUsN8G0aA0tHeh00xLbFDOTo";
export { STRIPE_PRIVATE_KEY, SECRET_IMAGES_LOCATION, };
