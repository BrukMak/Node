import { Request, Response } from 'express';
import StudentData from "../models/student.model";
import { request } from 'express';

// read all students
export const getStudents = async (req: Request, res:Response) => {
  try {
    const allStudents = await StudentData.find({});
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// add student
export const addStudents = async (req: Request, res:Response ) => {
  try { 
  const {studentId, name, section, email, phoneNumber, address, enrollmentDate, courses, department} = req.body;
  if (!studentId || !name || !email || !phoneNumber || !department) {
    return res.status(400).json({ error: 'Student ID, Name, Email, Phone Number, and Department are required' });
  } 
    const newStudent = await StudentData.create(req.body);
    res.status(200).json(newStudent);
  }
  catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get student by ID
export const getStudentByID = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const student = await StudentData.findById(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    } 
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Update student controller
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updatedStudent = await StudentData.findByIdAndUpdate(id, req.body, { new: true });  
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

// Delete student
export const deleteStudent = async (req: Request, res: Response) => {
  console.log("Delete student controller");
  try { 
    const {id} = req.params;
    console.log(id);
    const deletedStudent = await StudentData.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({message: "Student deleted successfully"});
  }
  catch (error) {
    res.status(500).json({ message: (error as Error).message });
    
  }
};


