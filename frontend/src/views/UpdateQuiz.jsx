import React, { useContext, useState } from "react";
import s from "../assets/scss/UpdateQuiz.module.scss";
import clsx from "clsx";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { QuizContext } from "../context/QuizContext";
import {useNavigate} from 'react-router-dom'
 
function UpdateQuiz() {
  //Context
  const {
    quizState: { quiz },
    updateQuiz,
  } = useContext(QuizContext);

  //Local State
  const [newQuiz, setNewQuiz] = useState(quiz);
  const { text, answer } = newQuiz;

  //useNavigate
  const navigate = useNavigate()

  ////onChange
  const onChange = (e) => {
    setNewQuiz({
      ...newQuiz,
      [e.target.name]: e.target.value,
    });
  };

  ////onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    const {success} = await updateQuiz(newQuiz);
    if (success===true) {
      navigate('/')
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>Edit question</div>
      <div className={s.content}>
        <Form onSubmit={onSubmit}>
          <FormGroup className={clsx(s.formGroup, s.formGroupText)}>
            <Label for="createText">Question</Label>
            <Input
              id="createText"
              className={s.createText}
              type="text"
              name="text"
              value={text}
              onChange={onChange}
            />
          </FormGroup>
          <FormGroup className={clsx(s.formGroup, s.formGroupAnswer)}>
            <Label for="createAnswer">Answer</Label>
            <Input
              id="createAnswer"
              type="text"
              name="answer"
              value={answer}
              onChange={onChange}
            />
          </FormGroup>
          <div className={s.btn}>
            <Button type="submit" color="primary" outline>
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UpdateQuiz;
