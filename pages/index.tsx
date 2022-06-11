import type { NextPage } from "next";

import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../features/feed/Feed";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex mx-auto max-w-[1500px] min-h-screen bg-black">
        <Sidebar />
        <Feed />
      </main>
    </div>
  );
};

export default Home;
