import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    department: { type: String, required: true },
    credits: { type: Number },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

export default Course;
