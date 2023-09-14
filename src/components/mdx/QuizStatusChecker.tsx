/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Badge, Text } from "@chakra-ui/react";
import Quiz from "./Quiz";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";

type QuizStatusCheckerTye = {
  quiz: string;
};

const QuizStatusChecker = ({ quiz }: QuizStatusCheckerTye) => {
  const [fetchNow, setFetchNow] = useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const { data: sessionData } = useSession();

  // Requests

  // - Get All lessons to get the Id's
  const { data: allLessons } = api.lessons.getAll.useQuery();

  // - All completed
  const { data: completedQuizzesAllData } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      enabled: sessionData?.user !== undefined && fetchNow,
    },
  );

  useMemo(() => {
    if (allLessons?.length && completedQuizzesAllData?.length && fetchNow) {
      const completedIds = completedQuizzesAllData.map((quiz) => quiz.lesson);

      const actualLessonId = allLessons?.find(
        (lesson) => lesson.quizFileName === `${quiz}.json`,
      )?.id;

      if (actualLessonId === undefined) return;

      if (completedIds.includes(actualLessonId)) {
        setQuizCompleted(true);
      }

      setFetchNow(false);
    }
  }, [allLessons, completedQuizzesAllData, fetchNow, quiz]);

  if (completedQuizzesAllData === undefined) return null;

  return quizCompleted ? (
    <Badge
      display="flex"
      margin="auto"
      justifyContent="center"
      colorScheme="green"
      w={"fit-content"}
    >
      <Text fontSize="xl">Quiz Completed</Text>
    </Badge>
  ) : (
    <Quiz quiz={quiz} />
  );
};

export default QuizStatusChecker;
