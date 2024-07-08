
import express from 'express';
import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getCategories,
  getBooksByCategory,
} from '../controller/book.js';

const router = express.Router();

router.post('/addbook', addBook);
router.get('/getbook', getBooks);
router.get('/getbook/:id', getBookById);
router.put('/editbook/:id', updateBook);
router.delete('/deletebook/:id', deleteBook);
router.get('/book/category', getCategories);
router.get('/getcategorybook', getBooksByCategory);

export default router;