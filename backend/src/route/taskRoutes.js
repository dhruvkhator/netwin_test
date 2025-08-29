import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../controller/taskController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = Router();


router.post("/", protect ,createTask);
router.get("/", protect ,getTasks);
router.put("/:id", protect ,updateTask);
router.delete("/:id", protect ,deleteTask);

export default router;