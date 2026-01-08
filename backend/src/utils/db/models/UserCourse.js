import mongoose from "mongoose";
import User from "./User.js";
import Course from "./Course.js";

const userCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  },
  { timestamps: true }
);

const UserCourse = mongoose.model("UserCourse", userCourseSchema);

export default UserCourse;
