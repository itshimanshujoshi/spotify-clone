import React, { useState } from "react";

function Search({ search, setSearch }) {

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
