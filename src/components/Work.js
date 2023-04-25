import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { TbLayoutBoardSplit } from 'react-icons/tb'
import { HiOutlineViewGrid } from 'react-icons/hi'
import { BsPersonPlus } from 'react-icons/bs'
import { FiSettings } from 'react-icons/fi'
import {
  Box,
  Wrap,
  WrapItem,
  Flex,
  Text,
  Center,
  Stack,
  useDisclosure,
  Button,
  Input,
  useColorModeValue,
  HStack,
  Spacer,
  textDecoration
} from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react'
import Link from 'next/link'
import { BsPersonGear, BsPeople } from 'react-icons/bs'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { nanoid } from 'nanoid'

const Workspace = ({ id, workspace }) => {
  const [boards, setBoards] = useState([])
  useEffect(() => {
    fetch(`/api/w/${id}/b`)
      .then(res => res.json())
      .then(data => {
        setBoards(data.boards)
      })
  }, [boards, id])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenInvite, onOpen: onOpenInvite, onClose: onCloseInvite } = useDisclosure()

  const router = useRouter()
  const { uId } = router.query
  const [boardName, setBoardName] = useState('')
  const handleDelete = async (e, data) => {
    fetch(`/api/w/${data.wID}/b/${data.bID}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        setBoards(boards.filter(board => board.id != data.bID))
      })
  }
  const submitBoard = async e => {
    console.log(boardName)
    const res = await fetch(`/api/w/${id}/b`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: boardName, id: nanoid(), creator: uId })
    })
    const data = await res.json()
    console.log(data)
    setBoardName('')
    onClose()
  }

  const createLink = async () => {
    console.log(workspace);
    console.log('create link');
    const res = await fetch(`/api/w/invite`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wID: workspace.id })
    })
    const data = await res.json()
    console.log(data);
    workspace.invite = data.workspace.invite;
  }


  return (
    <Flex p="5">
      <Stack>
        <HStack mb="2">
          <Text fontSize="xl" color={useColorModeValue('gray.900', 'gray.50')}>
            {' '}
            {workspace.name}{' '}
          </Text>
          <Flex pos="absolute" right="13%">
            <Button
              h="8"
              mx="2"
              bgColor={useColorModeValue('gray.100', 'gray.600')}
            >
              {' '}
              <TbLayoutBoardSplit />{' '}
              <Text display={{ base: 'none', md: 'block' }}>Boards </Text>
            </Button>
            <Button
              h="8"
              mx="2"
              bgColor={useColorModeValue('gray.100', 'gray.600')}
            >
              {' '}
              <HiOutlineViewGrid />{' '}
              <Text display={{ base: 'none', md: 'block' }}>Views </Text>
            </Button>
            <Button
              h="8"
              mx="2"
              bgColor={useColorModeValue('gray.100', 'gray.600')}
              onClick={onOpenInvite}
            >
              {' '}
              <BsPersonPlus />{' '}
              <Text display={{ base: 'none', md: 'block' }}>Members </Text>
            </Button>

            <Modal isOpen={isOpenInvite} onClose={onCloseInvite}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color="cyan.100">Invite Members to {workspace?.name} Workspace</ModalHeader>
                {workspace.invite.link != "" && new Date() < new Date(workspace.invite.expiresAt) ? (<>{process.env.NEXT_PUBLIC_BASE_URL +'/w/i/' + workspace?.invite?.link }</>) : <></>}
                {workspace.invite.link == "" || new Date() >= new Date(workspace.invite.expiresAt) ? (<>Link is not Created or Expired</>) : <></>}
                <ModalCloseButton />
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                  {workspace.invite.link != "" && new Date() < new Date(workspace.invite.expiresAt) ?
                    (<Button mr={3} onClick={(e) => {
                      navigator.clipboard.writeText(process.env.NEXT_PUBLIC_BASE_URL +'/w/i/' + workspace?.invite?.link)
                    }}>
                      Copy Invite Link 
                    </Button>) : <></>}
                  {workspace.invite.link == "" || new Date() >= new Date(workspace.invite.expiresAt) ? (<Button mr={3} onClick={() => createLink()} >
                    Create Invite Link
                  </Button>) : <></>}
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Button
              h="8"
              mx="2"
              bgColor={useColorModeValue('gray.100', 'gray.600')}
            >
              {' '}
              <FiSettings />{' '}
              <Text display={{ base: 'none', md: 'block' }}>Settings </Text>
            </Button>
          </Flex>
        </HStack>
        <Wrap>
          {boards.length > 0 &&
            boards.map(board => (
              <ContextMenuTrigger key={board.id} id={board.id}>
                <WrapItem pr="4">
                  <Link href={`/w/${id}/${board.id}`} textDecoration="none">
                    <Center w="180px" h="100px" bg="red.200" borderRadius="md">
                      {board.name}
                    </Center>
                  </Link>
                </WrapItem>
              </ContextMenuTrigger>
            ))}
          <WrapItem>
            <Button
              w="180px"
              h="100px"
              onClick={onOpen}
              bg={useColorModeValue('gray.300', 'gray.600')}
            >
              Create Board
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color="cyan.100">Create board</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    placeholder="Board Name"
                    value={boardName}
                    onChange={e => {
                      setBoardName(e.target.value)
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={submitBoard}>
                    Create
                  </Button>
                  <Button variant="ghost" onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </WrapItem>
        </Wrap>
      </Stack>
      {boards.length > 0 &&
        boards.map(board => (
          <ContextMenu key={board.id} id={board.id}>
            <Box m={5} bg="gray.100" p={5} w={130} rounded={5}>
              <MenuItem
                onClick={handleDelete}
                data={{ bID: board.id, wID: id }}
              >
                <Box bg="gray.300" p={3} rounded={5}>
                  Delete
                </Box>
              </MenuItem>
            </Box>
          </ContextMenu>
        ))}
    </Flex>
  )
}

const Work = ({ asCreator, asCollaborator }) => {
  const [creatorWorkspace, setCreatorWorkspace] = useState(asCreator)
  const [collabWorkspace, setCollabWorkspace] = useState(asCollaborator)

  useEffect(() => {
    setCreatorWorkspace(asCreator)
    setCollabWorkspace(asCollaborator)
    console.log(asCreator, asCollaborator)
  }, [asCreator, asCollaborator])

  const color = useColorModeValue('gray.900', 'gray.50')
  return (
    <Flex bg="red.900">
      <Stack
        ml={{ base: 0, md: 60 }}
        mt="16"
        pt="12"
        pl={{ base: 8, md: 20 }}
        pos="absolute"
        bg={useColorModeValue('gray.50', 'gray.700')}
        minH="100vh"
        minW="86.6vw"
      >
        {creatorWorkspace.length > 0 && (
          <HStack>
            {' '}
            <BsPersonGear />{' '}
            <Text fontSize="md" color={color} fontWeight="semibold">
              {' '}
              Workspaces you created
            </Text>{' '}
          </HStack>
        )}
        {creatorWorkspace.map(workspace => (
          <Workspace
            key={workspace.id}
            id={workspace.id}
            workspace={workspace}
          />
        ))}

        {collabWorkspace.length > 0 && (
          <HStack>
            {' '}
            <BsPeople />{' '}
            <Text fontSize="md" color={color} fontWeight="semibold">
              {' '}
              Workspaces you Collaborate
            </Text>{' '}
          </HStack>
        )}
        {collabWorkspace.map(workspace => (
          <Workspace
            key={workspace.id}
            id={workspace.id}
            workspace={workspace}
          />
        ))}
      </Stack>
    </Flex>
  )
}

export default Work
