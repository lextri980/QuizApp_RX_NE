import {
  QUIZ_LOADED_FAIL,
  QUIZ_LOADED_SUCCESS,
  CREATE_QUIZ,
  FIND_QUIZ,
  UPDATE_QUIZ,
  DELETE_QUIZ,
} from "../context/constants";

export const QuizReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case QUIZ_LOADED_SUCCESS:
      return {
        ...state,
        quizes: payload,
      };

    case QUIZ_LOADED_FAIL:
      return {
        ...state,
        quizes: [],
      };

    case CREATE_QUIZ:
      return {
        ...state,
        quizes: [...state.quizes, payload],
      };

    case DELETE_QUIZ:
      return {
        ...state,
        quizes: state.quizes.filter((quiz) => quiz._id !== payload),
      };

    case FIND_QUIZ:
      return {
        ...state,
        quiz: payload,
      };

    case UPDATE_QUIZ:
      const newQuiz = state.quizes.map((quiz) =>
        quiz._id === payload._id ? payload : quiz
      );
      return {
        ...state,
        quizes: newQuiz,
      };

    default:
      return state;
  }
};
