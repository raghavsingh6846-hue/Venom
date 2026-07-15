import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Wallet from "./pages/Wallet";
import Campaign from "./pages/Campaign";
import Leaderboard from "./pages/Leaderboard";
import Tasks from "./pages/Tasks";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/home" element={<Home />} />

        <Route path="/wallet" element={<Wallet />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/campaign" element={<Campaign />} />

        <Route path="/leaderboard" element={<Leaderboard />} />

      </Routes>

    </BrowserRouter>

  );

}
