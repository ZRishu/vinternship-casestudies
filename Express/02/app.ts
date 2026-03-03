import express, { type Request, type Response } from "express";
import path from "path";
import eventsRouter from "./routes/events";
import classesRouter from "./routes/classes";
import contactRouter from "./routes/contact";

const app = express();
const port = 3000;


app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Greenfield Community Center!");
});

app.use("/events", eventsRouter);

app.use("/classes", classesRouter);

app.use("/contact", contactRouter);

app.listen(port, () => {
  console.log(`Community Center server running at http://localhost:${port}`);
});
