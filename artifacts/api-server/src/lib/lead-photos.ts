import { randomUUID } from "crypto";
import { Storage } from "@google-cloud/storage";
import type { LeadPhoto } from "@workspace/db";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

function getPrivateObjectDir(): string {
  const dir = process.env.PRIVATE_OBJECT_DIR || "";
  if (!dir) {
    throw new Error("PRIVATE_OBJECT_DIR not set — object storage unavailable");
  }
  return dir.endsWith("/") ? dir.slice(0, -1) : dir;
}

function parseObjectPath(fullPath: string): {
  bucketName: string;
  objectName: string;
} {
  let path = fullPath;
  if (!path.startsWith("/")) path = `/${path}`;
  const parts = path.split("/");
  if (parts.length < 3) {
    throw new Error(`Invalid object storage path: ${fullPath}`);
  }
  return { bucketName: parts[1], objectName: parts.slice(2).join("/") };
}

/** True when object storage env vars are configured. */
export function isLeadPhotoStorageConfigured(): boolean {
  return Boolean(process.env.PRIVATE_OBJECT_DIR);
}

/**
 * Uploads trade-in photos to the private object storage dir under
 * `lead-photos/<uuid>` and returns metadata for storage on the lead row.
 */
export async function uploadLeadPhotos(
  files: Array<{ originalname?: string; mimetype: string; buffer: Buffer }>,
): Promise<LeadPhoto[]> {
  const dir = getPrivateObjectDir();
  const photos: LeadPhoto[] = [];
  for (const [i, f] of files.entries()) {
    const objectPath = `${dir}/lead-photos/${randomUUID()}`;
    const { bucketName, objectName } = parseObjectPath(objectPath);
    await objectStorageClient
      .bucket(bucketName)
      .file(objectName)
      .save(f.buffer, {
        contentType: f.mimetype || "application/octet-stream",
        resumable: false,
      });
    photos.push({
      path: objectPath,
      filename: f.originalname || `zdjecie-${i + 1}.jpg`,
      contentType: f.mimetype || "application/octet-stream",
    });
  }
  return photos;
}

/**
 * Deletes stored lead photos from object storage. Missing objects are
 * treated as already deleted; any other error is thrown so the caller
 * can keep the DB metadata and retry later.
 */
export async function deleteLeadPhotos(photos: LeadPhoto[]): Promise<void> {
  for (const photo of photos) {
    const { bucketName, objectName } = parseObjectPath(photo.path);
    try {
      await objectStorageClient.bucket(bucketName).file(objectName).delete();
    } catch (e) {
      const code = (e as { code?: number }).code;
      if (code === 404) continue; // already gone — fine
      throw e;
    }
  }
}

/** Returns a readable stream of a stored lead photo. */
export function createLeadPhotoReadStream(
  photo: LeadPhoto,
): NodeJS.ReadableStream {
  const { bucketName, objectName } = parseObjectPath(photo.path);
  return objectStorageClient
    .bucket(bucketName)
    .file(objectName)
    .createReadStream();
}

/** Downloads a stored lead photo as a Buffer. */
export async function downloadLeadPhoto(photo: LeadPhoto): Promise<Buffer> {
  const { bucketName, objectName } = parseObjectPath(photo.path);
  const [contents] = await objectStorageClient
    .bucket(bucketName)
    .file(objectName)
    .download();
  return contents;
}
