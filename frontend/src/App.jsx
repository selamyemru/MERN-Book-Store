import AddBook from "./pages/AddBook";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BookList from "./pages/BookList";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Profile from "./pages/Profile";
import EditBook from "./pages/EditBook";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/booklist" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/editbook/:id" element={<EditBook />} />
        <Route path="getbook/:id" element={<BookDetail />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;