import React from 'react'
import Task from './Task'
import { useColorModeValue, Box } from '@chakra-ui/react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

const TaskList = ({ tasks, list, deleteListOrCard, boardData  }) => {
  return (
    <div className="w-full">
      {tasks.map((task, index) => (
        <span key={task.id}>
          <ContextMenuTrigger key={task.id} id={task.id}>
            <Task task={task} index={task.sequence} boardData={boardData} />
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
        </span>

      ))}
    </div>
  )
}
export default TaskList
