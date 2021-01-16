import express from 'express';
import { Controller } from '../controllers/controller';
export const router = express.Router({ strict: true });

const controller = new Controller();

router.post('/new', controller.addNewUrl);

router.get('/:short_id', controller.getLinkUrl);

router.post('/short_id', controller.getOriginalUrl);
