import { prismaClient } from 'db/client';
import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/user", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const user = await prismaClient.user.create({
      data: {
        username,
        password,
      },
    });
    res.status(201).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});