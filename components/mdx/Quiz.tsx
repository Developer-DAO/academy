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

const Quiz: FC<QuizProps> = (props: QuizProps) => {
  const quiz: Quiz = require(`../../utils/quizzes/${props.quiz}.json`)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currenQuestionIndex, setCurrentQuestionIndex] = useState(0)

  return (
    <>
      {!showQuiz && (
        <Button
          colorScheme="yellow"
          backgroundColor="yellow.600"
          display="flex"
          margin="auto"
          onClick={() => setShowQuiz(true)}
        >
          Take quiz
        </Button>
      )}

      <Modal
        closeOnOverlayClick={false}
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      >
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
                {quiz.questions[currenQuestionIndex].question}
              </Text>
              <Box
                w="100%"
                borderRadius="md"
                background="gray.600"
                padding="3"
                cursor="pointer"
              >
                Transactions
              </Box>
              <Box
                w="100%"
                borderRadius="md"
                background="yellow.600"
                padding="3"
                cursor="pointer"
              >
                Smart Contracts
              </Box>
              <Box
                w="100%"
                borderRadius="md"
                background="gray.600"
                padding="3"
                cursor="pointer"
              >
                Just user wallets have an address
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                alignItems="center"
              >
                <Text w="100%">{`Question ${currenQuestionIndex + 1}/${
                  quiz.questions.length
                }`}</Text>
                <Box w="100%" display="flex">
                  <Button mx="2">{'< Previous'}</Button>
                  <Button>{'Next >'}</Button>
                </Box>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              mx="1"
              colorScheme="red"
              backgroundColor="red.600"
              onClick={() => setShowQuiz(false)}
            >
              Cancel
            </Button>
            <Button mx="1" colorScheme="green" backgroundColor="green.400">
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Quiz
