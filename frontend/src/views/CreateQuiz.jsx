import React, { useContext, useState } from "react";
import s from "../assets/scss/CreateQuiz.module.scss";
import { QuizContext } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import clsx from "clsx";

function CreateQuiz() {
  //Context
  const { createQuiz } = useContext(QuizContext);

  // Local State
  const [newQuiz, setNewQuiz] = useState({
    text: "",
    answer: "",
  });
  const { text, answer } = newQuiz;

  //Nevigate
  const navigate = useNavigate();

  ////OnChange
  const onChange = (e) => {
    setNewQuiz({
      ...newQuiz,
      [e.target.name]: e.target.value,
    });
  };

  ////onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { success } = await createQuiz(newQuiz);
    if (success === true) {
      navigate("/");
    }
  };

  return (
    <div className={s.container}>
      <div className={s.header}>New question</div>
      <div className={s.content}>
        <Form onSubmit={onSubmit}>
          <FormGroup className={clsx(s.formGroup, s.formGroupText)}>
            <Label for="createText">Question</Label>
            <Input
              bsSize="lg"
              id="createText"
              type="text"
              placeholder='Enter the question'
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
              placeholder='Enter the answer'
              name="answer"
              value={answer}
              onChange={onChange}
            />
          </FormGroup>
          <div className={s.btn}>
            <Button type="submit" color="primary" outline>
              Add
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateQuiz;
