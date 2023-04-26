import dbconnect from '@/lib/dbconnect'
import Workspace from '@/models/Workspaces'
import sessionUser from '@/middleware/getSessionUser'
import { nanoid } from 'nanoid'
export default async function handler(req, res) {
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
      const { inviteCode } = req.query
      console.log('asdasd ' + inviteCode)
      const workspace = await Workspace.findOne({ 'invite.link': inviteCode })
      if (!workspace)
        return res.status(404).json({ error: 'Workspace not found' })
      return res.status(200).json({ workspace: workspace })
    }

    case 'POST': {
      const { inviteCode, uId } = req.body
      const workspace = await Workspace.findOne({ 'invite.link': inviteCode })
      if (!workspace)
        return res.status(404).json({ error: 'Workspace not found' })
      console.log(workspace.invite.disabled);
      if (workspace.invite.disabled)
        return res.status(400).json({ error: 'Invite disabled' })
      if (workspace.invite.expiresAt < new Date())
        return res.status(400).json({ error: 'Invite expired' })
      if (workspace.collaborators.find(c => c.user === uId))
        return res.status(400).json({ error: 'User already a collaborator' })
      let w = await Workspace.updateOne(
        { 'invite.link': inviteCode },
        { $push: { collaborators: { user: uId, role: 'Member', creator: false } } }
      )
      res.status(200).json({ workspace: w })
    }
    case 'PATCH': {
      const { wID } = req.body
      console.log(wID);
      const inviteCode = nanoid(18)
      const expires = new Date()
      expires.setDate(expires.getDate() + 30)
      const w = await Workspace.updateOne(
        { id: wID },
        {
          'invite.link': inviteCode,
          'invite.disabled': false,
          'invite.expiresAt': expires
        }
      );
      const work = await Workspace.findOne({ id: wID })
      console.log(work);
      return res.status(200).json({ inviteCode, expiresAt: expires, workspace: work })
    }
    case 'DELETE': {
      const { wID } = req.body
      const w = await Workspace.updateOne(
        { id: wID },
        { 'invite.disabled': true }
      )
      res.status(200).json({ workspace: w })
    }
    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
