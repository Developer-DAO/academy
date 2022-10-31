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
} from '@chakra-ui/react'
import React, { FC, useState } from 'react'

interface QuizProps {
  quiz: string
}

interface Quiz {
  title: string
  questions: [
    {
      question: string
      options: [
        {
          answer: string
          correct?: boolean
        },
      ]
    },
  ]
}

interface Answers {
  [index: string]: number
}

const Quiz: FC<QuizProps> = (props: QuizProps) => {
  const quiz: Quiz = require(`../../utils/quizzes/${props.quiz}.json`)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})

  const nextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const previousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const previousButtonVisibility = () => {
    return currentQuestionIndex == 0 ? 'hidden' : 'visible'
  }

  const nextButtonVisibility = () => {
    return currentQuestionIndex + 1 == quiz.questions.length
      ? 'hidden'
      : 'visible'
  }

  const selectAnswer = (answerIndex: number) => {
    let newAnswers: Answers = { ...answers }
    newAnswers[currentQuestionIndex.toString()] = answerIndex
    setAnswers(newAnswers)
  }

  const getQuestionBackground = (optionIndex: number) => {
    if (answers[currentQuestionIndex] == optionIndex) {
      return 'yellow.600'
    }
    return 'gray.600'
  }

  const submit = () => {
    if (quiz.questions.length != Object.keys(answers).length) {
      return alert('You must answer all the questions!')
    }

    let hasWrongAnswers = false

    quiz.questions.forEach((q, index) => {
      if (!q.options[answers[index]].correct) {
        hasWrongAnswers = true
      }
    })

    if (hasWrongAnswers) {
      return alert('Test not passed :(')
    }

    return alert('Test passed :D')
  }

  const cancelQuiz = () => {
    setAnswers({})
    setShowQuiz(false)
    setCurrentQuestionIndex(0)
  }

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
                {quiz.questions[currentQuestionIndex].question}
              </Text>
              {quiz.questions[currentQuestionIndex].options.map((o, index) => {
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
                )
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
                    {'< Previous'}
                  </Button>
                  <Button
                    visibility={nextButtonVisibility()}
                    onClick={nextQuestion}
                  >
                    {'Next >'}
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
            >
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Quiz
