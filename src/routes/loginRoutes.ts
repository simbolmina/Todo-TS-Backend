import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const newUser = {
    username,
    password,
    role: "user",
    id: Math.random().toString(36).substring(2, 5),
  };
  res.status(201).json({ newUser });
});

export default router;
