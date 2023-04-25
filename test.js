// import React, { useState } from 'react'
// import { Flex, useColorModeValue } from '@chakra-ui/react'
// import { DragDropContext } from 'react-beautiful-dnd'
// import dynamic from 'next/dynamic'
// import UserNav from '@/components/UserNav'
// import SubNav from '@/components/SubNav'
// import Text from '../components/svg/Collab.js'
// const Column = dynamic(() => import('@/components/Board/List'), {
//   ssr: false
// })

// const Board = () => {
//   const [initData, setinitData] = useState(initialData)

//   const onDragEnd = result => {
//     const { destination, source, draggableId } = result
//     if (!destination) return
//     console.log(destination, source, draggableId)
//     let newData = { ...initData }
//     newData.columns[source.droppableId].taskIds.splice(source.index, 1)
//     newData.columns[destination.droppableId].taskIds.splice(
//       destination.index,
//       0,
//       draggableId
//     )
//     setinitData(newData)
//   }
//   return (
//     <>
//       <Text />
//       <UserNav />
//       <SubNav />
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Flex
//           flexDir="column"
//           bg={useColorModeValue("gray.50", "gray.700")}
//           minH="100vh"
//           color={'white'}
//         >

//           <Flex justify='space-between' px="6%" py="20">
//             {initData.columnOrder.map(columnId => {
//               let column = initData.columns[columnId]
//               let tasks = column.taskIds.map(taskId => initData.tasks[taskId])
//               return <Column key={column.id} column={column} tasks={tasks} px="2%" />
//             })}
//           </Flex>
//         </Flex>
//       </DragDropContext>
//     </>
//   )
// }

// export default Board

// const initialData = {
//   tasks: {
//     1: { id: '1', content: 'Lmao' },
//     2: { id: '2', content: 'This' },
//     3: { id: '3', content: 'Sucks' },
//     4: { id: '4', content: 'More' },
//     5: { id: '5', content: 'HUH' },
//     6: { id: '6', content: 'Test' }
//   },
//   columns: {
//     'column-1': {
//       id: 'column-1',
//       title: 'List1',
//       taskIds: ['3', '4', '5', '6']
//     },
//     'column-2': {
//       id: 'column-2',
//       title: 'List2',
//       taskIds: ['1', '2']
//     },
//     'column-3': {
//       id: 'column-3',
//       title: 'List3',
//       taskIds: []
//     }
//   },
//   // Facilitate reordering of the columns
//   columnOrder: ['column-1', 'column-2', 'column-3']
// }
