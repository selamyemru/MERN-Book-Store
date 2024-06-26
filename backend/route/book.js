import express from 'express';
import Book from '../model/book.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
router.post('/addbook', async (req, res) => {
  try {
    const { name, description, author, price, publisher,image,category } = req.body;
    if (!name || !description || !author || !price || !publisher||!image||!category) {
      return res.status(400).json({ msg: 'All fields are required' });
    }
    const newBook = new Book({ name, description, author, price, publisher,image,category });
    const [bookData] = (await Promise.all([newBook.save()]));
    res.status(201).json({ book: bookData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while saving the data' });
  }
});
router.get('/getbook', async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });;
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the books' });
  }
});
router.get('/getbook/:id', async (req, res) => {
  const id= req.params;
  try {
    const books = await Book.findById( new ObjectId(id));
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the books' });
  }
});

router.put('/editbook/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, author, publisher ,image,category} = req.body;

  try {
    if (!name || !description || !price || !author || !publisher||!image||!category) {
      return res.status(400).json('Field cannot be empty!');
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { name, description, price, author, publisher,image ,category},
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
});
router.get('/book/category',async(req,res)=>{
  try {
    const category=await Book.distinct('category');
    if(!category){
      res.status(404).json('category not found!')
    }
    res.json(category);
  } catch (error) {
    console.error(error)
  }
})
router.get('/getcategorybook', async (req, res) => {
  const { category } = req.query;
  try {
    let filteredBooks = await Book.find({});
    if (category) {
      filteredBooks = await Book.find({ category });
    }
    res.json(filteredBooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred while fetching the books' });
  }
});
router.delete('/deletebook/:id',async(req,res)=>{
  const id=req.params.id;
  try {
    const delbook=await Book.findByIdAndDelete(id)
    if(!delbook){
      res.send('The Resource not found!')
    }
    res.send('Successfully deleted!')
    
  } catch (error) {
    console.error("The resource can not be deleted!")
    
  }
})
export default router;