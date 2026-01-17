import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    completedLessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lesson",
    }],
}, { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);