import { getProviders, getSession, useSession } from "next-auth/react";

import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

import Head from "next/head";
import Feed from "../components/Feed";
import Login from "../components/Login";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";

const Home = ({ trendingResults, followResults, providers }) => {
  console.log("providers", providers);
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;

  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />

        {isOpen && <Modal />}
      </main>
    </div>
  );
};

export default Home;

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
