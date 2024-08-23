import React, { useState, useEffect } from "react";
import SearchContent from "./SearchContent";
import { Link, useParams } from "react-router-dom";
import { useSpotifyContext } from "../App";

function ArtistSongs() {
  const { artistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSpotifyContext();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }

        const data = await response.json();
        setSongs(data.tracks);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchSongs();
  }, [artistId, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="flex justify-end p-4">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
        >
          Back
        </Link>
      </div>
      <SearchContent tracks={songs} />
    </>
  );
}

export default ArtistSongs;
