import React, { useEffect, useState } from "react";
import { useSpotifyContext } from "../App";

function Search({ setTracks, setIsSearched }) {
  let [search, setSearch] = useState("");
  const { token } = useSpotifyContext();

  const fetchSearchedSong = async () => {
    setTracks([]);

    let isSearchedValue = false;

    if (token && search) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${search}&type=track&offset=0`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch music data");
        }
        const jsonData = await response.json();
        setTracks(jsonData.tracks.items);
        isSearchedValue = search && jsonData.tracks.items.length > 0;
      } catch (error) {
        console.log(error.message);
      }
    }
    setIsSearched(isSearchedValue);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchedSong();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo on the left */}
        <div className="text-white text-2xl font-bold">
          <a href="#">Spotify</a>
        </div>

        {/* Centered Search Bar with Button */}
        <div className="flex-1 px-4">
          <div className="relative w-full">
            <input
              type="search"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Placeholder on the right to maintain the search bar centering */}
        <div className="flex items-center ml-auto">
          {/* You can add anything here if needed, or leave it empty */}
        </div>
      </div>
    </nav>
  );
}

export default Search;
