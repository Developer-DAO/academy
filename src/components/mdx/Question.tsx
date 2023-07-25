import { Box, VStack, Text, Button, useToast } from "@chakra-ui/react";
import React, { useState, type Dispatch, type SetStateAction } from "react";

interface QuestionProps {
  question: string;
}

interface Question {
  question: string;
  options: [
    {
      answer: string;
      correct?: boolean;
    }
  ];
}

const Question = (props: QuestionProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
  const question: Question = require(`@/utils/questions/${props.question}.json`);
  const [optionsSelected, setOptionsSelected]: [
    number[],
    Dispatch<SetStateAction<number[]>>
  ] = useState([-1]);
  const toast = useToast();

  const selectAnswer = (optionIndex: number) => {
    if (optionsSelected.includes(optionIndex)) {
      return setOptionsSelected(
        optionsSelected.filter((o) => o !== optionIndex)
      );
    }

    setOptionsSelected(
      [...optionsSelected, optionIndex].filter((o) => o !== -1) // Remove the -1 of the state initialization
    );
  };

  const getOptionBackground = (optionIndex: number) => {
    if (optionsSelected.includes(optionIndex)) {
      return "yellow.600";
    }
    return "gray.600";
  };

  const quizNotAnswered = () => {
    toast({
      title: "No answer selected",
      description: "Choose an answer!",
      status: "warning",
      duration: 9000,
      isClosable: true,
    });
  };

  const quizFailedToast = () => {
    toast({
      title: "Wrong answer",
      description: `Try again fren`,
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };

  const quizSuccessToast = () => {
    toast({
      title: "Correct answer!",
      description: "Let's goooo",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const submit = () => {
    if (optionsSelected.includes(-1)) {
      return quizNotAnswered();
    }
    const correctAnswers = question.options.filter((o) => o.correct).length;

    let success = true;
    let correctAnswersCount = 0;

    optionsSelected.forEach((o) => {
      if (!question.options[o]?.correct) success = false;
      correctAnswersCount++;
    });

    if (correctAnswers !== correctAnswersCount) success = false;

    if (success) return quizSuccessToast();

    return quizFailedToast();
  };

  return (
    <VStack
      spacing={4}
      background="gray.900"
      padding="6"
      borderRadius="md"
      mt="7"
    >
      <Text fontWeight="bold" textAlign="left" w="100%">
        {question.question}
      </Text>
      {question.options.map((o, index) => {
        return (
          <Box
            w="100%"
            borderRadius="md"
            background={getOptionBackground(index)}
            padding="3"
            cursor="pointer"
            onClick={() => selectAnswer(index)}
            key={index}
          >
            {o.answer}
          </Box>
        );
      })}
      <Button
        mx="1"
        mt="7"
        colorScheme="green"
        backgroundColor="green.400"
        onClick={submit}
        alignSelf="flex-start"
      >
        Submit
      </Button>
    </VStack>
  );
};

export default Question;
