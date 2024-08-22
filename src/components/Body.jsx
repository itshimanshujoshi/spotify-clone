import React from "react";
import MusicSearchCard from "./MusicSearchCard";
import LoadingScreen from "./LoadingScreen";
import SearchContent from "./SearchContent";
import RelatedArtists from "./RelatedArtists";

export const Body = ({ token, tracks, isloading }) => {
  if (isloading) {
    return (<LoadingScreen></LoadingScreen>)
  }

  if (tracks.length > 0) {
    return (
      <SearchContent tracks={tracks}></SearchContent>
    );
  }

  return (
    <RelatedArtists token={token}></RelatedArtists>
    // <div className="flex items-center justify-center h-screen bg-gray-100">
    //   <MusicSearchCard />
    // </div>
  );
};
