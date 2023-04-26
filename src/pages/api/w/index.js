import dbconnect from '@/lib/dbconnect'
import Workspace from '@/models/Workspaces'
import sessionUser from '@/middleware/getSessionUser'

export default async function handler(req, res) {
  const { user, error, dberror } = await sessionUser({ req })
  if (error || dberror)
    return res.status(401).json({ error: error, dberror: dberror })

  try {
    await dbconnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }

  const reqType = req.method
  switch (reqType) {
    case 'POST': {
      const { workspaceName, userId } = req.body
      let workspaceId = workspaceName.replace(/[^a-zA-Z]/g, '').toLowerCase()
      let duplicate = await Workspace.findOne({ id: workspaceId })
      let newWorkspaceId
      let c = 0
      while (duplicate) {
        c++
        newWorkspaceId = workspaceId + `${c}`
        duplicate = await Workspace.findOne({ id: newWorkspaceId })
      }

      let workspaceObj = {
        id: newWorkspaceId || workspaceId,
        name: workspaceName,
        createdAt: new Date().toISOString(),
        roles: [{ name: 'Admin' }, { name: 'Member' }],
        // boards: [],
        // lists: [],
        // cards: [],
        invite: { link: '', disabled: false, expiresAt: null },
        collaborators: [{ user: userId, creator: true, role: 'Admin' }]
      }

      const workspace = await Workspace.create(workspaceObj)
      return res.status(200).json(workspace)
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
