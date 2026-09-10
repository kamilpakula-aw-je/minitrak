import app from "./app";
import { logger } from "./lib/logger";
import { startLeadRetryLoop } from "./lib/lead-retry";
import { startLeadPhotoCleanupLoop } from "./lib/lead-photo-cleanup";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // Retry e-mail delivery for leads stuck in "failed" — once shortly
  // after start, then periodically.
  startLeadRetryLoop();

  // Delete stored trade-in photos of old, handled leads so object
  // storage does not grow forever.
  startLeadPhotoCleanupLoop();
});
