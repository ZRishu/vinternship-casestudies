import express from 'express';  
import { BookController } from './controllers/book.controller';  
import { BookService } from './services/book.service';  
import { InMemoryBookRepository } from './repositories/InMemoryBook.repository';  

const app = express();  
app.use(express.json());  

// Dependency Injection Setup
const bookRepository = new InMemoryBookRepository();  

// Seed the in-memory database with a test book
bookRepository.save({
  id: "1",
  title: "The Pragmatic Programmer",
  author: "Andy Hunt and Dave Thomas",
  isBorrowed: false
});

const bookService = new BookService(bookRepository);  
const bookController = new BookController(bookService);  

app.post('/books/:id/borrow', (req, res) => bookController.borrowBook(req, res));  

// Register the new return route
app.post('/books/:id/return', (req, res) => bookController.returnBook(req, res));

const port = 3000;  
app.listen(port, () => {  
  console.log(`Library system running on port ${port}`);  
});