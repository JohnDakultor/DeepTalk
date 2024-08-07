import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/signup", AuthController.signUp);
router.get("/user", verifyJWT, AuthController.getUser);

export default router;
