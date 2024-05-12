import { AlignJustify, X } from 'lucide-react';
import { useState } from 'react';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  }
  return (
    <>
    <nav className="h-20 md:h-24 flex flex-row items-center justify-between">
      <h1 className="font-bold text-[1.7rem] mx-6 md:mx-10 text-gray-700 md:text-3xl"><b className="text-emerald-400">Course</b>search</h1>
      <button onClick={toggleMenu} className="text-2xl text-gray-600 mx-6 md:hidden">
        {
           !open ? (
            <AlignJustify />
          ) : (
            <X />
          )
        }
      </button>
      <ul className="hidden md:flex flex-row items-center mx-6">
        <li className="font-medium text-lg text-gray-600 mx-3 hover:text-emerald-400 transition-all duration-300">Home</li>
        <li className="font-medium text-lg text-gray-600 mx-3 hover:text-emerald-400 transition-all duration-300">About</li>
        <li className="font-medium text-lg text-gray-600 mx-3 hover:text-emerald-400 transition-all duration-300">Developers</li>
        <button className="bg-emerald-400 rounded-lg px-4 py-2 font-medium text-white mx-2">Sign up</button>
      </ul>
    </nav>
    <ul className={`mx-6 flex flex-col md:hidden justify-center items-center ${!open && 'hidden'}`}>
      <li className="hover:bg-gray-100 py-1.5 rounded-md w-full transition-all duration-300 text-center font-medium text-lg text-gray-600 my-1 hover:text-emerald-400 transition-all duration-300">Home</li>
        <li className="hover:bg-gray-100 py-1.5 rounded-md w-full transition-all duration-300 text-center font-medium text-lg text-gray-600 my-1 hover:text-emerald-400 transition-all duration-300">About</li>
        <li className="hover:bg-gray-100 py-1.5 rounded-md w-full transition-all duration-300 text-center font-medium text-lg text-gray-600 my-1 hover:text-emerald-400 transition-all duration-300">Developers</li>
        <button className="w-full bg-emerald-400 rounded-lg px-4 py-2 font-medium text-white my-2">Sign up</button>
    </ul>
    </>
  )
}

export default Navbar;