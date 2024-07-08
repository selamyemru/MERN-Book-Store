
import Book from '../model/book.js';

export const addBook = async (req, res) => {
  try {
    const { name, description, author, price, publisher, image, category } = req.body;
    if (!name || !description || !author || !price || !publisher || !image || !category) {
      return res.status(400).json({ msg: 'All fields are required' });
    }
    const newBook = new Book({ name, description, author, price, publisher, image, category });
    const [bookData] = (await Promise.all([newBook.save()]));
    res.status(201).json({ book: bookData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while saving the data' });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the books' });
  }
};

export const getBookById = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findById(new ObjectId(id));
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the book' });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, author, publisher, image, category } = req.body;

  try {
    if (!name || !description || !price || !author || !publisher || !image || !category) {
      return res.status(400).json('Field cannot be empty!');
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, description, price, author, publisher, image, category },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json('Book not found!');
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while updating the book' });
  }
};

export const deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({ msg: 'The resource not found!' });
    }
    res.status(200).json({ msg: 'Successfully deleted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while deleting the book' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Book.distinct('category');
    if (!categories) {
      res.status(404).json({ msg: 'Categories not found!' });
    }
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the categories' });
  }
};

export const getBooksByCategory = async (req, res) => {
  const { category } = req.query;
  try {
    let filteredBooks = await Book.find({});
    if (category) {
      filteredBooks = await Book.find({ category });
    }
    res.status(200).json(filteredBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the books' });
  }
};