import { Router } from "express";
import { login, signup } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();



router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, (req, res) => {
	res.json({ user: req.user });
});

export default router;