import { getToken } from 'next-auth/jwt'
import dbconnect from '@/lib/dbconnect'
import User from '@/models/Users'

export default async function sessionUser({ req }) {
  let result = { error: null, user: null, dbError: null }
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  if (!token) {
    result.error = 'You are not logged in.'
    return result
  }
  try {
    await dbconnect()
  } catch (error) {
    result.error = 'Something went wrong with the Database.'
    result.dbError = error
    return result
  }
  const user = await User.findOne({ email: token.email }, '-password')
  if (!user) {
    result.error = 'User not found.'
    return result
  }
  result.user = user
  result.error = null
  return result
}
