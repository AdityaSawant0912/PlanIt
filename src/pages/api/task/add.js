import connectMongo from '../../../lib/dbConnect'
import Task from '../../../models/Task'

export default async function addTest(req, res) {
  try {
    await connectMongo();
    console.log(req.body);
    const test = await Task.create(req.body);
    let data =  await Task.find()
    console.log(data);


    res.json({ test });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}