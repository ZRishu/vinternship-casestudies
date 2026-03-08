import type { Request, Response } from "express";
import { BookService } from "../services/book.service";

export class BookController {
  constructor(private bookService: BookService) {}

  async borrowBook(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (typeof id !== "string" || !id.trim()) {
        res.status(400).json({ error: "Valid book id is required" });
        return;
      }
      const book = await this.bookService.borrowBook(id);
      res.json(book);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Handle the returnBook HTTP request
  async returnBook(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (typeof id !== "string" || !id.trim()) {
        res.status(400).json({ error: "Valid book id is required" });
        return;
      }
      const book = await this.bookService.returnBook(id);
      res.json({
        status: "success",
        message: "Book returned successfully",
        book,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
