import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, useColorModeValue, Spacer } from '@chakra-ui/react'
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel,
  Input, Textarea,
  useDisclosure
} from '@chakra-ui/react'



const Task = ({ task, index, dragDisabled, boardData }) => {
  let _color = useColorModeValue('gray.50', 'gray.900')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentTask, setCurrentTask] = useState(task);
  const initialRef = React.useRef(null)

  const handleUpdate = (e, type) => {
    let value = e.target.value;
    setCurrentTask({ ...currentTask, [type]: value });
  }
  const handleSave =  () => {
    console.log('asdasd');
    task.name = currentTask.name;
    task.description = currentTask.description;
    // do query to update the card
    
    fetch(`/api/w/${task.workspaceId}/b/${task.boardId}/c/${task.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({name: task.name, description: task.description})
    })
    
    onClose()
    
  }

  return (
    <Draggable draggableId={task.id} index={index} isdragDisabled={dragDisabled}>
      {(draggableProvided, draggableSnapshot) => (
        <Box
          bgColor={_color}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          onClick={onOpen}
          className={`font-light flex p-2 pt-2 mb-2 border rounded-md w-full shadow-md h-[40px] ${draggableSnapshot.isDragging ? 'bg-gray-500' : 'bg-gray-900'
            } `}
        >
          {task.name} <Spacer /> {task.sequence}
          <Modal
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={() => { setCurrentTask(task); onClose() }}
            blockScrollOnMount={false}
            isCentered
            motionPreset='slideInBottom'
            size={'xl'}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Card</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Card Name</FormLabel>
                  <Input ref={initialRef} placeholder='Snehil' value={currentTask.name} onChange={(e) => { handleUpdate(e, 'name') }} />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder='Here is a sample placeholder' value={currentTask.description} onChange={(e) => { handleUpdate(e, 'description') }} />
                </FormControl>

                {/* <FormControl mt={4}>
              <FormLabel>Assigned To</FormLabel>
              <Input ref={initialRef} placeholder='Snehil' />
            </FormControl> */}
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={() => handleSave()}>
                  Save
                </Button>
                <Button onClick={() => { setCurrentTask(task); onClose() }}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

        </Box>


      )}
    </Draggable>
  )
}

export default Task
