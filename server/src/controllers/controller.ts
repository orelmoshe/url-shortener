import { Request, Response } from 'express';
import joi from '@hapi/joi';
import { v4 as uuidv4 } from 'uuid';
import dns from 'dns';
import NodeCache from 'node-cache';
export class Controller {
	private readonly myCache = new NodeCache();
	private static instance: Controller;

	public constructor() {
		if (Controller.instance) {
			return Controller.instance;
		}
		
		this.addNewUrl = this.addNewUrl.bind(this);
		this.getLinkUrl = this.getLinkUrl.bind(this);
		this.getOriginalUrl = this.getOriginalUrl.bind(this);
		this.getShortUrlByOriginalUrl = this.getShortUrlByOriginalUrl.bind(this);

		Controller.instance = this;
	}

	private getShortUrlByOriginalUrl(originalUrl: string): string {
		try {
			const keys = this.myCache.keys() || [];
			for (const key of keys) {
				const value = this.myCache.get(key);
				if (value === originalUrl) {
					return key;
				}
			}
			return null;
		} catch (ex) {
			console.error(ex);
			throw ex;
		}
	}

	public async addNewUrl(req: Request, res: Response) {
		try {
			const schema = joi.object().keys({
				url: joi.string().required(),
			});

			const result = schema.validate(req.body);

			if (result.error) {
				throw result.error.message;
			}

			const { url } = req.body;
			let originalUrl: URL;

			try {
				originalUrl = new URL(url);
			} catch (ex) {
				throw 'invalid URL';
			}

			dns.lookup(originalUrl.hostname, (err) => {
				if (err) {
					throw 'Address not found';
				}

				let shortId: string = this.getShortUrlByOriginalUrl(url);
				if (shortId) {
					return res.status(200).json(shortId);
				}

				shortId = uuidv4();
				this.myCache.set(shortId, url);

				res.status(200).json(shortId);
			});
		} catch (ex) {
			console.error(ex);
			res.status(500).json({ massage: ex });
		}
	}

	public getLinkUrl(req: Request, res: Response) {
		try {
			const schema = joi.object().keys({
				short_id: joi.string().required(),
			});

			const result = schema.validate(req.params);

			if (result.error) {
				throw result.error.message;
			}

			const shortId: string = req.params.short_id;

			if (!this.myCache.has(shortId)) {
				throw 'Uh oh. We could not find a link at that URL';
			}
			const originalUrl: string = this.myCache.get(shortId);
			res.redirect(originalUrl);
		} catch (ex) {
			console.error(ex);
			res.status(500).json({ massage: ex });
		}
	}

	public getOriginalUrl(req: Request, res: Response) {
		try {
			const schema = joi.object().keys({
				short_id: joi.string().required(),
			});

			const result = schema.validate(req.body);

			if (result.error) {
				throw result.error.message;
			}

			const shortId: string = req.body.short_id;

			if (!this.myCache.has(shortId)) {
				throw 'Uh oh. We could not find a link at that URL';
			}

			const originalUrl: string = this.myCache.get(shortId);
			res.status(200).json(originalUrl);
		} catch (ex) {
			console.error(ex);
			res.status(500).json({ massage: ex });
		}
	}
}
