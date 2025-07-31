import mongoose, { Schema } from "mongoose";
import { ITodos } from "types/todo";

const todoSchema: Schema<ITodos> = new Schema<ITodos>(
  {
    title: {
      type: String,
      required: [true, "Please enter todos"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model<ITodos>("Todo", todoSchema);
export default Todo;
