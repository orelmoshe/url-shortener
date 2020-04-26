import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dns from 'dns';
const NodeCache = require('node-cache');

export class Controller {
	private readonly myCache = new NodeCache();
	private static instance: Controller;

	public constructor() {
		if (Controller.instance) {
			return Controller.instance;
		}
		Controller.instance = this;
	}

	public async addNewUrl(req: Request, res: Response) {
		try {
			let originalUrl: URL;

			try {
				originalUrl = new URL(req.body.url);
			} catch (ex) {
				throw 'invalid URL';
			}
			dns.lookup(originalUrl.hostname, err => {
				if (err) {
					throw 'Address not found';
				}
			});
				let shortId: string;
				if (this.myCache.has(originalUrl.href)) {
					shortId = this.myCache.get(originalUrl.href);
					res.status(200).json(shortId);
					return;
				}

				shortId = uuidv4();
				this.myCache.set(originalUrl.href, shortId);

				res.status(200).json(shortId);

		} catch (ex) {
			console.error(ex);
			res.status(500).json({massage: ex});
		}
	}

	private checkIfShortIdExists = (shortId: string): string => {
		for (const key of this.myCache.keys()) {
			if (this.myCache.get(key) === shortId) return key;
		}
		return null;
  };
  
	public getLinkUrl(req: Request, res: Response) {
		try {
			const shortId: string = req.params.short_id;
			const originalUrl: string = this.checkIfShortIdExists(shortId);
			if (!originalUrl) {
				throw 'Uh oh. We could not find a link at that URL';
			}
			res.redirect(originalUrl);
		} catch (ex) {
			console.error(ex);
			res.status(500).json({massage: ex});
		}
	}

	public getOriginalUrl(req: Request, res: Response) {
		try {
      const shortId: string = req.body.short_id;
			const originalUrl: string = this.checkIfShortIdExists(shortId);
			if (!originalUrl) {
				throw 'Uh oh. We could not find a link at that URL';
			}
			res.status(200).json(originalUrl);
		} catch (ex) {
			console.error(ex);
			res.status(500).json({massage: ex});
		}
	}

}
