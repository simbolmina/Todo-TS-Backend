import express, { Request, Response } from "express";
import loginRouter from "./routes/loginRoutes";

const app = express();

//body encoder
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req: Request, res: Response) => {
  res.send(`
      <h1>Welcome!</h1>
      `);
});
app.use(loginRouter);

app.listen(5000, () => {
  console.log("listening on port 5000");
});
