import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Stack,
  HStack,
  Input
} from '@chakra-ui/react'
import { IconButton, CloseButton, Button, Icon, Spacer } from '@chakra-ui/react'
import { FiStar, FiSettings } from 'react-icons/fi'
import { AiFillCaretRight } from 'react-icons/ai'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import { TbLayoutBoardSplit } from 'react-icons/tb'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SimpleSidebar({ children, updateRefresh }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100%" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose1={() => onClose}
        display={{ base: 'none', md: 'block' }}
        update={updateRefresh}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose1={onClose} update={updateRefresh} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box h="100%" w="100%" pos="absolute" top="0" left="0" zIndex="-1">
        {children}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose1, update, ...rest }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [workspaceName, setWorkspaceName] = useState('')
  const router = useRouter()
  const { uID } = router.query
  const submitWorkspace = async e => {
    const res = await fetch(`/api/w/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ workspaceName: workspaceName, userId: uID })
    })
    const data = await res.json()
    console.log(data)
    setWorkspaceName('')
    update()
    onClose()
  }

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      top="0"
      zIndex={-1}
      {...rest}
    >
      <Flex h="10" m="2" justifyContent="end">
        <CloseButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onClose1}
          color="cyan.400"
        />
      </Flex>

      <Stack px="5" pt="10" alignItems="flex-start">
        <HStack fontSize="lg">
          <HiOutlineViewGridAdd />{' '}
          <Button
            onClick={onOpen}
            bg="transparent"
            _hover={{ bg: 'transparent' }}
          >
            Create Workspace
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create workspace</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Workspace Name"
                  value={workspaceName}
                  onChange={e => setWorkspaceName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button mr={3} onClick={submitWorkspace}>
                  Create
                </Button>
                <Button variant="ghost">Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </HStack>
        <HStack>
          <TbLayoutBoardSplit fontSize="lg" />
          <Button bg="transparent" _hover={{ bg: 'transparent' }}>
            Boards
          </Button>
        </HStack>
        <HStack>
          <FiStar fontSize="lg" />
          <Button bg="transparent" _hover={{ bg: 'transparent' }}>
            Favourites
          </Button>
        </HStack>
        <HStack>
          <FiSettings fontSize="lg" />
          <Button bg="transparent" _hover={{ bg: 'transparent' }}>
            Settings
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}

// const NavItem = ({ icon, children, ...rest }) => {
//   return (
//     <Link
//       href="#"
//       style={{ textDecoration: "none" }}
//       _focus={{ boxShadow: "none" }}
//     >
//       <Flex
//         align="center"
//         p="4"
//         mx="4"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         _hover={{
//           bg: "cyan.400",
//           color: "white"
//         }}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             mr="4"
//             fontSize="16"
//             _groupHover={{
//               color: "white"
//             }}
//             as={icon}
//           />
//         )}
//         {children}
//       </Flex>
//     </Link>
//   )
// }

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 60 }}
      height="10"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <Text> See More</Text>
      <IconButton
        variant="ghost"
        onClick={onOpen}
        aria-label="open menu"
        icon={<AiFillCaretRight />}
      />
    </Flex>
  )
}
