import { Box } from "@chakra-ui/react";
import Topbar from "./Topbar";
import Footer from "./footer/Footer";
import { NextSeo } from "next-seo";
import Banner from "./Banner";

interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export default function Layout({ children, title, description }: Props) {
  return (
    <>
      <NextSeo
        title={`Developer DAO Academy | ${title}`}
        description={description}
        openGraph={{
          type: "website",
          locale: "en_US",
          url: `https://${
            process.env.NEXT_PUBLIC_VERCEL_URL as string
          }/landing-page-screenshot.png`,
          site_name: `Developer DAO Academy`,
          title: `Developer DAO Academy | ${title}`,
          description: description,
          images: [
            {
              url: `https://${
                process.env.NEXT_PUBLIC_VERCEL_URL as string
              }/landing-page-screenshot.png`,
              alt: "Developer DAO Academy",
              type: "image/png",
            },
          ],
        }}
        twitter={{
          handle: "@devdao_academy",
          site: "@devdao_academy",
          cardType: "summary_large_image",
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon/favicon.ico",
          },
        ]}
      />
      <Banner />
      <Topbar />
      <Box
        as="main"
        p="1.25em"
        px="5%"
        mx={{ base: "2rem", md: "6rem", lg: "10rem" }}
        minH={{ base: "calc(75vh - 3.5rem)" }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
}
