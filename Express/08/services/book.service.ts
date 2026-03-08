import { type IBookRepository } from '../repositories/IBook.repository';  
import { type Book } from '../models/book';  

export class BookService {  
  constructor(private bookRepository: IBookRepository) {}  

  async borrowBook(bookId: string): Promise<Book> {  
    const book = await this.bookRepository.findById(bookId);  
    if (!book) throw new Error('Book not found');  
    if (book.isBorrowed) throw new Error('Book already borrowed');  

    const updatedBook = { ...book, isBorrowed: true };  
    await this.bookRepository.save(updatedBook);  
    return updatedBook;  
  }

  // Add returnBook business logic
  async returnBook(bookId: string): Promise<Book> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) throw new Error('Book not found');
    if (!book.isBorrowed) throw new Error('Book is not currently borrowed');

    const updatedBook = { ...book, isBorrowed: false };
    await this.bookRepository.save(updatedBook);
    return updatedBook;
  }
}