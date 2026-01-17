import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
    title: String,
    videoUrl: String,
    notesUrl: String,
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    lessons: [LessonSchema],
}, { timestamps: true }
);
 
export default mongoose.model("Course", CourseSchema);