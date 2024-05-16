import { genAI } from '@/config/gemini';
import { useState } from 'react';

import { courses } from '@/data/courses';

const useGemini = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const analyzeSurvey = async (ans) => {
    setLoading(true);
    setError(null);
    
    const prompt = `
      [START POSIBLE COURSES TO BE OUTPUT JSON FORMAT]
      ${JSON.stringify(courses)}
      [END POSIBLE COURSES TO BE OUTPUT JSON FORMAT]\n\n
      [START USER ANSWERED THIS JSON DATA]
      ${JSON.stringify(ans)}
      [END USER ANSWERED THIS JSON DATA]\n\n
      [START ANALYSIS PROMPT]
      Hello, I want you to analyze the user answers on questions and give me at most 5 possible courses. Make it accurate based on the output on answer { question, answer } key.
      [END ANALYSIS PROMPT]\n\n
      [START IMPORTANT NOTE]
      You must return a stringified JSON Array. Make it JSON array format, just plain. Don't add any other data. Give me the array. Example:
      [
        "Course 1", 
        "Course 2" 
      ]
      
      IF error return a json with a error key and in vue describe the error in analysis.
      [END IMPORTANT NOTE]
    `;
    
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
      });
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      const parsedResponse = JSON.parse(text);
      console.log("Debug Final: ", parsedResponse);
      setData(parsedResponse);
    } catch (error) {
      console.error('Error analyzing survey:', error);
      setError('An error occurred while analyzing the survey.');
    } finally {
      setLoading(false);
    }
  }
  
  return { loading, error, data, analyzeSurvey };
}

export { useGemini };
