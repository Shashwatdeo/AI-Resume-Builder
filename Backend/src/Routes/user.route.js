import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.js";
import { validateRegistration, validateLogin, validatePasswordReset, handleValidationErrors, sanitizeInput } from "../Middleware/validation.js";
import { getCurrentUser, loginUser,logoutUser,registerUser, forgotPassword, resetPassword} from "../Controllers/user.controller.js";
const router = Router()

router.route("/register").post(
    sanitizeInput,
    validateRegistration,
    handleValidationErrors,
    registerUser
  );

router.route("/login").post(
    sanitizeInput,
    validateLogin,
    handleValidationErrors,
    loginUser
)

router.route("/logout").post(verifyJWT,logoutUser)
router.route("/currentUser").get(verifyJWT,getCurrentUser)

// Password reset routes
router.route("/forgot-password").post(
    sanitizeInput,
    forgotPassword
)

router.route("/reset-password").post(
    sanitizeInput,
    validatePasswordReset,
    handleValidationErrors,
    resetPassword
)

export default router