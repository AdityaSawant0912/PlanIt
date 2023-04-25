import dbConnect from '@/lib/dbconnect'
import Board from '@/models/Boards'
import Card from '@/models/Cards'
import sessionUser from '@/middleware/getSessionUser'

export default async function handler(req, res) {
  const { user, error, dberror } = await sessionUser({ req })
  if (dberror) return res.status(401).json({ error: error, dberror: dberror })

  try {
    await dbConnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }
  const { wID, bID, cID } = req.query
  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      const card = await Card.findOne({
        id: cID
      })
      return res.status(200).json({ card })
    }

    case 'PATCH': {
      const { sequence, name, assignedTo, description, listId } = req.body
      const updatedCard = await Card.findOneAndUpdate(
        {
          id: cID,
          boardId: bID,
          workspaceId: wID
        },
        { name, sequence, assignedTo, description, listId },
        { new: true }
      )
      console.log(updatedCard)
      return res.status(202).json({ updatedCard })
    }

    case 'DELETE': {
      await Card.findOneAndDelete({
        id: cID
      })
      return res.status(202).json({ message: 'card deleted' })
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
