import type { NextPage } from "next";
import Head from "next/head";
import Sidebar from "../components/Sidebar/Sidebar";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar />
    </div>
  );
};

export default Home;
