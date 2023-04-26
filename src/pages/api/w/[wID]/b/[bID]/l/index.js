import dbconnect from '@/lib/dbconnect'
import Board from '@/models/Boards'
import List from '@/models/Lists'

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
      const lists = await List.find({ boardId: bID, workspaceId: wID })
      return res.status(200).json({ lists })
    }

    case 'POST': {
      const { id, name, createdBy, createdAt, sequence } = req.body
      const count = await List.find({ boardId: bID, workspaceId: wID }).count()
      const data = {
        id,
        workspaceId: wID,
        boardId: bID,
        name,
        createdAt,
        createdBy,
        sequence: sequence || count + 1
      }
      const list = await List.create(data)
      return res.status(201).json({ list })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
