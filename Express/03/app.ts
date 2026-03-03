import express from "express";
import router from "./routes/product.routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/products", router);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
