import connectMongo from '../../../lib/dbConnect';
import Task from "../../../models/Task";
export default async function handler(req, res) {
  let email = req.query.email;
  await connectMongo();
  let tasks = await Task.find({ "User": email, "Completed": false})
  res.status(200).json({tasks});
}