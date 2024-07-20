import React from 'react';
import MangaList from '../components/MangaList';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      <h2>Popular Mangas</h2>
      <MangaList />
    </div>
  );
};

export default Home;
