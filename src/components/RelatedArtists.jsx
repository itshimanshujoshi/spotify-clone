import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpotifyContext } from "../App";

function RelatedArtists() {
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSpotifyContext();

  const [currentPage, setCurrentPage] = useState(1);
  const artistsPerPage = 8;

  const fetchArtist = async () => {
    if (token) {
      try {
        const artistResponse = await fetch(
          "https://api.spotify.com/v1/search?q=Arijit%20Singh&type=artist&limit=1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!artistResponse.ok) {
          throw new Error("Failed to fetch artist");
        }

        const artistData = await artistResponse.json();
        const artistId = artistData.artists.items[0]?.id;

        if (!artistId) {
          throw new Error("Artist not found");
        }

        const relatedArtistsResponse = await fetch(
          `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!relatedArtistsResponse.ok) {
          throw new Error("Failed to fetch related artists");
        }

        const relatedArtistsData = await relatedArtistsResponse.json();
        setRelatedArtists(relatedArtistsData.artists);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchArtist();
  }, [token]);

  // Calculate pagination values
  const indexOfLastArtist = currentPage * artistsPerPage;
  const indexOfFirstArtist = indexOfLastArtist - artistsPerPage;
  const currentArtists = relatedArtists.slice(indexOfFirstArtist, indexOfLastArtist);

  const totalPages = Math.ceil(relatedArtists.length / artistsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((currentlyDisplayingPage) => Math.max(currentlyDisplayingPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((currentlyDisplayingPage) => Math.min(currentlyDisplayingPage + 1, totalPages));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {currentArtists.length > 0 ? (
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Artists</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentArtists.map((artist) => (
              <Link
                key={artist.id}
                to={`/songs/${artist.id}`}
                className="bg-gray-100 p-4 rounded-lg text-center"
              >
                <img
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  className="w-32 h-32 rounded-full mx-auto"
                />
                <h4 className="text-lg font-semibold mt-2">{artist.name}</h4>
              </Link>
            ))}
          </div>
          {/* Pagination controls */}
          <div className="flex justify-center items-center mt-4 space-x-1">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-l-md ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 border bg-white">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-r-md ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        "No artists to show"
      )}
    </>
  );
}

export default RelatedArtists;
