import { Router } from "express";
import { beginSession } from "../controllers/sessionControllers.js";
const router = Router();
router.get("/begin-session/:session_id?", beginSession);
export { router };
