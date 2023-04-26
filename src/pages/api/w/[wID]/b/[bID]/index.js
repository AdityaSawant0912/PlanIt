import dbconnect from '@/lib/dbconnect'
import Board from '@/models/Boards'
import List from '@/models/Lists'
import Card from '@/models/Cards'
import sessionUser from '@/middleware/getSessionUser'

export default async function handler(req, res) {
  const { user, error, dberror } = await sessionUser({ req })
  if (dberror) return res.status(401).json({ error: error, dberror: dberror })

  try {
    await dbconnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }
  const { wID, bID } = req.query
  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      const board = await Board.findOne({
        id: bID,
        workspaceId: wID
      })
      return res.status(200).json({ board })
    }

    case 'PATCH': {
      const { name, backgroundImage } = req.body
      const updatedBoard = await Board.findOneAndUpdate(
        {
          id: bID
        },
        { name, backgroundImage },
        { new: true }
      )
      return res.status(202).json({ updatedBoard })
    }

    case 'DELETE': {
      await Card.deleteMany({ boardId: bID })
      await List.deleteMany({ boardId: bID })
      await Board.findOneAndDelete({
        id: bID
      })
      return res.status(202).json({ message: 'Board deleted' })
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
