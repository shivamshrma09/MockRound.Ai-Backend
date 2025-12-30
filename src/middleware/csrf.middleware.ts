import csrf from 'csurf';
import { Request, Response, NextFunction } from 'express';

export const csrfProtection = csrf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
});

export const getCsrfToken = (req: Request & { csrfToken?: () => string }, res: Response) => {
    res.json({ csrfToken: req.csrfToken?.() });
};