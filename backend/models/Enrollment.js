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
        type: Number 
    }],
}, { timestamps: true }
);

export default mongoose.model("Enrollment", enrollmentSchema);