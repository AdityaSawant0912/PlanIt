import dbconnect from '@/lib/dbconnect';
import Task from "@/models/Task";
export default async function handler(req, res) {
  let ObjectId = req.query.ObjectId;
  await dbconnect();
  let tasks = await Task.updateOne({ "_id": ObjectId }, { "Completed": true })
  res.status(200).send({ message: "Done" });
}