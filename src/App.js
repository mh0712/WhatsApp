import React from "react";
import "./assets/styles/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom"


import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import ChattingPage from "./Pages/ChattingPage";
import StatusPage from "./Pages/StatusPage";
import InfoPage from './components/InfoPage/InfoPage'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />}></Route>
          <Route path="/LoginPage" element={<LoginPage />}></Route>
          <Route path="/SignUpPage" element={<SignUpPage />}></Route>
          <Route path="/ChattingPage" element={<ChattingPage />}></Route>
          <Route path="/StatusPage" element={<StatusPage />}></Route>
          <Route path="/InfoPage" element={<InfoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
