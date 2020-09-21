import { Response } from 'express';

export const badRequest = (response: Response, error: String) => {
    response.status(400).json({
        error
    })
}