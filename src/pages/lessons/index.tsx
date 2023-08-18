/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Flex, Stack, Heading, Box } from "@chakra-ui/react";
import { ContentBanner } from "@/components/ContentBanner";
import { type NextPageWithLayout } from "../_app";
import { type ReactElement } from "react";
import Layout from "@/components/Layout";
import { useAppContext } from "@/contexts/AppContext";
import { type Lesson } from "@/interfaces";

const LessonsPage: NextPageWithLayout = () => {
  const { lessonsWithStatus } = useAppContext();

  return (
    <Flex py={5} px={[4, 10, 16]} direction="column" minH="90vh">
      <Stack spacing={5} direction="column">
        <>
          {Object.entries(lessonsWithStatus).map((track, idx: number) => {
            const trackName = track[0].toUpperCase();
            const lessons = track[1];
            return (
              <Box key={idx}>
                <Heading size="lg" color="yellow.300">
                  {trackName}
                </Heading>
                {lessons.map((lesson: Lesson, idx: number) => {
                  return (
                    <Box marginTop="4" key={idx}>
                      <ContentBanner lesson={lesson} idx={idx} />
                    </Box>
                  );
                })}
              </Box>
            );
          })}
        </>
      </Stack>
    </Flex>
  );
};

LessonsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
    // title="Dapp Starterkit Marketing Page" // DEV_NOTE: This is for the next-seo per page config
    // description="A marketing page for your dapp." // DEV_NOTE: This is for the next-seo per page config
    >
      {page}
    </Layout>
  );
};

export default LessonsPage;

// export const getStaticProps = () => {
//   const contentDir = path.join(CONTENT_PATH);
//   const directories = fs.readdirSync(path.join(contentDir));
//   const lessons: Lesson[] = [];
//   directories.reverse().map((folder) => {
//     if (fs.lstatSync(path.join(contentDir, folder)).isDirectory()) {
//       fs.readdirSync(path.join(contentDir, folder)).map((file) => {
//         if (!fs.lstatSync(path.join(contentDir, folder, file)).isDirectory()) {
//           const markdownWithMeta = fs.readFileSync(
//             path.join(contentDir, folder, file),
//             "utf-8",
//           );

//           const { data: frontMatter } = matter(markdownWithMeta);
//           lessons.push({
//             path: folder,
//             frontMatter,
//             slug: `${file.replace(".mdx", "")}`,
//           });
//         }
//       });
//     }
//   });
//   return {
//     props: {
//       lessons,
//     },
//   };
// };
