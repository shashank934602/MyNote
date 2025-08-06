import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import path from "path"

import notesRoutes from "./routes/notesRoutes.js"
import connectDB from "./config/db.js";

import rateLimiter from "../middleware/rateLimiter.js";



dotenv.config()
const app  = express()
const port = process.env.port||5001
const __dirname = path.resolve()

if (process.env.NODE_ENV !== "production"){
    app.use(cors({
    origin: "http://localhost:5173"
})
    )

}

app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes",notesRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")))

if (process.env.NODE_ENV === "production"){
  app.use(express.static (path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  }); I
}

connectDB().then(()=>{
app.listen(port,()=>{
    console.log("server is running on port :",port);
})

})

// mongodb+srv://vavilalashashank100:iTgtc1ykaxnuAZ91@cluster0.j97c3ux.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0