import express from "express";
import {
  registerUser,
  userLogin,
  getProfile,
} from "../controllers/auth.controllers.js";
import authenticate from "../middleware/auth.middleware.js";

const router = express.Router();

//routes

router.post("/register", registerUser);
router.post("/login", userLogin);

// get profile
router.get("/profile", authenticate, getProfile);

export default router;
