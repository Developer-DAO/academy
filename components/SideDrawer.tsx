import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react'
import React from 'react'

import HamburgerIcon from './HamburgerIcon'

function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <IconButton
        onClick={onOpen}
        aria-label="Open Drawer"
        variant="ghost"
        icon={<HamburgerIcon />}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="4xl" textColor="yellow.300">
            Smart Contract Development Track
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} align="stretch">
              <Box background="gray.500" padding="10" rounded="3xl">
                <Text fontSize="2xl" textColor="yellow.300">
                  Lesson1: Intro to Smart Contract Development
                </Text>
              </Box>
              <Box background="gray.500" padding="10" rounded="3xl">
                <Text fontSize="2xl" textColor="yellow.300">
                  Lesson2: Build a Basic NFT
                </Text>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer
