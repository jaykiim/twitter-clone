import React from "react";
import FeedEditor from "../../components/FeedEditor";
import Topbar from "../../components/Topbar";

const Feed = () => {
  return (
    <div className="text-white sm:ml-[73px] xl:ml-[370px] border-x border-gray-700 flex-grow max-w-2xl">
      <Topbar text="home" />
      <FeedEditor />
    </div>
  );
};

export default Feed;
