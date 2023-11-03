import cookieSession from "cookie-session";
import express from "express";
import cors from "cors";
import passport from "./passport.js";
import authRoute from "./routes/auth.js";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import PatientRoute from "./routes/patient.js";
import UserRoute from "./routes/user.js";


app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);
dotenv.config();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json()); // This parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//connection to mongoDB
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true}).then(()=>{
  console.log("MongoDB connected");
}).catch((err)=>{
  console.log(err);
});


app.use("/auth", authRoute);

app.use("/patients",PatientRoute);

app.use("/users",UserRoute);

app.listen("5000", () => {
  console.log("Server is running at port 5000");
});
