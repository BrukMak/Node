import mongoose, { Document, Schema, model } from "mongoose";

// Define the TypeScript interface for a student document
interface IStudent extends Document {
    studentId: number;
    name: string;
    section?: string;
    email: string;
    phoneNumber: string;
    address?: string;
    enrollmentDate?: Date;
    courses: mongoose.Schema.Types.ObjectId[];
    department: string;
}

// Define the student schema
const studentSchema: Schema<IStudent> = new mongoose.Schema({
    studentId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    section: { type: String, default: "A" },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String },
    enrollmentDate: { type: Date, default: Date.now },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    department: { type: String, required: true }
});

// Create and export the Student model
const Student = model<IStudent>("Student", studentSchema);

export default Student;
