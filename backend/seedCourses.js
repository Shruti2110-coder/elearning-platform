import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/Course.js";

dotenv.config();

const courses = [
  {
    title: "HTML & CSS Basics",
    description: "Learn web basics from scratch",
    lessons: [
      {
        title: "HTML Introduction",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notesUrl: "https://www.w3schools.com/html/"
      },
      {
        title: "CSS Basics",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        notesUrl: "https://www.w3schools.com/css/"
      }
    ]
  },
  {
    title: "JavaScript Mastery",
    description: "Become a JavaScript pro",
    lessons: [
      {
        title: "JS Syntax",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notesUrl: "https://www.w3schools.com/js/"
      },
      {
        title: "Functions & Loops",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        notesUrl: "https://www.w3schools.com/js/js_functions.asp"
      }
    ]
  },
  {
    title: "React for Beginners",
    description: "Build React apps step by step",
    lessons: [
      {
        title: "Introduction to React",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notesUrl: "https://reactjs.org/docs/getting-started.html"
      },
      {
        title: "JSX and Components",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        notesUrl: "https://reactjs.org/docs/components-and-props.html"
      }
    ]
  }
];

mongoose.connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("MongoDB connected");
    await Course.deleteMany(); // delete old courses
    await Course.insertMany(courses);
    console.log("Courses seeded successfully");
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
