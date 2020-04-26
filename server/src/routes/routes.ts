import express, { Request, Response } from 'express';
import { Controller } from '../controllers/controller';
export const router = express.Router({ strict: true });

const controller = new Controller();

router.post('/new', (req: Request, res: Response) => {
	controller.addNewUrl(req, res);
});

router.get('/:short_id', (req: Request, res: Response) => {
	controller.getLinkUrl(req, res);
});

router.post('/short_id', (req: Request, res: Response) => {
	controller.getOriginalUrl(req, res);
});
