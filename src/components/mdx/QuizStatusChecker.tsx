/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Badge, Center, Text } from "@chakra-ui/react";
import Quiz from "./Quiz";
import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

type QuizStatusCheckerTye = {
  quiz: string;
};

const QuizStatusChecker = ({ quiz }: QuizStatusCheckerTye) => {
  const [fetchNow, setFetchNow] = useState<boolean>(true);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const { data: sessionData } = useSession();
  const { address, isDisconnected } = useAccount();

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

  return isDisconnected || !address ? (
    <>
      <Center>
        <Text
          fontWeight="bold"
          fontSize="1.875rem"
          letterSpacing={-0.025}
          color="yellow.300"
          as="u"
        >
          Connect your wallet and Sign in to start the quiz
        </Text>{" "}
      </Center>
      <br />
      <Center>
        <ConnectButton />
      </Center>
    </>
  ) : quizCompleted ? (
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
