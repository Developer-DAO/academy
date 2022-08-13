import { ArrowRightIcon } from '@chakra-ui/icons'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import React from 'react'

function ContentSideDrawer(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button
        onClick={onOpen}
        aria-label="Open Drawer"
        variant="ghost"
        fontSize="xl"
        fontWeight="bold"
        bg="gray.700"
        mt="1em"
      >
        {props.title}&nbsp;&nbsp;
        <ArrowRightIcon />
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay
          backdropFilter="auto"
          backdropInvert="10%"
          backdropBlur="3px"
        />
        <DrawerContent bg="#00000f" px="4" pb="8">
          <DrawerCloseButton />
          <DrawerHeader fontSize="3xl" textColor="yellow.300">
            {props.title}
          </DrawerHeader>
          <DrawerBody>{props.children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ContentSideDrawer
