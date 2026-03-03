import { Router, type Request, type Response } from "express";
import { products, type Product } from "../models/product.model";

const router = Router();

// GET all products
router.get("/", (req: Request, res: Response) => {
  res.status(200).json(products);
});

// GET product by ID
router.get("/:id", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  res.status(200).json(product);
});

// POST new product
router.post("/", (req: Request, res: Response) => {
  const { name, price, inStock } = req.body;
  if (!name || price === undefined || inStock === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newProduct: Product = {
    id: (products.length + 1).toString(),
    name,
    price,
    inStock,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product
router.put("/:id", (req: Request, res: Response) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  const id = typeof req.params.id === "string" ? req.params.id : undefined;
  if (!id) {
    return res.status(400).json({ error: "Invalid product id" });
  }
  const { name, price, inStock } = req.body;
  if (!name || price === undefined || inStock === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  products[productIndex] = { id, name, price, inStock };
  res.status(200).json(products[productIndex]);
});

// PATCH update product price
router.patch("/:id/price", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  const { price } = req.body;
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ error: "Invalid price" });
  }
  product.price = price;
  res.status(200).json(product);
});

// PATCH update product stock
router.patch("/:id/inStock", (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  const { inStock } = req.body;
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  if (typeof inStock !== "boolean") {
    return res.status(400).json({ error: "Invalid status" });
  }
  product.inStock = inStock;
  res.status(200).json(product);
});

// DELETE product
router.delete("/:id", (req: Request, res: Response) => {
  const productIndex = products.findIndex((p) => p.id === req.params.id);
  if (productIndex === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  products.splice(productIndex, 1);
  res.sendStatus(204);
});

export default router;
