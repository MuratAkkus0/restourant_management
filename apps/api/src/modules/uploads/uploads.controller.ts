import type { Request, Response } from "express";
import { AppError } from "../../middleware/app-error.js";
import { uploadsService } from "./uploads.service.js";

export const uploadsController = {
  async uploadImage(req: Request, res: Response) {
    if (!req.file) {
      throw AppError.badRequest("No file provided.");
    }
    const stored = await uploadsService.saveImage(req.file);
    res.status(201).json({ url: stored.url });
  },
};
