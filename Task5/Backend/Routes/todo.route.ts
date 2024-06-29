import express from "express";
import {
    addTodo,
    getAllTodos,
    getTodoByID,
    updateTodo,
    deleteTodo
} from "../Controllers/todo.controller";

const router = express.Router();

router.post("/", addTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoByID);  // :id should be a placeholder for dynamic ID
router.put("/:id", updateTodo);  // :id should be a placeholder for dynamic ID
router.delete("/:id", deleteTodo);  // :id should be a placeholder for dynamic ID

export default router;
