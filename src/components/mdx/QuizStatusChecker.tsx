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
  // - All
  const { data: completedQuizzesAllData } = api.completedQuizzes.all.useQuery(
    undefined, // no input
    {
      // Disable request if no session data
      enabled: sessionData?.user !== undefined && fetchNow,
    },
  );

  useMemo(() => {
    if (completedQuizzesAllData?.length && fetchNow) {
      const completedSlugs = completedQuizzesAllData.map((quiz) =>
        quiz.lesson
          .replace("quiz-lesson-", "")
          .replace("lesson-", "")
          .replace("-quiz", ""),
      );

      const actualSlugNumber = quiz
        .replace("quiz-lesson-", "")
        .replace("lesson-", "")
        .replace("-quiz", "");

      if (completedSlugs.includes(actualSlugNumber)) {
        setQuizCompleted(true);
      }

      setFetchNow(false);
    }
  }, [completedQuizzesAllData, fetchNow, quiz]);

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
