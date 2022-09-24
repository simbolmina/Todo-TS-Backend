import express from "express";
import loginRouter from "./routes/userRoutes";
import todoRouter from "./routes/todoRoutes";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

//body encoder
app.use(bodyParser.json());

//routers
app.use("/api/user", loginRouter);
app.use("/api/todo", todoRouter);

mongoose
  .connect(
    "mongodb+srv://simbolmina:Tcsg-134ATLAS@cluster0.79oxdag.mongodb.net/todo?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("DB connection is ok, listening on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
