import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import CreateQuiz from "./views/CreateQuiz";
import UpdateQuiz from "./views/UpdateQuiz";
import PublicRoute from "./components/routing/PublicRoute";
import QuizContextProvider from "./context/QuizContext";

function App() {
  return (
    <QuizContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoute />}>
            <Route path="" element={<Dashboard />} />
            <Route path="create-quiz" element={<CreateQuiz />} />
            <Route path="update-quiz" element={<UpdateQuiz />} />
          </Route>
        </Routes>
      </Router>
    </QuizContextProvider>
  );
}

export default App;
