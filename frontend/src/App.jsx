import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Browse from "./pages/Browse";
import PrivateRoute from "./components/PrivateRoute";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/browse" element={
          <PrivateRoute>
            <Browse />
          </PrivateRoute>
        }
        />
      </Routes>
    </Router>
  );
};

export default App;
