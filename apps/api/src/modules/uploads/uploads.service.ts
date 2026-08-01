import { AppError } from "../../middleware/app-error.js";
import { localStorage } from "./local-storage.js";
import type { StoredFile } from "./storage.interface.js";

// Swapping storage backends (e.g. to S3) only means changing this one line.
const storage = localStorage;

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export const uploadsService = {
  async saveImage(file: { buffer: Buffer; originalname: string; mimetype: string }): Promise<StoredFile> {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      throw AppError.badRequest("Only JPEG, PNG or WEBP images are allowed.");
    }
    return storage.save({ buffer: file.buffer, originalName: file.originalname, mimeType: file.mimetype });
  },

  async deleteImageByUrl(url: string | null | undefined): Promise<void> {
    if (!url) return;
    const key = storage.keyFromUrl(url);
    if (key) {
      await storage.delete(key);
    }
  },
};
