import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { env } from "../../config/env.js";
import type { Storage, StoredFile } from "./storage.interface.js";

// Mounted as a docker volume in production so uploads survive container
// restarts (see docker-compose.yml). Locally it just lives on disk.
const UPLOAD_DIR = path.resolve(process.cwd(), "uploads");
const URL_PREFIX = "/uploads";

async function ensureDir() {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
}

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export const localStorage: Storage = {
  async save({ buffer, mimeType }): Promise<StoredFile> {
    await ensureDir();
    const ext = EXT_BY_MIME[mimeType];
    if (!ext) {
      throw new Error(`Unsupported mime type: ${mimeType}`);
    }
    const key = `${crypto.randomUUID()}${ext}`;
    await fs.writeFile(path.join(UPLOAD_DIR, key), buffer);
    return { key, url: `${env.API_PUBLIC_URL}${URL_PREFIX}/${key}` };
  },

  async delete(key: string): Promise<void> {
    try {
      await fs.unlink(path.join(UPLOAD_DIR, key));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
        throw err;
      }
    }
  },

  keyFromUrl(url: string): string | null {
    const marker = `${URL_PREFIX}/`;
    const index = url.indexOf(marker);
    return index === -1 ? null : url.slice(index + marker.length);
  },
};

export const UPLOAD_STATIC_DIR = UPLOAD_DIR;
export const UPLOAD_URL_PREFIX = URL_PREFIX;
