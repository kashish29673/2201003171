// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlShortenerForm from "./components/UrlShortenerForm";
import StatsPage from "./components/StatsPage";
import UrlRedirectHandler from "./components/UrlRedirectHandler"; // Create this soon
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<UrlShortenerForm />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<UrlRedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
