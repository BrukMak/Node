const express = require("express");
const router = express.Router();
const {
  addTask,
  getAllTasks,
  getTaskByID,
  updateTask,
  deleteTask,
} = require("../controllers/task.controllers");

router.post("/", addTask);
router.get("/", getAllTasks);
router.get("/:id", getTaskByID);
router.put("/:id", updateTask);
router.delete("/api/task/:id", deleteTask);

module.exports = router;
