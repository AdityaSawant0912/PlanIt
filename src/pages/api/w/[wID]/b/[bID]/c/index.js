import dbconnect from '@/lib/dbconnect'
import Card from '@/models/Cards'

export default async function handler(req, res) {
  const { wID, bID } = req.query
  try {
    await dbconnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }

  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      const cards = await Card.find({ boardId: bID, workspaceId: wID })
      return res.status(200).json({ cards })
    }

    case 'POST': {
      const { id, name, createdBy, createdAt, sequence, listId } = req.body
      const count = await Card.find({ boardId: bID, workspaceId: wID }).count()
      const data = {
        id,
        workspaceId: wID,
        boardId: bID,
        listId,
        name,
        createdAt,
        createdBy,
        sequence: sequence || count + 1
      }
      const card = await Card.create(data)

      return res.status(201).json({ card })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
