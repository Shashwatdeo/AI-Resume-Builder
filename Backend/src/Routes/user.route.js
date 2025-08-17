import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.js";
import { getCurrentUser, loginUser,logoutUser,registerUser, forgotPassword, resetPassword} from "../Controllers/user.controller.js";
const router = Router()

router.route("/register").post(
    registerUser
  );

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/currentUser").get(verifyJWT,getCurrentUser)

// Password reset routes
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password").post(resetPassword)

export default router