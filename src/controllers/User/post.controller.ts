import { Request, Response } from 'express';
import PostModel from '../../models/Post.model';

export const addpost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { content, authorId, author, tags } = req.body;
        
        if (!content || !authorId || !author || !author.username) {
            return res.status(400).json({ 
                success: false, 
                error: 'Missing required fields: content, authorId, author.username' 
            });
        }
        
        const newPost = new PostModel({
            content,
            authorId,
            author: {
                username: author.username,
                avatar: author.avatar || ''
            },
            tags: tags || []
        });
        
        const savedPost = await newPost.save();
        
        return res.status(201).json({ success: true, post: savedPost });
    } catch (error: any) {
        return res.status(500).json({ 
            success: false, 
            error: error.message || 'Failed to create post',
            details: error.stack
        });
    }
}

export const getallpost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const posts = await PostModel.find()
            .sort({ createdAt: -1 })
            .limit(20);
        
        return res.status(200).json({ success: true, posts });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getpost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const post = await PostModel.findById(id);
        
        if (!post) {
            return res.status(404).json({ success: "false", message: 'Post not found' });
        }
        
        return res.status(200).json({ success: "true", post });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const updatepost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { content, tags } = req.body;
        
        const updateData: any = {};
        if (content) updateData.content = content;
        if (tags) updateData.tags = tags;
        
        const updatedPost = await PostModel.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true }
        );
        
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        return res.status(200).json({ success: true, post: updatedPost });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const deletepost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        
        const deletedPost = await PostModel.findByIdAndDelete(id);
        
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        return res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const likepost = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        
        const post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        const isLiked = post.likes.includes(userId);
        
        if (isLiked) {
            post.likes = post.likes.filter(like => like.toString() !== userId);
            post.likesCount = post.likes.length;
        } else {
            post.likes.push(userId);
            post.likesCount = post.likes.length;
        }
        
        await post.save();
        
        return res.status(200).json({ 
            success: true, 
            liked: !isLiked, 
            likesCount: post.likesCount 
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const addcomment = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { commenterId, commenter, content } = req.body;
        
        const post = await PostModel.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        const newComment = {
            commenterId,
            commenter: {
                username: commenter.username,
                avatar: commenter.avatar
            },
            content,
            createdAt: new Date()
        };
        
        post.comments.push(newComment);
        post.commentsCount = post.comments.length;
        
        await post.save();
        
        return res.status(201).json({ success: true, comment: newComment });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

export const getcomments = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        
        const post = await PostModel.findById(id).select('comments commentsCount');
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        
        return res.status(200).json({ 
            success: true, 
            comments: post.comments,
            commentsCount: post.commentsCount
        });
    } catch (error: any) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
