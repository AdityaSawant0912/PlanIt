import { Schema, model, models} from 'mongoose';

const TaskSchema = new Schema({
  Title: String,
  User: String,
  Due: Date,
  Start: Date,
  Duration: Number,
  Duration_Minutes: Number,
  Duration_Hours: Number,
  Description: String,
  Priority: Number,
  Completed: Boolean,
  Deleted: Boolean,
})

const Task = models.Task || model('Task', TaskSchema);

export default Task;