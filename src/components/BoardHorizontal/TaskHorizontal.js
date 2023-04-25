import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, useColorModeValue, Spacer } from '@chakra-ui/react'

const Task = ({ task, index }) => {
  let _color = useColorModeValue('gray.50', 'gray.900')
  return (
    <Draggable draggableId={task.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <Box
          bgColor={_color}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className={`font-light p-2 mx-2 flex min-w-[150px] mb-2 border rounded-md shadow-md h-[40px] ${draggableSnapshot.isDragging ? 'bg-gray-500' : 'bg-gray-900'
            } `}
        >
          {task.name}
        </Box>
      )}
    </Draggable>
  )
}

export default Task
