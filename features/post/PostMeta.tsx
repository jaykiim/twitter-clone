import React from "react";
import Moment from "react-moment";
import { Post } from "../../type";

type Props = {
  post: Post | undefined;
  detail?: boolean;
  comment?: boolean;
};

const PostMeta = ({ post, detail }: Props) => {
  return (
    <div className="inline-block group">
      {/*  */}
      {/* TODO 작성자명 */}

      <h4
        className={`text-gray-light text-[15px] font-bold inline-block group-hover:underline sm:text-base ${
          detail && "block"
        }`}
      >
        {post?.username}
      </h4>

      {/*  */}
      {/* TODO 작성자 태그 */}

      <span className={`ml-1.5 text-sm sm:text-[15px]} ${detail && "ml-0"}`}>
        @{post?.tag}
      </span>

      {/*  */}
      {/* TODO 작성 시각 */}

      <span className="text-sm sm:text-[15px]">
        {/* @ts-ignore */} ·{" "}
        <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
      </span>
    </div>
  );
};

export default PostMeta;
