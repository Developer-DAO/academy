import Hero from "@/components/Hero";
import { type NextPageWithLayout } from "./_app";
import Layout from "@/components/Layout";
import { type ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return <Hero />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
      title="Learn Web3"
      description="D_D Academy is on a mission to educate coders to the exciting possibilities of building web3 Open Source."
    >
      {page}
    </Layout>
  );
};

export default Home;
