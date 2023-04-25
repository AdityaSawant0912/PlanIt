import dbConnect from '@/lib/dbconnect'
import User from '@/models/Users'
import sessionUser from '@/middleware/getSessionUser'

export default async function handler(req, res) {
  const { user, error, dberror } = await sessionUser({ req })
  if (error || dberror)
    return res.status(401).json({ error: error, dberror: dberror })

  try {
    await dbConnect()
  } catch (error) {
    return res
      .status(500)
      .json({ error: 'Database connection error', dberror: error })
  }

  const reqType = req.method
  switch (reqType) {
    case 'POST': {
      const { uid } = req.body
      const exists = await User.exists({ uid })
      if (exists) {
        return res.status(200).json({ exists: true })
      } else {
        return res.status(200).json({ exists: false })
      }
    }

    case 'PATCH': {
      const { uid, email, image } = req.body
      console.log(email, user.email)
      if (email !== user.email)
        return res.status(401).json({ error: 'Unauthorized' })
      const userdb = await User.findOneAndUpdate({ email }, { uid, image })
      if (userdb) return res.status(200).json({ user: userdb })
      else return res.status(404).json({ error: 'User not found' })
    }

    default: {
      return res.status(405).json({ error: 'Method not allowed' })
    }
  }
}
