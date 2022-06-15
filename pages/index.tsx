import { getProviders, getSession, useSession } from "next-auth/react";

// recoil
import { commentModalState } from "../atoms/modal";
import { useRecoilValue } from "recoil";

// components
import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../features/feed/Feed";
import Login from "../features/login/Login";
import CommentModal from "../features/comment/CommentModal";

// types
import type { GetServerSideProps, NextPage } from "next";
import { PageProps } from "../type";
import Widgets from "../components/Widgets";

const Home: NextPage<PageProps> = ({
  trendingResults,
  followResults,
  providers,
}) => {
  const { data: session } = useSession();

  const commentModal = useRecoilValue(commentModalState);

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex mx-auto max-w-[1500px] min-h-screen bg-black">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {commentModal.open && <CommentModal />}
      </main>
    </div>
  );
};

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

export default Home;
