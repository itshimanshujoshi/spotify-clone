import React from "react";

const SearchContent = ({tracks}) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tracks.map((trackObj) => (
          <div
            key={trackObj.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative w-full pb-1/1 bg-gray-200">
              <img
                src={trackObj.album.images[0].url}
                alt="Album cover"
                className="inset-0 w-full object-cover"
              />
            </div>

            <div className="p-4">
              <h5 className="text-xl font-semibold mb-2">
                {trackObj.name}
                <div className="flex justify-end space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <i className="bi bi-pin-angle"></i>
                  </button>

                  <button className="text-gray-500 hover:text-red-500">
                    <i className="bi bi-heart"></i>
                  </button>
                </div>
              </h5>
              <p className="text-gray-600">
                Artist: {trackObj.album.artists[0].name}
              </p>
              <p className="text-gray-600">
                Release date: {trackObj.album.release_date}
              </p>
              <audio
                src={trackObj.preview_url}
                controls
                className="w-full mt-2"
              ></audio>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchContent;
