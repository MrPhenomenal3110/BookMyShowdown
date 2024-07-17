import express from 'express';

const router = express.Router();

import { registerUser, getCurrentUser, loginUser, forgotPassword, resetPassword } from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

router.post("/register", registerUser);
  
router.post("/login", loginUser);
  
router.get("/get-current-user", auth, getCurrentUser);
  
router.patch("/forgot-password", forgotPassword);
  
router.patch("/reset-password", resetPassword);

export default router
