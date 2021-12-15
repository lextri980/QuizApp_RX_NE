/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import s from "../assets/scss/Dashboard.module.scss";
import clsx from "clsx";
import {
  FormControl,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../context/QuizContext";

function Dashboard() {
  //Context
  const {
    quizState: { quizes },
    getQuiz,
    deleteQuiz,
    findQuiz,
  } = useContext(QuizContext);

  //Local State
  const [search, setSearch] = useState("");

  //Use Effect
  useEffect(() => getQuiz(), []);

  //Nevigate
  const nevigate = useNavigate();

  ////chooseUpdateQuiz
  const chooseUpdateQuiz = (quizId) => {
    findQuiz(quizId);
    nevigate("/update-quiz");
  };

  ////chooseDeleteQuiz
  const chooseDeleteQuiz = (quizId) => {
    const confirm = window.confirm("Do you want to delete this question?");
    if (confirm === true) {
      deleteQuiz(quizId);
    }
  };

  ////onChangeSearch
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  ////filterSearch
  const filterSearch = (quiz) => {
    if (search === "") {
      return quiz;
    } else if (quiz.text.toLowerCase().includes(search.toLowerCase())) {
      return quiz;
    }
  };

  //Interface section------------------------------------------------------------------------------------------------------
  return (
    <div className={s.container}>
      <div className={s.header}>All questions</div>
      <div className={s.searchBox}>
        <FormControl sx={{ width: "50ch" }}>
          <TextField
            size="small"
            variant="outlined"
            label="Search"
            onChange={onChangeSearch}
            value={search}
          />
        </FormControl>
      </div>
      <div className={s.content}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                className={clsx(s.tablecellHeader, s.tablecellHeaderId)}
              >
                #
              </TableCell>
              <TableCell
                className={clsx(s.tablecellHeader, s.tablecellHeaderQues)}
              >
                Question
              </TableCell>
              <TableCell
                className={clsx(s.tablecellHeader, s.tablecellHeaderAns)}
              >
                Answer
              </TableCell>
              <TableCell
                className={clsx(s.tablecellHeader, s.tablecellHeaderAct)}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizes
              .filter((quiz) => filterSearch(quiz))
              .map((quiz, quizIndex) => (
                <TableRow key={quiz._id}>
                  <TableCell className={s.tablecell}>{quizIndex + 1}</TableCell>
                  <TableCell className={s.tablecell}>{quiz.text}</TableCell>
                  <TableCell className={s.tablecell}>{quiz.answer}</TableCell>
                  <TableCell className={s.tablecell}>
                    <Button
                      size="small"
                      variant="outlined"
                      disableElevation
                      color="info"
                      className={s.btn}
                      onClick={chooseUpdateQuiz.bind(this, quiz._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      disableElevation
                      color="warning"
                      onClick={chooseDeleteQuiz.bind(this, quiz._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;
