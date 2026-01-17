import express from "express";
import Enrollment from "../models/Enrollment.js";
import { protect } from "../middleware/authMiddleware.js";




const router = express.Router();

//Enroll in courses

router.post("/", protect, async(req, res)=>{
    const enrollment = await Enrollment.create({
        student: req.user.id,
        course: req.body.courseId,
        completedLessons: [],
    });
    res.json(enrollment);
})

//get student's  enrollment
router.get("/my", protect, async(req, res) => {
    const enrollments = await Enrollment.find({ student: req.user.id}).populate("course");
    res.json(enrollments);
})

//mark lessos

router.put("/completed", protect, async(req, res)=> {
    const {enrollmentId, lessonIndex} = req.body;
    const enrollment = await Enrollment.findById(enrollmentId);
      if (!enrollment.completedLessons.includes(lessonIndex)) {
    enrollment.completedLessons.push(lessonIndex);
  }
  await enrollment.save();
  res.json(enrollment);
})

export default router;