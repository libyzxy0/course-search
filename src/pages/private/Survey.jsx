import React, { useState, useEffect } from "react";
import { data } from "@/data/example-data";
import completedmockup from "@/assets/10946094_4611763.svg";
import { useNavigate } from "react-router-dom";
import edumockup from "@/assets/mockup-freepik-education.jpg";
import { useAuth } from "@/hooks/useAuth";
import { useGemini } from "@/hooks/useGemini";
import { useCourse } from "@/hooks/useCourse";

const Survey = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    createCourse,
    loading: loadingCourse,
    error: courseError,
  } = useCourse();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setFinished] = useState(false);
  const [collected, setCollected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [surveyStarted, setSurveyStarted] = useState(false);
  const { loading, error, data: possibleCourses, analyzeSurvey } = useGemini();
  const [surveyError, setSurveyError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const focusableElement = document.querySelector(".focusable");
    if (focusableElement) {
      focusableElement.focus();
    }
  }, [currentQuestionIndex, isFinished]);

  useEffect(() => {
    if (isFinished && !isSubmitted) {
      const wr = async () => {
        try {
          await analyzeSurvey(collected);
          if (possibleCourses?.error) {
            setSurveyError(true);
          }
        } catch (error) {
          setSurveyError(true);
          console.log("Error completing survey:", error);
        } finally {
          setIsSubmitted(true);
        }
      };
      wr();
    }
  }, [isFinished, possibleCourses]);

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
          <div className="w-full flex text-center justify-center items-center flex-col mx-6">
            <div className="w-72">
              <img
                src="https://img.freepik.com/free-vector/site-stats-concept-illustration_114360-1434.jpg?w=740&t=st=1715850201~exp=1715850801~hmac=e97c5492da7d8c7d4dc060e2ea6e5b6f792c1f78006dfe09a91231f698494010"
                alt="Mockup image from freepik"
              />
            </div>
            <h1 className="text-gray-700 font-bold text-3xl mx-2 mt-5">
              Analyzing Data...
            </h1>
            <p className="text-gray-500 mt-3">
              Hold on, Gemini AI currently analyzing your data, please be
              patient...
            </p>
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
          <b className="text-emerald-400 mr-2">Q{currentQuestionIndex + 1}:</b>{" "}
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
          Hello {user.name.split(" ")[0]}! Ready?
        </h1>
        <p className="text-gray-600 mt-3">
          Let us know what will be the course suitable for you by answering this
          survey!
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
      {!surveyError ? (
        surveyStarted ? (
          renderQuestion()
        ) : (
          renderGetStarted()
        )
      ) : (
        <div className="w-full flex text-center justify-center items-center flex-col mx-6">
          <div className="w-72">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696458.jpg?t=st=1715849932~exp=1715850532~hmac=505a09704c06638a75a2c545f5d27bcc529fbd1aa1057b8d66a5a7bf5566b5a6"
              alt="Mockup image from freepik"
            />
          </div>
          <h1 className="text-gray-700 font-bold text-3xl mx-2 mt-5">
            Failed to analyze data!
          </h1>
          <p className="text-gray-500 mt-3">
            Error while analyzing your response.
          </p>
          <button
            onClick={() => (window.location.href = "survey")}
            className="px-6 w-full py-2.5 rounded-lg border-none font-medium mt-3 bg-emerald-400 text-gray-700 hover:bg-emerald-500 transition-all duration-300 text-white mt-5"
          >
            Retake Survey
          </button>
        </div>
      )}
    </div>
  );
};

export default Survey;
