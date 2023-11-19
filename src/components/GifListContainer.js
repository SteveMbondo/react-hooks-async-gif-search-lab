import React, { useState, useEffect } from 'react';
import GifList from './GifList';
import GifSearch from './GifSearch';

function GifListContainer() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'YOUR_API_KEY'; 
        const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&rating=g`;
        const response = await fetch(url);
        const data = await response.json();
        setGifs(data.data.slice(0, 3)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (searchTerm.trim() !== '') {
      fetchData();
    }
  }, [searchTerm]);

  const handleSearchSubmit = (query) => {
    setSearchTerm(query);
  };

  return (
    <div>
      <GifSearch onSearchSubmit={handleSearchSubmit} />
      <GifList gifs={gifs} />
    </div>
  );
}

export default GifListContainer;
