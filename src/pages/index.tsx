import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["ip.get"]);

  return (
    <>
      <Head>
        <title>What&apos;s your IP?</title>
        <meta name="description" content="Get your IP Address" />
      </Head>

      <div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
        {isLoading && "Loading..."}
        {error && <p>There was an error.</p>}
        {data && <p className="max-w-lg">IP Address: {data.ip}</p>}
      </div>
    </>
  );
};

export default Home;
