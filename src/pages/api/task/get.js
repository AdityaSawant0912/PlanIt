import dbconnect from '@/lib/dbconnect';
import Task from "@/models/Task";
export default async function handler(req, res) {
  let email = req.query.email;
  await dbconnect();
  let tasks = await Task.find({ "User": email })
  res.status(200).json({ tasks });
}
// export default async function handler(req, res) {
//   let body = req.body;
//   console.log(body.email);
//   let email = body.email;
//   await dbconnect();
//   console.log("email");
//   console.log(email);
//   let tasks = await Task.find({ "User": email})
//   console.log(tasks);
//   res.status(200).json({tasks});
// }