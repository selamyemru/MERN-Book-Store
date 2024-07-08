import { NavLink} from "react-router-dom";
import {  FaShoppingCart, FaUserCircle } from "react-icons/fa";
function Navbar() {

  return (
    <header className="z-10 flex flex-col gap-6 sm:flex-row  sm:justify-between px-28 py-4 items-center text-green-800  bg-gray-200 fixed w-full top-0 ">
      <h1 className="text-2xl  font-semibold">Enho Book</h1>
      <nav className="font-semibold flex  gap-4 items-center ">
        {/* <NavLink to="/booklist">Admin</NavLink> */}
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/profile" ><FaUserCircle size={18}/></NavLink>
        <NavLink to="/cartitem" ><FaShoppingCart size={18}/></NavLink>

      </nav>
    </header>
  );
}
export default Navbar;