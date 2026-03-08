import { type IBookRepository } from './IBook.repository';  
import { type Book } from '../models/book';  

export class InMemoryBookRepository implements IBookRepository {  
  private books: Book[] = [];  

  async findAll(): Promise<Book[]> {  
    return this.books;  
  }  

  async findById(id: string): Promise<Book | null> {  
    return this.books.find(book => book.id === id) || null;  
  }  

  async save(book: Book): Promise<void> {
    // Ensure we update the book if it already exists
    const existingIndex = this.books.findIndex(b => b.id === book.id);
    if (existingIndex !== -1) {
      this.books[existingIndex] = book;
    } else {
      this.books.push(book);  
    }
  }  
}