import React, { createContext, useReducer } from "react";
import { QuizReducer } from "../reducer/QuizReducer";
import {
  url,
  QUIZ_LOADED_SUCCESS,
  QUIZ_LOADED_FAIL,
  CREATE_QUIZ,
  DELETE_QUIZ,
  FIND_QUIZ,
  UPDATE_QUIZ,
} from "./constants";
import axios from "axios";

export const QuizContext = createContext();

function QuizContextProvider({ children }) {
  const [quizState, dispatch] = useReducer(QuizReducer, {
    quizes: [],
    quiz: null,
  });

  //Get quiz
  const getQuiz = async () => {
    try {
      const response = await axios.get(`${url}`);
      if (response.data.success) {
        dispatch({
          type: QUIZ_LOADED_SUCCESS,
          payload: response.data.quizes,
        });
      }
    } catch (error) {
      return dispatch({
        type: QUIZ_LOADED_FAIL,
      });
    }
  };

  //Create quiz
  const createQuiz = async (newQuiz) => {
    try {
      const response = await axios.post(`${url}`, newQuiz);
      if (response.data.success) {
        dispatch({
          type: CREATE_QUIZ,
          payload: response.data.quiz,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Internal server error",
          };
    }
  };

  //Delete quiz
  const deleteQuiz = async (quizId) => {
    try {
      const response = await axios.delete(`${url}/${quizId}`);
      if (response.data.success) {
        dispatch({
          type: DELETE_QUIZ,
          payload: quizId,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Internal server error",
          };
    }
  };

  //Find quiz
  const findQuiz = (quizId) => {
    const quiz = quizState.quizes.find((quiz) => quiz._id === quizId);
    dispatch({
      type: FIND_QUIZ,
      payload: quiz,
    });
  };

  //Update quiz
  const updateQuiz = async (updatedQuiz) => {
    try {
      const response = await axios.put(
        `${url}/${updatedQuiz._id}`,
        updatedQuiz
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_QUIZ,
          payload: response.data.quiz,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : {
            success: false,
            message: "Internal server error",
          };
    }
  };

  const quizContextData = {
    quizState,
    getQuiz,
    createQuiz,
    deleteQuiz,
    findQuiz,
    updateQuiz,
  };

  return (
    <QuizContext.Provider value={quizContextData}>
      {children}
    </QuizContext.Provider>
  );
}

export default QuizContextProvider;
