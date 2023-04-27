import dbconnect from '@/lib/dbconnect'
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
  const { wID, bID, lID } = req.query
  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      const list = await List.findOne({
        id: lID,
        boardId: bID,
        workspaceId: wID
      })
      return res.status(200).json({ list })
    }

    case 'PATCH': {
      const { sequence, name } = req.body
      const updatedList = await List.findOneAndUpdate(
        {
          id: lID
        },
        { name, sequence },
        { new: true }
      )
      return res.status(202).json({ updatedList })
    }

    case 'DELETE': {
      await Card.deleteMany({ listId: lID })
      await List.findOneAndDelete({
        id: lID
      })
      return res.status(202).json({ message: 'List deleted' })
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
