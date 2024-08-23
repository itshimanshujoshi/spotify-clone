import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Search from "./Search";
import SearchContent from "./SearchContent";

function Layout() {
  let [isSearched, setIsSearched] = useState(false);
  let [tracks, setTracks] = useState([]);
  return (
    <>
      <Search setTracks={setTracks} setIsSearched={setIsSearched} />
      {isSearched ? <SearchContent tracks={tracks} /> : <Outlet />}
    </>
  );
}

export default Layout;
