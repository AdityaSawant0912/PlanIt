import { Schema, model, models } from 'mongoose'

const ListsSchema = new Schema({
  id: String,
  name: String,
  createdAt: {
    type: Date,
    default: new Date().toISOString()
  },
  createdBy: { type: String, ref: 'User' },
  sequence: Number,
  boardId: { type: String, ref: 'Board' },
  workspaceId: { type: String, ref: 'Workspace' }
})

module.exports = models.List || model('List', ListsSchema)
