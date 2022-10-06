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
  Box,
} from '@chakra-ui/react'
import React from 'react'

function SideDrawer(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { buttonText, title } = props
  const drawerTitle = title ? title : buttonText

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
        height={[`${buttonText.length > 30 ? '3.75rem' : '2.5rem'}`, '2.5rem']}
        style={{
          whiteSpace: 'normal',
          wordWrap: 'break-word',
        }}
        rightIcon={<ArrowRightIcon />}
      >
        {buttonText}
        {/* &nbsp;&nbsp; */}
        {/* <ArrowRightIcon /> */}
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay
          h="100vw"
          backdropFilter="auto"
          backdropInvert="10%"
          backdropBlur="3px"
        />
        <DrawerContent bg="#00000f" px="4" pb="8">
          <DrawerCloseButton />
          <DrawerHeader fontSize="3xl" textColor="yellow.300">
            {drawerTitle}
          </DrawerHeader>
          <DrawerBody>{props.children}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer
