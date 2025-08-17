import { Router } from "express";
import { verifyJWT } from "../Middleware/auth.js";
import { AnalyzeResume,  deleteProfile,  evaluateDsaCode, evaluateProjectAnswer, evaluateTechnicalAnswer, generateDsaQuestions, generateProjectQuestions, generateResumePdf, generateTechnicalQuestions, getAllProfiles, getAllProfilesId,  } from "../Controllers/resume.controller.js";
import { upload } from "../Middleware/multer.js";

const router = Router()


router.route("/userProfiles").post(verifyJWT, upload.single('resume'), AnalyzeResume);
router.route("/").get(verifyJWT,getAllProfiles);
router.route("/:id").get(verifyJWT, getAllProfilesId);
router.route("/:id").delete(verifyJWT, deleteProfile)
router.route("/generate-dsa-questions").post(verifyJWT, generateDsaQuestions)
router.route("/evaluate-dsa").post(verifyJWT, evaluateDsaCode)
router.route("/generate-technical-questions").post(verifyJWT, generateTechnicalQuestions);
router.route("/evaluate-technical-answer").post(verifyJWT, evaluateTechnicalAnswer);
router.route("/generate-project-questions").post(verifyJWT, generateProjectQuestions);
router.route("/evaluate-project-answer").post(verifyJWT, evaluateProjectAnswer);


export default router