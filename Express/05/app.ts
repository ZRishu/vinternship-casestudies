import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "success", message: "Server is running" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
