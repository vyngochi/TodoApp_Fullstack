import { Router } from "express";
import { login, refreshToken, register } from "../controllers/auth.controller";
import { getProfile } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

//authentication
router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken);

//user information
router.get("/profile", authenticate, getProfile);

export default router;
