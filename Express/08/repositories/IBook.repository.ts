import { type Book } from '../models/book';

export interface IBookRepository {  
  findAll(): Promise<Book[]>;  
  findById(id: string): Promise<Book | null>;  
  save(book: Book): Promise<void>;  
}