import { cn } from '@/utils/cn'
import image from '@/assets/FB_IMG_17076197853330934.jpg'
const Header = ({ className }) => {
  return (
    <>
    <header className={cn("h-20 md:h-24 flex flex-row items-center justify-between border-b border-gray-200", className)}>
      <h1 className="font-bold text-[1.7rem] mx-6 md:mx-10 text-gray-700 md:text-3xl"><b className="text-emerald-400">Course</b>search</h1>
      <button className="text-2xl text-gray-600 mx-6 md:hidden">
        <img className="h-10 w-10 rounded-full border-2 border-emerald-400" src={image} alt="Shoti" />
      </button>
    </header>
    </>
  )
}

export default Header;