/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import NextLink from "next/link";
import {
  Heading,
  Flex,
  Stack,
  Button,
  Text,
  Image,
  UnorderedList,
  ListItem,
  Link,
  Divider,
  Box,
  Badge,
} from "@chakra-ui/react";
import { type ReactElement } from "react";
import Layout from "@/components/Layout";
import { type NextPageWithLayout } from "./_app";
import { type Lessons, type Lesson } from "@/interfaces";
import { useAppContext } from "@/contexts/AppContext";

const GettingStartedPage: NextPageWithLayout<Lessons> = () => {
  const { lessonsWithStatus } = useAppContext();

  return (
    <Flex
      py={5}
      px={[4, 10, 16]}
      direction="column"
      minH="100vh"
      mt="6"
      borderRadius="5px"
    >
      <Stack spacing={5} direction="column">
        <Heading
          as="h2"
          fontSize="3xl"
          textAlign="center"
          color="#F96C9D"
          apply="mdx.h2"
        >
          Getting Started
        </Heading>

        <Heading apply="mdx.h3" as="h3" fontSize="2xl" textAlign="center" p={5}>
          What is D_D Academy?
        </Heading>
        <Text apply="mdx.p" as="p" fontSize="xl" textAlign="center">
          <strong>D_D Academy</strong> is an open-source education platform
          created by the Developer DAO.
        </Text>
        <Text apply="mdx.p" as="p" fontSize="xl" textAlign="center">
          We seek to{" "}
          <Text fontWeight="bold" as="strong" color="#F96C9D">
            empower learners
          </Text>{" "}
          with knowledge and tools that can be applied to real-world projects
          while promoting a healthy learning environment.
        </Text>
        <Divider />
        <Heading
          apply="mdx.h3"
          as="h3"
          fontSize="2xl"
          textAlign="center"
          px={5}
        >
          Current Lessons
        </Heading>
        {lessonsWithStatus
          ? Object.entries(lessonsWithStatus).map((track: any, idx: number) => {
              return (
                <UnorderedList
                  listStyleType="none"
                  textAlign="center"
                  as="div"
                  key={idx}
                >
                  <Heading size="md" color="yellow.300">
                    {track[0].toUpperCase()}
                  </Heading>
                  <>
                    {track[1].map((lesson: Lesson, idx: number) => (
                      <ListItem
                        key={idx}
                        my="2"
                        py="2"
                        maxW="40vw"
                        margin="0 auto"
                      >
                        <Link
                          as={NextLink}
                          href={`/lessons/${lesson.path}/${lesson.slug}`}
                          passHref
                        >
                          <Button
                            height="auto"
                            style={{
                              whiteSpace: "normal",
                              wordWrap: "break-word",
                              padding: "0.5rem",
                              width: "100%",
                              fontSize: "xl",
                            }}
                          >
                            {lesson.frontMatter.title}
                            {lesson &&
                            lesson.completed &&
                            lesson.completed === true ? (
                              <Badge
                                ml="1"
                                alignItems={"flex-end"}
                                colorScheme="green"
                                position="absolute"
                                right={3}
                              >
                                Completed
                              </Badge>
                            ) : null}
                          </Button>
                        </Link>
                      </ListItem>
                    ))}
                  </>
                </UnorderedList>
              );
            })
          : null}
        <Divider />

        <Heading apply="mdx.h3" as="h3" fontSize="2xl" textAlign="center" p={5}>
          This project is just getting started.
        </Heading>

        <Text apply="mdx.div" as="div" fontSize="xl" textAlign="center">
          <UnorderedList listStyleType="none">
            <ListItem>
              We&apos;re looking for{" "}
              <Text fontWeight="bold" as="strong" color="#F96C9D">
                feedback
              </Text>{" "}
              about this project and our current lessons.{" "}
              <Link
                as={NextLink}
                href={
                  "https://github.com/Developer-DAO/academy/issues/new?assignees=&labels=needs+triage%2C+bug&template=bug_report.md&title="
                }
                passHref
                isExternal
                textDecoration="underline"
              >
                Submit your suggestion or bug report.
              </Link>
            </ListItem>
            <ListItem>
              We&apos;re also looking for{" "}
              <Text fontWeight="bold" as="strong" color="#F96C9D">
                Developer DAO members
              </Text>{" "}
              who are interested in writing lesson content, or building website
              and blockchain features. The team can be found in the Developer
              DAO Discord{" "}
              <Text fontWeight="bold" as="strong">
                #d_d-academy
              </Text>{" "}
              channel.
            </ListItem>
          </UnorderedList>
        </Text>
        <Divider />

        <Heading apply="mdx.h3" as="h3" fontSize="2xl" textAlign="center" p={5}>
          Highlights of Resources
        </Heading>
        <Box alignSelf="center">
          <Image
            src="/assets/getting-started/img_1.png"
            alt="highlights of resources"
            w="40em"
          />
        </Box>
        <Divider />

        <Heading apply="mdx.h3" as="h3" fontSize="2xl" textAlign="center" p={5}>
          Roadmap
        </Heading>
        <Box alignSelf="center" pb="1.25rem">
          <Image
            src="/assets/getting-started/img_2.png"
            alt="3 month roadmap"
            w="40em"
            borderRadius="0.875rem"
          />
        </Box>
      </Stack>
    </Flex>
  );
};

// export const getStaticProps = () => {
//   const contentDir = path.join(CONTENT_PATH);
//   const directories = fs.readdirSync(path.resolve(contentDir));
//   const lessons: object[] = [];
//   directories.reverse().map((folder) => {
//     if (fs.lstatSync(path.join(contentDir, folder)).isDirectory()) {
//       fs.readdirSync(path.join(contentDir, folder)).map((file) => {
//         if (!fs.lstatSync(path.join(contentDir, folder, file)).isDirectory()) {
//           const markdownWithMeta = fs.readFileSync(
//             path.join(contentDir, folder, file),
//             "utf-8",
//           );

//           const { data: frontMatter } = matter(markdownWithMeta);
//           if (folder === "fundamentals") {
//             lessons.push({
//               path: folder,
//               frontMatter,
//               slug: file.replace(".mdx", ""),
//             });
//           } else {
//             lessons.push({
//               path: folder,
//               frontMatter,
//               slug: file.replace(".mdx", ""),
//               completed: false,
//             });
//           }
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

GettingStartedPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout
    // title="Dapp Starterkit Marketing Page" // DEV_NOTE: This is for the next-seo per page config
    // description="A marketing page for your dapp." // DEV_NOTE: This is for the next-seo per page config
    >
      {page}
    </Layout>
  );
};

export default GettingStartedPage;
