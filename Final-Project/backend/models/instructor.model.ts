import mongoose, {Schema, Document, model, Model}  from "mongoose";

interface IInstructor extends Document {
    name: string;
    employeeId: string;
    department: string;
    email: string;
    phone?: string;
    office?: string;
    createdAt: Date;

}

const instructorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: false },
    office: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const Instructor = model<IInstructor>('Instructor', instructorSchema);

export default Instructor;
