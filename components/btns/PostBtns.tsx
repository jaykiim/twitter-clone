import Chart from "./BtnChart";
import BtnComment from "./BtnComment";
import BtnDelete from "./BtnDelete";
import BtnDetail from "./BtnDetail";
import BtnLike from "./BtnLike";
import Share from "./BtnShare";

import { Comment, Like, Post } from "../../type";
import { useSession } from "next-auth/react";

type Props = {
  detail?: boolean;
  states: {
    post: Post;
    comments: Comment[];
    likes: Like[];
    liked: boolean;
  };
  handlers: {
    onCommentClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onDeleteClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    onLikeClick: () => Promise<void>;
  };
};

const PostBtns = ({ detail, states, handlers }: Props) => {
  const { user } = useSession().data!;

  const { post, comments, likes, liked } = states;
  const { onCommentClick, onDeleteClick, onLikeClick } = handlers;

  return (
    <div
      className={`text-gray-dark flex justify-between w-10/12 ${
        detail && "mx-auto"
      }`}
    >
      {/*  */}
      {/* TODO 댓글 */}

      <BtnComment comments={comments} onClick={onCommentClick} />

      {/* TODO 삭제 or 상세보기 */}

      <div className="flex items-center space-x-1 group">
        {/* @ts-ignore */}
        {user.uid === post?.id ? (
          <BtnDelete onClick={onDeleteClick} />
        ) : (
          <BtnDetail />
        )}
      </div>

      {/* TODO 좋아요 */}

      <BtnLike onLikeClick={onLikeClick} likes={likes} liked={liked} />

      {/* TODO 공유 */}

      <Share />

      {/* TODO 차트 */}

      <Chart />
    </div>
  );
};

export default PostBtns;
