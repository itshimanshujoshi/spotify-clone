import React from 'react';

function LoadingScreen() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen w-screen flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDIyfHxtdXNpY3xlbnwwfHx8fDE2Mzg4MzMwMDI&ixlib=rb-1.2.1&q=80&w=1080')",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-lg text-center">
          <h2 className="text-4xl font-semibold text-white mb-4">
            Loading...
          </h2>
          <p className="text-gray-200">
            Please wait while we load your content.
          </p>
        </div>
      </div>
    </>
  );
}

export default LoadingScreen;
