import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import SearchContent from './SearchContent';

function RelatedArtists({ token }) {
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let [tracks, setTracks] = useState([]);
  let [search, setSearch] = useState("");
  let [isSearched, setIsSearched] = useState(false);
  
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


  const fetchArtist = async () => {
    if(token){
      try {
        const artistResponse = await fetch('https://api.spotify.com/v1/search?q=Arijit%20Singh&type=artist&limit=1', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!artistResponse.ok) {
          throw new Error('Failed to fetch artist');
        }
  
        const artistData = await artistResponse.json();
        const artistId = artistData.artists.items[0]?.id;
  
        if (!artistId) {
          throw new Error('Artist not found');
        }
  
        const relatedArtistsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!relatedArtistsResponse.ok) {
          throw new Error('Failed to fetch related artists');
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

  useEffect(() => {
    fetchSearchedSong();
    
    console.log([search, tracks.length, isSearched]);
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      {isSearched ? (
        <SearchContent tracks={tracks} />
      ) : relatedArtists.length > 0 ? (
        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">Artists</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedArtists.map((artist) => (
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
        </div>
      ) : (
        'No artists to show'
      )}
    </>
  );
  
}

export default RelatedArtists;
