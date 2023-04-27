import dbconnect from '@/lib/dbconnect';
import Task from "@/models/Task";
export default async function handler(req, res) {
  let email = req.query.email;
  await dbconnect();
  let tasks = await Task.find({ "User": email, "Completed": true })
  res.status(200).json({ tasks });
}