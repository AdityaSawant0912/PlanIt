import { Schema, model, models } from 'mongoose'

const BoardsSchema = new Schema({
  id: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  workspaceId: { type: String, ref: 'Workspace' },
  createdBy: { type: String, ref: 'User' },
  backgroundImage: String,
  lastViewedAt: Date,
  favorite: Boolean
})

module.exports = models.Board || model('Board', BoardsSchema)
