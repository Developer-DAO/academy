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
    // title="Dapp Starterkit Marketing Page" // DEV_NOTE: This is for the next-seo per page config
    // description="A marketing page for your dapp." // DEV_NOTE: This is for the next-seo per page config
    >
      {page}
    </Layout>
  );
};

export default Home;
