import Header from "@/components/Header";
import { useAuth } from '@/hooks/useAuth'
const Dashboard = () => {
  const { user } = useAuth();
  return (
    <>
      <Header />
      <div className="flex flex-col mt-8 mx-6">
        <h1 className="font-bold text-2xl text-gray-700 mt-5">Courses for you <b className="text-emerald-400">{(user.name.split(" "))[0]}</b></h1>
      </div>
      
      <div className="rounded-lg mx-6 bg-sky-400 p-5 relative hover:bg-sky-500 transition duration-300 mt-10">
        <h1 className="text-2xl font-medium text-white font-stylish">Bachelor of Science in Information Technology</h1>
        <p className="text-white mt-2">Click to view.</p>
      </div>
      <div className="rounded-lg mx-6 bg-orange-400 p-5 relative hover:bg-orange-500 transition duration-300 mt-4">
        <h1 className="text-2xl font-medium text-white font-stylish">Bachelor of Science in Computer Science</h1>
        <p className="text-white mt-2">Click to view</p>
      </div>
      <div className="rounded-lg mx-6 bg-emerald-400 p-5 relative hover:bg-orange-500 transition duration-300 mt-4">
        <h1 className="text-2xl font-medium text-white font-stylish">Bachelor of Science in Computer Engineering</h1>
        <p className="text-white mt-2">Click to view</p>
      </div>
      
    </>
  );
};

export default Dashboard;
