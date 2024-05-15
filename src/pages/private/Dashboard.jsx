import Header from '@/components/Header'
import { LayoutDashboard, Search } from 'lucide-react'
const Dashboard = () => {
  return (
    <>
    <Header />
    <div className="flex flex-row mt-8 mx-6 items-center">
      <LayoutDashboard className="text-gray-700" />
      <h1 className="font-bold text-2xl text-gray-700 mx-1">Dashboard</h1>
    </div>
    
    <div className="w-full flex justify-center flex-col mt-5">
      <div className="rounded-lg mx-6 bg-emerald-400 p-5 relative hover:bg-emerald-500 transition duration-300">
        <h1 className="text-2xl font-medium text-white font-stylish">Find Course  📘</h1>
        <p className="text-white mt-2">Let's find the best college courses suitable for you!</p>
      </div>
      
      {/*
      
      <div className="rounded-lg mx-6 bg-sky-400 p-5 relative hover:bg-sky-500 transition duration-300 mt-10">
        <h1 className="text-2xl font-medium text-white font-stylish">Let's Learn 📚</h1>
        <p className="text-white mt-2">Let's learn and improve our knowledge together.</p>
      </div>
      <div className="rounded-lg mx-6 bg-orange-400 p-5 relative hover:bg-orange-500 transition duration-300 mt-4">
        <h1 className="text-2xl font-medium text-white font-stylish">Take a quiz 📑</h1>
        <p className="text-white mt-2">Let's test your knowledge about the lesson we study!</p>
      </div>
      
      */}
      
    </div>
    </>
  )
}

export default Dashboard;