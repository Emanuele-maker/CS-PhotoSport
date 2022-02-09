import crypto from "crypto";
import sessions from "../models/Session.js";
function generateSession() {
    const newSession = {
        id: crypto.randomBytes(16).toString("hex"),
        bought: false,
        boughtImages: []
    };
    sessions.push(newSession);
    return newSession;
}
const beginSession = (req, res) => {
    const toFindSession = sessions.find(session => session.id === req.params.session_id);
    if (!req.params.session_id || !toFindSession) {
        const session = generateSession();
        return res.json({ session: session });
    }
    else {
        return res.json({ session: toFindSession });
    }
};
export { beginSession };
