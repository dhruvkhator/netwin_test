export interface User{
    _id: string,
    name: string,
    email: string
}

export type TaskStatus = "pending"| "in-progress" | "completed";

export interface Task {
    _id: string;
    title: string;
    status: TaskStatus;
    createdBy: string;
    createdAt: string;
}