import express from "express";
import {getStudents, addStudents, getStudentByID, updateStudent, deleteStudent } from "../controllers/student.controller";

const router = express.Router();

router.get("/", getStudents);   // get all students
router.post("/", addStudents);   // add student
router.get("/:id", getStudentByID);    // get student by ID
router.put("/:id", updateStudent);   // update student
router.delete("/:id", deleteStudent);   // delete student

export default router;
