/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { CONTENT_PATH } from "@/lib/constants";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

export interface Lesson {
  frontMatter: any;
  slug: string;
  path: string;
  completed?: boolean;
}
export interface Lessons {
  lessons: {
    frontMatter: any;
    slug: string;
  }[];
}

export interface LessonProps {
  projects: Project[];
  fundamentals: Fundamental[];
}

export interface Fundamental {
  path: Path;
  frontMatter: FundamentalFrontMatter;
  slug: string;
}

export interface FundamentalFrontMatter {
  title: string;
  description: string;
  icons: string[];
  authors?: string[];
  i18n?: string;
  author?: string[] | string;
}

export enum Path {
  Fundamentals = "fundamentals",
}

export interface Project {
  path: string;
  frontMatter: ProjectFrontMatter;
  slug: string;
  completed: boolean;
}

export interface ProjectFrontMatter {
  title: string;
  description: string;
  icons: string[];
  i18n?: string;
  author?: string;
}

const GettingStarted: React.FC<Lessons> = ({ lessons }) => {
  const [formattedLessons, setFormattedLessons] = useState<LessonProps>();

  const [fetchNow, setFetchNow] = useState(true);
  const { data: sessionData } = useSession();

  const { address } = useAccount();

  // Requests
  // - All
  const {
    data: completedQuizzesAllData,
    isLoading: completedQuizzesAllIsLoading,
    refetch: refetchCompletedQuizzesAll,
  } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      enabled: sessionData?.user !== undefined && fetchNow,
    },
  );

  useEffect(() => {
    const result: LessonProps = lessons.reduce((acc: any, curr: any) => {
      if (!acc[curr.path]) acc[curr.path] = [];

      acc[curr.path].push(curr);
      return acc;
    }, {});

    if (sessionData?.user !== undefined && !!completedQuizzesAllData) {
      console.log(
        "1 ",
        { completedQuizzesAllData },
        {
          a: !completedQuizzesAllIsLoading,
          b: !!completedQuizzesAllData,
        },
      );

      const completedSlugs: string[] = completedQuizzesAllData?.map(
        (quiz: any) =>
          quiz.lesson
            .replace("quiz-lesson-", "")
            .replace("lesson-", "")
            .replace("-quiz", "") || [],
      );

      const completedQuizzes: Project[] = result?.projects?.map(
        (project: Project) => {
          if (completedSlugs.includes(project.slug)) project.completed = true;
          else project.completed = false;
          return project;
        },
      );

      setFormattedLessons({ ...result, projects: completedQuizzes });
      setFetchNow(false);
      console.log("1");
    } else {
      setFormattedLessons(result);
      // setFetchNow(false);
      console.log("2");
    }
  }, [
    completedQuizzesAllData,
    completedQuizzesAllIsLoading,
    lessons,
    sessionData,
  ]);

  console.log({ address });

  // useEffect(() => {
  //   if (address) {
  //     console.log("Refetch");
  //     refetchCompletedQuizzesAll();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address]);

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
        {formattedLessons
          ? Object.entries(formattedLessons).map((track: any, idx: number) => {
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

export const getStaticProps = () => {
  const contentDir = path.join(CONTENT_PATH);
  const directories = fs.readdirSync(path.resolve(contentDir));
  const lessons: object[] = [];
  directories.reverse().map((folder) => {
    if (fs.lstatSync(path.join(contentDir, folder)).isDirectory()) {
      fs.readdirSync(path.join(contentDir, folder)).map((file) => {
        if (!fs.lstatSync(path.join(contentDir, folder, file)).isDirectory()) {
          const markdownWithMeta = fs.readFileSync(
            path.join(contentDir, folder, file),
            "utf-8",
          );

          const { data: frontMatter } = matter(markdownWithMeta);
          if (folder === "fundamentals") {
            lessons.push({
              path: folder,
              frontMatter,
              slug: file.replace(".mdx", ""),
            });
          } else {
            lessons.push({
              path: folder,
              frontMatter,
              slug: file.replace(".mdx", ""),
              completed: false,
            });
          }
        }
      });
    }
  });

  return {
    props: {
      lessons,
    },
  };
};

export default GettingStarted;
