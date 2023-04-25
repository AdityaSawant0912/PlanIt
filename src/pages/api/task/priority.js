import connectMongo from '../../../lib/dbConnect';
import Task from "../../../models/Task";
export default async function handler(req, res) {
  let ObjectId = req.query.ObjectId;
  let Priority = req.query.Priority;
  console.log(ObjectId, Priority);
  await connectMongo();
  let tasks = await Task.updateOne({ "_id": ObjectId }, {"Priority": Priority})
  res.status(200).send({message: "Done"});
}