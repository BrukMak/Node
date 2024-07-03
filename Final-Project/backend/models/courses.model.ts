
import mongoose, {Document, Schema, model} from "mongoose"; 

// Define the TypeScript interface for a course document
interface ICourse extends Document {
    name: string;
    code: string;
    description?: string;
    credits?: number;
    ects?: number;
    semester?: string;
    instructor?: mongoose.Schema.Types.ObjectId;
    students: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    passOrFail?: boolean;
}

const courseSchema: Schema<ICourse> = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    description: { type: String, required: false },
    credits: { type: Number, required: false },
    ects: { type: Number, required: false },
    semester: { type: String, required: false },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor', required: false },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    createdAt: { type: Date, default: Date.now },
    passOrFail: { type: Boolean, required: false }
});

const Course = model<ICourse>('Course', courseSchema);

export default Course;
