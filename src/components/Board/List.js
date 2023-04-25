import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { useColorModeValue, Box, Spacer, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel,
  Input, Textarea,
  useDisclosure
} from '@chakra-ui/react'

const List = ({ list, tasks, index, addCard, deleteListOrCard, boardData }) => {
  let _color = useColorModeValue('gray.100', 'gray.700')
  // let textColor = useColorModeValue('gray.700', 'gray.50')
  let _c = useColorModeValue('gray.50', 'gray.900')
  let invert = useColorModeValue('gray.900', 'gray.50')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentList, setCurrentList] = useState(list);
  const initialRef = React.useRef(null)

  const handleUpdate = (e, type) => {
    let value = e.target.value;
    setCurrentList({ ...currentList, [type]: value });
  }
  const handleSave = () => {
    list.name = currentList.name;
    console.log(`/api/w/${list.workspaceId}/b/${list.boardId}/l/${list.id}`);
    // do query to update the card

    fetch(`/api/w/${list.workspaceId}/b/${list.boardId}/l/${list.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: list.name })
    }).then(res => res.json()).then(data => { console.log(data) })
    onClose()
  }

  return (
    <Draggable draggableId={list.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (

        <Box bgColor={_color}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`m-4 border rounded shadow-md `}
          h="fit-content"
          w={250}
          minW={250}
          m
          flexDirection={'column'}
        >
          <ContextMenuTrigger key={list.id} id={list.id}>
            <Box {...draggableProvided.dragHandleProps} className="p-2 text-md " width={'full'} onClick={onOpen}>
              {list.name}

              <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={() => { setCurrentList(list); onClose() }}
                blockScrollOnMount={false}
                isCentered
                motionPreset='slideInBottom'
                size={'xl'}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Edit List</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    <FormControl>
                      <FormLabel>Card Name</FormLabel>
                      <Input ref={initialRef} placeholder='Snehil' value={currentList.name} onChange={(e) => { handleUpdate(e, 'name') }} />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleSave()}>
                      Save
                    </Button>
                    <Button onClick={() => { setCurrentList(list); onClose() }}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>


            </Box>
          </ContextMenuTrigger>

          <ContextMenu id={list.id}>
            <Box m={2} bg="gray.100" w={130} rounded={5}>
              <MenuItem
                onClick={deleteListOrCard}
                data={{ list: list, type: 'list' }}
              >
                <Box bg="gray.300" p={3} rounded={5}>
                  Delete
                </Box>
              </MenuItem>
            </Box>
          </ContextMenu>

          <Droppable droppableId={list.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <Box
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`min-h-0 p-2 border-t-2`}
              >
                <TaskList tasks={tasks} list={list} deleteListOrCard={deleteListOrCard} boardData={boardData} />

                {droppableProvided.placeholder}
              </Box>
            )}
          </Droppable>
          <Box className='px-2'>
            <Box bgColor={_color}
              className={`flex p-2 mb-2 w-full shadow-md `}
              as='button'
              alignItems={'center'}
              onClick={() => addCard(list.id)}
            >
              <AddIcon w={3} h={3} mr={3} />
              Add a card
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  )
}

export default List
