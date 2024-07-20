import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../styles/Details.css';

const MangaDetails = () => {
  const { id } = useParams();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        const mangaResponse = await axios.get(`https://api.mangadex.org/manga/${id}`);
        setManga(mangaResponse.data.data);

        const chaptersResponse = await axios.get(`https://api.mangadex.org/manga/${id}/feed`);
        setChapters(chaptersResponse.data.data);
      } catch (error) {
        console.error('Error fetching manga details or chapters:', error);
      }
    };

    fetchMangaDetails();
  }, [id]);

  if (!manga) return <div>Loading...</div>;

  const coverImageUrl = manga.relationships.find(rel => rel.type === 'cover_art')?.attributes?.fileName
    ? `https://uploads.mangadex.org/covers/${manga.id}/${manga.relationships.find(rel => rel.type === 'cover_art').attributes.fileName}`
    : '';

  return (
    <div className="details">
      <div className="details-header">
        <img src={coverImageUrl} alt={manga.attributes.title.en} />
        <div className="details-content">
          <h1>{manga.attributes.title.en}</h1>
          <p>{manga.attributes.description.en}</p>
        </div>
      </div>
      <h2>Chapters</h2>
      <ul className="chapter-list">
        {chapters.map(chapter => (
          <li key={chapter.id}>
            <Link to={`/reader/${id}/${chapter.id}`}>Chapter {chapter.attributes.chapter}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MangaDetails;
