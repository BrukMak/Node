import mongoose, { Document, Schema } from "mongoose";

interface ITodo extends Document {
    title: string;
    description: string;
    completed: boolean;
}

const TodoSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Enter todo title"],
        },
        description: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;
