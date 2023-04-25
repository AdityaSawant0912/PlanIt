const initialData = {
  tasks: {
    1: { id: 1, content: 'Configure Next.js application' },
    2: { id: 2, content: 'Configure Next.js and tailwind ' },
    3: { id: 3, content: 'Create sidebar navigation menu' },
    4: { id: 4, content: 'Create page footer' },
    5: { id: 5, content: 'Create page navigation menu' },
    6: { id: 6, content: 'Create page layout' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'TO-DO',
      taskIds: [1, 2, 3, 4, 5, 6]
    },
    'column-2': {
      id: 'column-2',
      title: 'IN-PROGRESS',
      taskIds: []
    },
    'column-3': {
      id: 'column-3',
      title: 'COMPLETED',
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData
