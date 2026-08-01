/**
 * Storage abstraction for uploaded media. The rest of the app only ever
 * talks to this interface, never to the filesystem/S3/etc directly, so the
 * backing store can change (e.g. local disk -> S3) without touching
 * products/companies code.
 */
export interface StoredFile {
  /** Opaque identifier the storage backend needs to later delete the file. */
  key: string;
  /** Publicly reachable URL clients can load the file from. */
  url: string;
}

export interface Storage {
  save(input: { buffer: Buffer; originalName: string; mimeType: string }): Promise<StoredFile>;
  delete(key: string): Promise<void>;
  /** Extracts the storage key back out of a URL previously returned by `save`, if it belongs to this backend. */
  keyFromUrl(url: string): string | null;
}
