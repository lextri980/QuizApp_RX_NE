import React from "react";
import s from "../../assets/scss/Sidebar.module.scss";
import {useNavigate} from 'react-router-dom'

function Sidebar() {
  const nevigate = useNavigate()

  const nevigateDashboard=() => {
    nevigate('/')
  }

  const nevigateCreateQuestion = () => {
    nevigate('/create-quiz')
  }

  return (
    <div className={s.sidebar}>
      <div className={s.header}>WPR</div>
      <div className={s.banner}></div>
      <div className={s.ques}>
        <button className={s.allQues} onClick={nevigateDashboard}>All questions</button>
        <button className={s.addQues} onClick={nevigateCreateQuestion}> + New question</button>
      </div>
    </div>
  );
}

export default Sidebar;
