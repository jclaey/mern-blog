import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    images: [
      {
        path: String,
        filename: String
      }
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Admin'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})

const Post = mongoose.model('Post', PostSchema)

export default Post