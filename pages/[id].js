import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getProviders, getSession, useSession } from "next-auth/react";

// recoil
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

// firebase
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

// components
import Head from "next/head";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Login from "../components/Login";
import Post from "../components/Post";
import Comment from "../components/Comment";
import Widgets from "../components/Widgets";

// styles
import { ArrowLeftIcon } from "@heroicons/react/outline";

const PostPage = ({ trendingResults, followResults, providers }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const { id } = router.query;

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  // fetch 포스트
  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  // fetch 댓글
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>
          {post?.username} on Twitter: "{post?.text}"
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />

        <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
          {/* GUIDE 상단바 ================================================================================================================================================================================================================================================ */}
          <div className="flex items-center px-1.5 py-2 border-b border-r border-gray-700 text-[#d9d9d9] font-semibold text-xl gap-x-4 sticky top-0 z-50 bg-black">
            {/* TODO 돌아가기 버튼 */}
            <div
              onClick={() => router.push("/")}
              className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
            >
              <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
          </div>

          <Post id={id} post={post} postPage />

          {comments.length > 0 && (
            <div className="pb-72">
              {comments.map((comment) => (
                <Comment
                  key={comment.id}
                  id={comment.id}
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

        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default PostPage;

export async function getServerSideProps(context) {
  const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV").then(
    (res) => res.json()
  );
  const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(
    (res) => res.json()
  );
  const providers = await getProviders();
  const session = await getSession(context); // 로그인된 상태에서 화면 새로고침 시, 세션을 받아오는 동안 로그인 페이지가 잠깐 나타났다가 리디렉션되는 깜빡임을 없애기 위해 아예 서버사이드에서 세션을 리턴해줌

  return {
    props: {
      trendingResults,
      followResults,
      providers,
      session,
    },
  };
}
