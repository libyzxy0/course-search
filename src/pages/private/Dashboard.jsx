import Header from "@/components/Header";
import { useAuth } from "@/hooks/useAuth";
import { useCourse } from "@/hooks/useCourse";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user } = useAuth();
  const { readCourse, loading, error, data: courses } = useCourse();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="flex flex-col mt-8 mx-6">
        <h1 className="font-bold text-2xl text-gray-700 mt-5">
          {courses.length == 0
            ? "Theres no Courses for you"
            : "Courses for you"}{" "}
          <b className="text-emerald-400">{user.name.split(" ")[0]}</b>
        </h1>
      </div>
      {courses.length == 0 && (
        <div
          onClick={() => navigate("/survey")}
          className="rounded-lg mx-6 bg-orange-400 p-5 relative hover:bg-orange-500 transition duration-300 mt-5"
        >
          <h1 className="text-2xl font-medium text-white font-stylish">
            Find my Course
          </h1>
          <p className="text-white mt-2">
            Let us help you find the best college courses for you by answering
            this questions!
          </p>
        </div>
      )}
      {!loading &&
        courses.map((item, index) => (
          <div
            key={index}
            className="rounded-lg mx-6 odd:bg-sky-400 p-5 relative odd:hover:bg-sky-500 transition duration-300 mt-5 even:bg-emerald-400 even:hover:bg-emerald-500"
          >
            <h1 className="text-2xl font-medium text-white font-stylish">
              {item.name}
            </h1>
            <p className="text-white mt-2">Click to view.</p>
          </div>
        ))}

      <div className="w-full mb-10"></div>
    </>
  );
};

export default Dashboard;
