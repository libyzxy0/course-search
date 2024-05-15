import Navbar from '@/components/Navbar'
import edumockup from '@/assets/mockup-freepik-education.jpg';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
    <Navbar />
      <section className="h-screen w-full bg-white flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] text-center md:text-left mt-16 md:mt-20 md:mx-8">
           
          <h1 className="md:mx-6 font-stylish text-gray-800 text-4xl font-bold"><b className="text-emerald-400">Discover</b> Your Path to <b className="text-emerald-400">Success</b> Where <b className="text-emerald-400">Education</b> Meets <b className="text-emerald-400">Opportunity</b></h1>
          <p className="text-md mx-6 text-gray-600 mt-7 text-lg">Navigate Your Future - Where Education Meets Opportunity. Find the perfect college course for you, tailored to your interests, career goals, and learning style. Unlock a world of possibilities with personalized recommendations and expert guidance.</p>
          
          <div className="w-full md:mx-6 flex justify-center mt-7 md:justify-start">
          <Link to="dashboard">
            <button className="outline-none border-none bg-emerald-400 rounded-lg py-3 px-12 font-bold text-white">Get Started</button>
          </Link>
          </div>
        </div>
        <div className="md:w-[50%]">
          <img className="" src={edumockup} alt="Mockup image from freepik" />
        </div>
      </section>
    </>
  )
}

export default Home;