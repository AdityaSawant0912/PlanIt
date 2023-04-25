import dbConnect from '@/lib/dbconnect'
import Workspace from '@/models/Workspaces'
import Board from '@/models/Boards'
import List from '@/models/Lists'
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
  const { wID } = req.query
  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      const workspace = await Workspace.findOne({
        id: wID
      })
      return res.status(200).json({ workspace })
    }

    case 'PATCH': {
      const { id, name, createdAt, collaborators, roles, invite } = req.body
      const updatedWorkspace = await Workspace.findOneAndUpdate(
        {
          id: wID
        },
        { id, name, createdAt, collaborators, roles, invite },
        { new: true }
      )
      return res.status(202).json({ updatedWorkspace })
    }

    case 'DELETE': {
      await Card.deleteMany({ workspaceId: wID })
      await List.deleteMany({ workspaceId: wID })
      await Board.deleteMany({ workspaceId: wID })
      await Workspace.findOneAndDelete({
        id: wID
      })
      return res.status(202).json({ message: 'Workspace deleted' })
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
