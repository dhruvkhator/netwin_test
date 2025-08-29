import {z} from "zod";

export const taskSchema = z.object({
    title: z.string().min(3, "Title too short"),
    status: z.enum(["pending", "in-progress", "completed"])
})