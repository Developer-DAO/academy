import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Input,
    IconButton,
    Flex,
    Box,
    Text

} from '@chakra-ui/react'
import React from 'react'

import { useRef } from 'react'
import HamburgerIcon from './HamburgerIcon'


function SideDrawer() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex justify={'end'}>
            <Box mr={8} mt={7}>
                <IconButton onClick={onOpen} aria-label='Search database' variant='ghost' icon={<HamburgerIcon />} />
                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    size='xl'

                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader fontSize='4xl' textColor='yellow.300'>Smart Contract Development Track</DrawerHeader>
                        <DrawerBody>
                            <Box>
                                <Box background='gray.500' padding='10' rounded='3xl'>
                                    <Text fontSize='2xl' textColor='yellow.300'>Lesson1: Intro to Smart Contract Development</Text>
                                    <Text>Lorem Ipsum TO BECOME AND AWESOME DEVELOPER</Text>
                                </Box>
                            </Box>
                            <Box mt='6'>
                                <Box background='gray.500' padding='10' rounded='3xl'>
                                    <Text fontSize='2xl' textColor='yellow.300'>Lesson2: Build a Basic NFT</Text>
                                    <Text>Lorem Ipsum TO BECOME AND AWESOME DEVELOPER</Text>
                                </Box>
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        </Flex>




    )
}

export default SideDrawer