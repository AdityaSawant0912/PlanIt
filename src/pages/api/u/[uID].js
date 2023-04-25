import dbConnect from '@/lib/dbconnect'
import User from '@/models/Users'
import Workspace from '@/models/Workspaces'
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
  const { uID } = req.query
  const userdb = await User.findOne({ uid: uID }, '-password')
  if (!userdb) {
    return res.status(404).json({ error: 'User not found' })
  }

  const reqType = req.method
  switch (reqType) {
    case 'GET': {
      const workspacesCreator = await Workspace.find({
        collaborators: {
          $elemMatch: { user: uID, creator: true }
        }
      })
      const workspacesCollab = await Workspace.find({
        collaborators: {
          $elemMatch: { user: uID, creator: false }
        }
      })
      return res.status(200).json({
        asCreator: workspacesCreator,
        asCollaborator: workspacesCollab,
        user: userdb
      })
    }

    case 'PATCH': {
      const { uid, email, image, name } = req.body
      const modify = await User.findOneAndUpdate(
        { uid: uID },
        { uid, email, image, name }
      )
      if (modify) return res.status(200).json({ user: modify })
      else return res.status(404).json({ error: 'User not found' })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
