import { useState, useEffect } from "react";
import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RelatedArtists from './components/RelatedArtists';
import ArtistSongs from './components/ArtistSongs';

function App() {
  let [token, setToken] = useState("");

  const fetchToken = async () => {
    const tokenKey = "spotify_token";
    const tokenExpirationKey = "spotify_token_expiration";

    // Check if a token exists and is not expired
    const storedToken = localStorage.getItem(tokenKey);
    const tokenExpiration = localStorage.getItem(tokenExpirationKey);
    const currentTime = new Date().getTime();

    if (storedToken && tokenExpiration && currentTime < tokenExpiration) {
      setToken(storedToken);
      return;
    }
    try {
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials&client_id=a77073181b7d48eb90003e3bb94ff88a&client_secret=68790982a0554d1a83427e061e371507",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const jsonData = await response.json();
      const newToken = jsonData.access_token;
      const expiresIn = jsonData.expires_in; // Token expiration time in seconds

      // Save the token and expiration time to local storage
      localStorage.setItem(tokenKey, newToken);
      localStorage.setItem(
        tokenExpirationKey,
        new Date().getTime() + expiresIn * 1000
      ); // Expiration time in milliseconds

      setToken(newToken);
    } catch (error) {
      console.log("Token API Error : " + error);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RelatedArtists token={token} />} />
        <Route path="/songs/:artistId" element={<ArtistSongs token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
