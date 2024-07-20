import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/Reader.css';

const MangaReader = () => {
  const { id, chapter } = useParams();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const fetchChapterPages = async () => {
      try {
        const response = await axios.get(`https://api.mangadex.org/at-home/server/${chapter}`);
        const baseUrl = response.data.baseUrl;
        const hash = response.data.chapter.hash;
        const pageArray = response.data.chapter.data.map(page => `${baseUrl}/data/${hash}/${page}`);
        setPages(pageArray);
      } catch (error) {
        console.error('Error fetching chapter pages:', error);
      }
    };

    fetchChapterPages();
  }, [chapter]);

  return (
    <div className="reader">
      <h1>Reading Chapter</h1>
      {pages.map((page, index) => (
        <img key={index} src={page} alt={`Page ${index + 1}`} />
      ))}
    </div>
  );
};

export default MangaReader;
