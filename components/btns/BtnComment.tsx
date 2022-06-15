import { ChatIcon } from "@heroicons/react/outline";
import { Comment } from "../../type";

type Props = {
  comments: Comment[];
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const BtnComment = ({ comments, onClick }: Props) => {
  return (
    <div onClick={onClick} className="flex items-center space-x-1 group">
      {/* 아이콘 */}
      <div className="icon-editor-container group-hover:bg-tweet-blue-light group-hover:bg-opacity-10">
        <ChatIcon className="icon-feed-blue" />
      </div>

      {/* 댓글 갯수 */}
      {comments.length > 0 && (
        <span className="group-hover:text-[#1d9bf0] text-sm">
          {comments.length}
        </span>
      )}
    </div>
  );
};

export default BtnComment;
