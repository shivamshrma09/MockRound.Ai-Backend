import mongoose, { Schema, Document } from 'mongoose';

interface IComment {
  commenterId: mongoose.Types.ObjectId;
  commenter: {
    username: string;
    avatar?: string;
  };
  content: string;
  createdAt: Date;
}

interface IPost extends Document {
  content: string;
  authorId: mongoose.Types.ObjectId;
  author: {
    username: string;
    avatar?: string;
  };
  likes: mongoose.Types.ObjectId[];
  likesCount: number;
  commentsCount: number;
  comments: IComment[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const commentsSchema = new mongoose.Schema({
    commenterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    commenter: {  
        username: String,
        avatar: String
    },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  author: {
    username: String,
    avatar: String
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likesCount: { type: Number, default: 0 },
  commentsCount: { type: Number, default: 0 },
  comments: [commentsSchema],
  tags: [{ type: String, trim: true }]
}, { timestamps: true });

postSchema.index({ createdAt: -1 });
postSchema.index({ authorId: 1, createdAt: -1 });

const PostModel = mongoose.model<IPost>('Post', postSchema);
export default PostModel;
export type { IPost, IComment };
