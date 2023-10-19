/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Badge, Center, Text } from "@chakra-ui/react";
import Quiz from "./Quiz";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAppContext } from "@/contexts/AppContext";

type QuizStatusCheckerTye = {
  quiz: string;
};

const QuizStatusChecker = ({ quiz }: QuizStatusCheckerTye) => {
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const { address, isDisconnected } = useAccount();
  const { completedQuizzesIds, allLessonsData } = useAppContext();

  // Requests
  useMemo(() => {
    if (allLessonsData?.length && completedQuizzesIds?.length) {
      const actualLessonId: string = allLessonsData?.find(
        (lesson) => lesson.quizFileName === `${quiz}.json`,
      )?.id;

      if (actualLessonId === undefined) return;

      if (completedQuizzesIds.includes(actualLessonId)) {
        setQuizCompleted(true);
      }
    }
  }, [allLessonsData, completedQuizzesIds, quiz]);

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
