import exp from "express"
import connectDB from "./DB/connect.js"
import dotenv from "dotenv"
import indexRouter from "./routes/index.routes.js"
import cors from "cors"

dotenv.config();

const app = exp();
connectDB();

app.use(exp.json());
app.use(cors());  // becoz front and back are hosted on diff urls 

app.get("/",(req,res)=>{
    res.send("hi there!")
})

app.use("/api/v1",indexRouter);

// global catches: i did not want user to see the proper error becoz user can get to know about the backend logic,it takes 4 arguments

app.use((err,req,res,next)=>{
    res.status(500).send("Something went wrong!")
})

app.listen(3000);