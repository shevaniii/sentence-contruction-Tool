import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FeedbackPage from "./pages/FeedbackPage";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    fetch('')
      .then(res => res.json())
      .then(data => {
        console.log('Sample Data:', data);
      });
  }, []);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
