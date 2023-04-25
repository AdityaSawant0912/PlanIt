import React from 'react'
import Task from './TaskHorizontal'
import { useColorModeValue, Box } from '@chakra-ui/react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { Droppable } from 'react-beautiful-dnd'

const TaskList = ({ tasks, list, deleteListOrCard }) => {
  return (
    <Droppable droppableId={list.id} type="task" direction='horizontal'>
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`p-2 flex overflow-auto`}
        >

          {tasks.map((task, index) => (
            <div className="flex items-center flex-shrink-0">
              <ContextMenuTrigger key={task.id} id={task.id}>
                <Task task={task} index={task.sequence} />
              </ContextMenuTrigger>
              <ContextMenu id={task.id}>
                <Box m={2} bg="gray.100" w={130} rounded={5}>
                  <MenuItem
                    onClick={deleteListOrCard}
                    data={{ card: task, type: 'card' }}
                  >
                    <Box bg="gray.300" p={3} rounded={5}>
                      Delete
                    </Box>
                  </MenuItem>
                </Box>
              </ContextMenu>
            </div>
          ))}
        </div>
      )}

    </Droppable>
  )
}
export default TaskList
