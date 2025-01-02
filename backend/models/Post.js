import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Lost', 'Found', 'Suggestion', 'Discussion'],
    default: 'General'
  },
  imageUrl: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // upvotes: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  comments: [{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
  }],
},
{
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);
export default  Post;