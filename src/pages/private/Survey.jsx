import React, { useState, useEffect } from "react";
import { data } from "@/data/example-data";
import completedmockup from "@/assets/10946094_4611763.svg";
import { useNavigate } from "react-router-dom";
import edumockup from "@/assets/mockup-freepik-education.jpg";
import { useAuth } from '@/hooks/useAuth'
import { useGemini } from '@/hooks/useGemini'
import { useCourse } from '@/hooks/useCourse'

const Survey = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createCourse, loading: loadingCourse, error: courseError } = useCourse();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setFinished] = useState(false);
  const [collected, setCollected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [surveyStarted, setSurveyStarted] = useState(false);
  const { loading, error, data: possibleCourses, analyzeSurvey } = useGemini();
  

  useEffect(() => {
    const focusableElement = document.querySelector(".focusable");
    if (focusableElement) {
      focusableElement.focus();
    }
  }, [currentQuestionIndex, isFinished]);

  useEffect(() => {
    if (isFinished) {
      const wr = async () => {
        try {
          await analyzeSurvey(collected);
          for(let i = 0;i < possibleCourses["possible-courses"].length;i++) {
            let c = possibleCourses["possible-courses"][i];
            await createCourse(c, user.$id);
          } 
        } catch (error) {
          console.log(error)
        }
      }
      wr();
    }
  }, [isFinished]);

  const handleStartSurvey = () => {
    setSurveyStarted(true);
  };

  const handleChoiceSelect = (choice) => {
    const currentQuestion = data[currentQuestionIndex];
    setAnswers({ ...answers, [currentQuestion.id]: choice });
    navigateNext();
  };

  const handleInputProceed = () => {
    const currentQuestion = data[currentQuestionIndex];
    const answer = inputValue;
    setAnswers({ ...answers, [currentQuestion.id]: answer });
    setInputValue("");
    navigateNext();
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const navigateNext = () => {
    const currentQuestion = data[currentQuestionIndex];
    if (currentQuestion.type === "input") {
      const answer = inputValue;
      setAnswers({ ...answers, [currentQuestion.id]: answer });
      setInputValue("");
    }
    if (currentQuestionIndex < data.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const lastQuestion = data[currentQuestionIndex];
      const lastAnswer =
        lastQuestion.choices === "input"
          ? inputValue
          : answers[lastQuestion.id];

      const collectedData = data.map((question) => ({
        question: question.question,
        answer: answers[question.id] || "No Answer",
      }));

      collectedData[collectedData.length - 1].answer = lastAnswer;

      setCollected(collectedData);
      setFinished(true);
    }
  };

  const renderQuestion = () => {
    const currentQuestion = data[currentQuestionIndex];
    if (isFinished) {
      if (loading) {
        return (
          <div className="w-full flex justify-center items-center">
            <h1 className="animate-spin text-3xl font-bold">Analyzing please wait...</h1>
          </div>
        );
      }
      return (
        <div className="w-full flex text-center justify-center items-center flex-col mx-6">
          <div className="w-72">
            <img src={completedmockup} alt="Mockup image from freepik" />
          </div>
          <h1 className="text-gray-700 font-bold text-3xl mx-2 mt-5">
            Survey Completed!
          </h1>
          <p className="text-gray-500 mt-3">
            Go back to Dashboard to see the course that suitable for you.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 w-full py-2.5 rounded-lg border-none font-medium mt-3 bg-emerald-400 text-gray-700 hover:bg-emerald-500 transition-all duration-300 text-white mt-5"
          >
            Back to Dashboard
          </button>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col mx-6">
        <h1 className="text-gray-700 font-bold text-2xl flex flex-row">
          <b className="text-emerald-400 mr-2">Q{currentQuestionIndex + 1}:</b>{' '}
          {currentQuestion.question}
        </h1>
        <p className="text-gray-600 mt-3 mb-5">{currentQuestion.hint}</p>
        <div className="flex flex-col items-center justify-center">
        {Array.isArray(currentQuestion.choices) ? (
          <div className="w-full flex flex-col">
            {currentQuestion.choices.map((choice, index) => (
              <button
                key={choice}
                onClick={() => handleChoiceSelect(choice)}
                className={`text-white px-6 w-full py-2.5 rounded-lg border-none font-medium mt-3 bg-emerald-400 text-gray-700 hover:bg-emerald-500 transition-all duration-300 ${index === 0 ? "focusable" : ""}`}
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col mt-6">
            <textarea
              value={inputValue}
              onChange={handleInputChange}
              className="rounded-lg border-[1.2px] border-gray-200 px-4 py-3 outline-none hover:border-emerald-400 resize-none focusable"
              placeholder="Enter your answer"
              rows={4}
              aria-label="Input your answer"
            ></textarea>
            <button
              onClick={handleInputProceed}
              className="px-6 w-full py-2.5 rounded-lg bg-emerald-400 border-none font-medium text-white mt-3 truncate hover:bg-emerald-500 transition-all duration-300 focusable"
            >
              Continue
            </button>
          </div>
        )}
      </div>
      </div>
    );
  };

  const renderGetStarted = () => {
    return (
      <div className="w-full flex text-center justify-center items-center flex-col mx-6">
      <div className="w-72">
            <img src={edumockup} alt="Mockup image from freepik" />
          </div>
        <h1 className="text-gray-700 font-bold text-3xl mx-2 mt-5">
          Hello {(user.name.split(" "))[0]}! Ready?
        </h1>
        <p className="text-gray-600 mt-3">
          Let us know what will be the course suitable for you by answering this survey!
        </p>
        <button
          onClick={handleStartSurvey}
          className="px-6 w-full py-2.5 rounded-lg border-none font-medium mt-3 bg-emerald-400 text-gray-700 hover:bg-emerald-500 transition-all duration-300 text-white mt-5"
        >
          Im Ready!
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-[85vh] w-full flex justify-center items-center">
      {surveyStarted ? renderQuestion() : renderGetStarted()}
    </div>
  );
};

export default Survey;
