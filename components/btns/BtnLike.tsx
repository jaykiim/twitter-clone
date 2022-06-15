import React from "react";

import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

import { Like } from "../../type";

type Props = {
  onLikeClick: () => Promise<void>;
  likes: never[] | Like[];
  liked: boolean;
};

const BtnLike = ({ onLikeClick, likes, liked }: Props) => {
  return (
    <div onClick={onLikeClick} className="flex items-center space-x-1 group">
      {/* 아이콘 */}
      <div className="icon-editor-container group-hover:bg-pink-600/10">
        {liked ? (
          <HeartIconFilled className="h-5 text-pink-600" />
        ) : (
          <HeartIcon className="h-5 group-hover:text-pink-600" />
        )}
      </div>

      {/* 좋아요 갯수 */}
      {likes.length > 0 && (
        <span
          className={`group-hover:text-pink-600 text-sm ${
            liked && "text-pink-600"
          }`}
        >
          {likes.length}
        </span>
      )}
    </div>
  );
};

export default BtnLike;
