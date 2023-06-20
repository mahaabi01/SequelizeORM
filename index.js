import express from "express";
import userRouter from "./routes/userRoutes.js";
import connection from "./models/index.js"


const app = express();

app.use(express.json());

//for router
app.use("/user", userRouter)

//connecting to database
app.listen(8000, async () => {
  console.log("Server has started.");

  try{
  await connection.authenticate();
  connection.sync({ force: false });
  console.log("Conncetion has been established successfully")
  }
  catch(err){
    console.log("Unable to connect to the database:", err);
  }
});
