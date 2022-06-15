import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// recoil
import { useSetRecoilState } from "recoil";
import { commentModalState } from "../../atoms/modal";

// firebase
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

// hooks
import useGetLikes from "../../hooks/api/useGetLikes";
import useGetComments from "../../hooks/api/useGetComments";

// components
import PostMeta from "./PostMeta";
import PostBtns from "../../components/btns/PostBtns";

// styles
import { DotsHorizontalIcon } from "@heroicons/react/outline";

// types
import { Post } from "../../type";

type Props = {
  postId: string;
  post: Post;
  detail: boolean;
};

const Post = ({ postId, post, detail }: Props) => {
  const router = useRouter();
  const { user } = useSession().data!;

  const likes = useGetLikes(postId);
  const comments = useGetComments(postId); // 코멘트 갯수 표시하기 위해

  const [liked, setLiked] = useState(false);
  const setCommentModal = useSetRecoilState(commentModalState);

  // 현재 포스트에 대한 사용자의 liked 상태 변경
  useEffect(
    // @ts-ignore
    () => setLiked(likes.findIndex((like) => like.id === user.uid) !== -1),
    [likes]
  );

  /* ==================================================================================================== 
  ? 이벤트 핸들러
  ==================================================================================================== */

  const onCommentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 댓글 아이콘 클릭 시, 상세보기 이벤트 (전체 컨테이너 div 클릭) 전파 방지
    e.stopPropagation();
    setCommentModal({ open: true, postId });
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    deleteDoc(doc(db, "posts", postId));
    router.push("/");
  };

  const onLikeClick = async () => {
    if (liked) {
      // @ts-ignore
      await deleteDoc(doc(db, "posts", postId, "likes", user.uid));
    } else {
      // @ts-ignore
      await setDoc(doc(db, "posts", postId, "likes", user.uid), {
        username: user?.name,
      });
    }
  };

  /* ==================================================================================================== 
  ? UI 렌더 함수
  ==================================================================================================== */

  const renderProfilePic = () => (
    <img
      src={post?.userImg}
      alt="writer's profile picture"
      className="circle-11 mr-4"
    />
  );

  const renderPostText = () => (
    <p
      className={`text-gray-light text-[15px] sm:text-base mt-0.5 ${
        detail && "w-10/12 mx-auto"
      }`}
    >
      {post?.text}
    </p>
  );

  return (
    <div
      onClick={() => router.push(`/post/${postId}`)}
      className="flex p-3 border-b border-gray-700 cursor-pointer"
    >
      {/*  */}
      {/* TODO 프로필 사진 (피드) */}
      {!detail && renderProfilePic()}

      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!detail && "justify-between"}`}>
          {/*  */}
          {/* IDEA 프로필 사진 (상세페이지) */}
          {detail && renderProfilePic()}

          <div className="text-gray-dark">
            {/*  */}
            {/* TODO 작성자명 · 태그 · 작성 시각 */}
            <PostMeta post={post} />

            {/* TODO 포스트 내용 (피드) */}
            {!detail && renderPostText()}
          </div>

          <div className="icon-editor-container group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="text-gray-dark icon-feed-blue" />
          </div>
        </div>

        {/* IDEA 포스트 내용 (상세페이지) */}
        {detail && renderPostText()}

        {post?.image && (
          <img
            src={post?.image}
            alt="post-image"
            className="rounded-2xl max-h-[700px] object-cover mr-2"
          />
        )}

        {/* GUIDE 하단 버튼 ====================================================================================================================================== */}

        <PostBtns
          states={{ post, comments, likes, liked }}
          handlers={{ onCommentClick, onDeleteClick, onLikeClick }}
        />
      </div>
    </div>
  );
};

export default Post;
