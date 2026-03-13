import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import HomePage from "./pages/HomePage.jsx";
import ExploreDestinationsPage from "./pages/ExploreDestinationsPage.jsx";
import DestinationDetailPage from "./pages/DestinationDetailPage.jsx";
import ArticlesListPage from "./pages/ArticlesListPage.jsx";
import ArticleDetailPage from "./pages/ArticleDetailPage.jsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<ExploreDestinationsPage />} />
        <Route path="/destinations/:slug" element={<DestinationDetailPage />} />
        <Route path="/articles" element={<ArticlesListPage />} />
        <Route path="/articles/:slug" element={<ArticleDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
