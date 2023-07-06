import { Flex, Stack, Heading, Box } from "@chakra-ui/react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ContentBanner } from "@/components/ContentBanner";
import { CONTENT_PATH } from "@/lib/constants";

interface Lesson {
  path: string;
  frontMatter: any;
  slug: string;
}

interface LessonProps {
  lessons: Lesson[];
}

interface LessonTrackMap {
  [key: string]: Lesson[];
}

const Lessons: React.FC<LessonProps> = ({ lessons }: { lessons: Lesson[] }) => {
  const result = lessons.reduce((acc: LessonTrackMap, curr) => {
    if (!acc[curr.path]) {
      // initial an array of lessons for a given track
      acc[curr.path] = [];
    }
    acc[curr.path].push(curr);
    return acc;
  }, {});

  return (
    <>
      <Flex as="main" py={5} px={[4, 10, 16]} direction="column" minH="90vh">
        <Stack spacing={5} direction="column">
          <>
            {Object.entries(result).map((track, idx: number) => {
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
    </>
  );
};

export default Lessons;

export const getStaticProps = async () => {
  const contentDir = path.join(CONTENT_PATH);
  const directories = fs.readdirSync(path.join(contentDir));
  const lessons: Lesson[] = [];
  directories.reverse().map((folder) => {
    if (fs.lstatSync(path.join(contentDir, folder)).isDirectory()) {
      fs.readdirSync(path.join(contentDir, folder)).map((file) => {
        if (!fs.lstatSync(path.join(contentDir, folder, file)).isDirectory()) {
          const markdownWithMeta = fs.readFileSync(
            path.join(contentDir, folder, file),
            "utf-8"
          );

          const { data: frontMatter } = matter(markdownWithMeta);
          lessons.push({
            path: folder,
            frontMatter,
            slug: `${file.replace(".mdx", "")}`,
          });
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
