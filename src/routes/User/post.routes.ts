
import express from 'express';
import { body, param } from 'express-validator';
import { 
    addpost, 
    getallpost, 
    getpost, 
    updatepost, 
    deletepost, 
    likepost, 
    addcomment,
    getcomments
} from '../../controllers/User/post.controller';
import { handleValidationErrors } from '../../middleware/validation.middleware';

const router = express.Router();


router.post('/', 
    [
        body('content').notEmpty().withMessage('Content is required'),
        body('authorId').notEmpty().withMessage('Author ID is required'),
        body('author.username').notEmpty().withMessage('Author username is required')
    ],
    handleValidationErrors,
    addpost
);


router.get('/', getallpost);


router.get('/:id', 
    [param('id').isMongoId().withMessage('Invalid post ID')],
    handleValidationErrors,
    getpost
);


router.put('/:id', 
    [
        param('id').isMongoId().withMessage('Invalid post ID'),
        body('content').notEmpty().withMessage('Content is required')
    ],
    handleValidationErrors,
    updatepost
);


router.delete('/:id', 
    [param('id').isMongoId().withMessage('Invalid post ID')],
    handleValidationErrors,
    deletepost
);


router.post('/:id/like', 
    [
        param('id').isMongoId().withMessage('Invalid post ID'),
        body('userId').notEmpty().withMessage('User ID is required')
    ],
    handleValidationErrors,
    likepost
);


router.post('/:id/comments', 
    [
        param('id').isMongoId().withMessage('Invalid post ID'),
        body('commenterId').notEmpty().withMessage('Commenter ID is required'),
        body('content').notEmpty().withMessage('Comment content is required')
    ],
    handleValidationErrors,
    addcomment
);


router.get('/:id/comments', 
    [param('id').isMongoId().withMessage('Invalid post ID')],
    handleValidationErrors,
    getcomments
);

export default router;
