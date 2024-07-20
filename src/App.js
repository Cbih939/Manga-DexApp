import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Reader from './pages/MangaReader';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <h1>Leitor online de mangás</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/reader/:id/:chapter" element={<Reader />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2024 LL Mangás. All Rights Reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
