import React from 'react';

function MusicSearchCard() {
  return (
    <>
      <div
        className="bg-cover bg-center shadow-lg p-6 h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIyfHxtdXNpY3xlbnwwfHx8fDE2Mzg4MzMwMDI&ixlib=rb-1.2.1&q=80&w=1080')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-4 rounded-lg text-center">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Search any music
          </h2>
          <p className="text-gray-200">
            Explore your favorite tracks and artists.
          </p>
        </div>
      </div>
    </>
  );
}

export default MusicSearchCard;
