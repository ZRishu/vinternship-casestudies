import express, { type Request, type Response } from "express";

const app = express();
const port = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Greenfield Community Center!");
});

app.get("/events", (_req: Request, res: Response) => {
  const events = [
    "Yoga Class - Monday 7pm",
    "Gardening Workshop - Wednesday 5pm",
    "Book Club - Friday 6pm",
  ];
  res.json(events);
});

app.get("/contact", (_req: Request, res: Response) => {
  const contact = {
    name: "Greenfield Community Center",
    email: "gcc@gmail.com",
    phone: "+91 3723829383",
  };
  res.json(contact);
});

app.listen(port, () => {
  console.log(`Community Center server running at http://localhost:${port}`);
});
