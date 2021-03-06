import { getProviders, getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";

// hooks
import useGetComments from "../../hooks/api/useGetComments";
import useGetPost from "../../hooks/api/useGetPost";

// recoil
import { useRecoilValue } from "recoil";
import { commentModalState } from "../../atoms/modal";

// components
import Head from "next/head";
import Login from "../../features/login/Login";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Post from "../../features/post/Post";
import CommentModal from "../../features/comment/CommentModal";
import Comment from "../../features/comment/Comment";
import Widgets from "../../components/Widgets";

// types
import type { GetServerSideProps, NextPage } from "next";
import { PageProps } from "../../type";

const PostPage: NextPage<PageProps> = ({
  trendingResults,
  followResults,
  providers,
}) => {
  // hooks
  const { data: session } = useSession();
  const { id } = useRouter().query;

  // states
  const commentModal = useRecoilValue(commentModalState);
  const post = useGetPost(id as string);
  const comments = useGetComments(id as string);

  if (!session) return <Login providers={providers} />;

  return (
    <div>
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />

        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          {/*  */}
          <Topbar text="Tweet" detail />

          <Post postId={id as string} post={post!} detail />

          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  id={comment.id}
                  key={comment.id}
                  comment={comment.data()}
                />
              ))}
            </div>
          )}
        </div>

        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {commentModal.open && <CommentModal />}
      </main>
    </div>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );

  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );

  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
};
