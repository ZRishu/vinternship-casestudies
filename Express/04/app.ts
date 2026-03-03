import express from "express";
import loyaltyRoutes from "./routes/loyalty.routes";
import { errorHandler } from "./middlewares/error.middleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/", loyaltyRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
