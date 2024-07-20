import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const apiUrl = 'http://localhost:3000/api/manga';
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => console.error('Error fetching manga data:', error));

const MangaList = () => {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const fetchMangas = async () => {
      try {
        const response = await axios.get('https://api.mangadex.org/manga');
        setMangas(response.data.data);
      } catch (error) {
        console.error('Error fetching manga data:', error);
      }
    };

    fetchMangas();
  }, []);

  return (
    <div className="manga-list">
      {mangas.map(manga => (
        <div key={manga.id} className="manga-item">
          <Link to={`/details/${manga.id}`}>
            <img src={`https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find(rel => rel.type === 'cover_art')?.attributes?.fileName}`} alt={manga.attributes.title.en} />
            <h3>{manga.attributes.title.en}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MangaList;
