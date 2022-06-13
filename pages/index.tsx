import { getProviders, getSession, useSession } from "next-auth/react";

// types
import type { GetServerSideProps, NextPage } from "next";
import { Providers } from "../type";

// components
import Head from "next/head";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../features/feed/Feed";
import Login from "../features/login/Login";

type Props = {
  providers: Providers;
};

const Home: NextPage<Props> = ({ providers }) => {
  const { data: session } = useSession();

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
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
};

export default Home;
