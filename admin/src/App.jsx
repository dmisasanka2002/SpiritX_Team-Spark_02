import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PlayerProvider } from "./context/PlayerContext";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TeamSelection from "./pages/TeamSelection";
import Leaderboard from "./components/Leaderboard";
import PrivateRoute from "./routes/PrivateRoute";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import Home from "./pages/Home";

function App() {
  return (
    <ConfigProvider>
      <AuthProvider>
        <PlayerProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              {/* <Route path="/dashboard" element={<Dashboard />} /> */}
              {/* <Route path="/teamselection" element={<TeamSelection />} />
              <Route path="/leaderboard" element={<Leaderboard />} /> */}
              <Route path="*" element={<Login />} />
            </Routes>
          </Router>
        </PlayerProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
