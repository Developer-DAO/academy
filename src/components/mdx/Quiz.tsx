/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  VStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  getCorrectAnswersIndexes,
  haveSameElements,
} from "@/utils/QuizHelpers";
import { api } from "@/utils/api";

interface QuizProps {
  quiz: string;
}

interface Quiz {
  title: string;
  questions: [
    {
      question: string;
      options: [
        {
          answer: string;
          correct?: boolean;
        }
      ];
    }
  ];
}

interface Answers {
  [index: string]: number[];
}

const Quiz = (props: QuizProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const quiz: Quiz = require(`@/utils/quizzes/${props.quiz}.json`);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [correctAnswers, setCorrectAnswers] = useState<number[] | null>(null);
  const toast = useToast();

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const previousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const previousButtonVisibility = () => {
    return currentQuestionIndex === 0 ? "hidden" : "visible";
  };

  const nextButtonVisibility = () => {
    return currentQuestionIndex + 1 == quiz.questions.length
      ? "hidden"
      : "visible";
  };

  const selectAnswer = (answerIndex: number) => {
    console.log("asdasd");
    const newAnswers: Answers = { ...answers };

    if (newAnswers[currentQuestionIndex]?.includes(answerIndex)) {
      newAnswers[currentQuestionIndex.toString()] = newAnswers[
        currentQuestionIndex
      ]?.filter((a) => a !== answerIndex) as number[];
    } else {
      newAnswers[currentQuestionIndex.toString()] = [
        ...(answers[currentQuestionIndex] || []),
        answerIndex,
      ];
    }

    setAnswers(newAnswers);
  };

  const getQuestionBackground = (optionIndex: number) => {
    if (
      correctAnswers &&
      correctAnswers.indexOf(currentQuestionIndex) !== -1 &&
      quiz.questions[currentQuestionIndex]?.options[optionIndex]?.correct &&
      answers[currentQuestionIndex]?.includes(optionIndex)
    ) {
      return "green.500";
    }

    if (answers[currentQuestionIndex]?.includes(optionIndex)) {
      return "yellow.600";
    }
    return "gray.600";
  };

  const quizNotAnswered = () => {
    toast({
      title: "!answers",
      description: "Please answer all the questions",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  };

  const quizFailedToast = (wrongAnswersCounter: number) => {
    toast({
      title: "Quiz failed",
      description: `You have ${wrongAnswersCounter} wrong answers :(`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  // - Add
  const { mutate: quizzesAddMutate, isLoading: quizzesAddIsLoading } =
    api.completedQuizzes.add.useMutation({
      onSuccess: () => {
        return quizSuccessToast();
      },
    });

  const quizSuccessToast = () => {
    // api.completedQuizzes.add.useMutation({
    //   lesson: props.quiz,
    // });
    toast({
      title: "Amazing!",
      description: "You have passed the lesson!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const submit = () => {
    if (quiz.questions.length != Object.keys(answers).length) {
      return quizNotAnswered();
    }

    let wrongAnswersCounter = 0;

    const newCorrectAnswers: number[] = [];

    quiz.questions.forEach((question, index) => {
      const correctAnswersIndexes = getCorrectAnswersIndexes(question);

      if (!haveSameElements(answers[index]!, correctAnswersIndexes)) {
        wrongAnswersCounter++;
        return;
      }

      newCorrectAnswers.push(index);
    });

    setCorrectAnswers(newCorrectAnswers);

    if (wrongAnswersCounter >= 1) {
      return quizFailedToast(wrongAnswersCounter);
    }

    // return quizSuccessToast();

    quizzesAddMutate({
      lesson: props.quiz,
    });
  };

  const cancelQuiz = () => {
    setAnswers({});
    setShowQuiz(false);
    setCorrectAnswers(null);
    setCurrentQuestionIndex(0);
  };

  return (
    <>
      <Button
        colorScheme="yellow"
        backgroundColor="yellow.600"
        color="white"
        display="flex"
        margin="auto"
        onClick={() => setShowQuiz(true)}
      >
        Take quiz
      </Button>

      <Modal closeOnOverlayClick={false} isOpen={showQuiz} onClose={cancelQuiz}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{quiz.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack
              spacing={4}
              background="gray.900"
              padding="6"
              borderRadius="md"
            >
              <Text fontWeight="bold" w="100%">
                {quiz.questions[currentQuestionIndex]!.question}
              </Text>
              {quiz.questions[currentQuestionIndex]!.options.map((o, index) => {
                return (
                  <Box
                    w="100%"
                    borderRadius="md"
                    background={getQuestionBackground(index)}
                    padding="3"
                    cursor="pointer"
                    onClick={() => selectAnswer(index)}
                    key={index}
                  >
                    {o.answer}
                  </Box>
                );
              })}
              <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                alignItems="center"
              >
                <Text w="100%">{`Question ${currentQuestionIndex + 1}/${
                  quiz.questions.length
                }`}</Text>
                <Box w="100%" display="flex">
                  <Button
                    mx="2"
                    visibility={previousButtonVisibility()}
                    onClick={previousQuestion}
                  >
                    {"< Previous"}
                  </Button>
                  <Button
                    visibility={nextButtonVisibility()}
                    onClick={nextQuestion}
                  >
                    {"Next >"}
                  </Button>
                </Box>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              mx="1"
              colorScheme="red"
              backgroundColor="red.600"
              onClick={cancelQuiz}
            >
              Cancel
            </Button>
            <Button
              mx="1"
              colorScheme="green"
              backgroundColor="green.400"
              onClick={submit}
              isLoading={quizzesAddIsLoading}
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Quiz;
