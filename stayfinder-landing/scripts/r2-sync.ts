import { S3Client, PutObjectCommand, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream, createWriteStream, existsSync } from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { Readable } from "stream";

const DB_PATH = path.resolve(__dirname, "../prisma/dev.db");
const KEY = process.env.R2_DB_KEY ?? "stayfinder/dev.db";

function getClient() {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("Missing R2 env vars: R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY");
  }

  return new S3Client({
    region: "auto",
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });
}

async function push() {
  const bucket = process.env.R2_BUCKET_NAME!;
  if (!existsSync(DB_PATH)) {
    console.error(`DB file not found at ${DB_PATH}`);
    process.exit(1);
  }

  const client = getClient();
  const { createReadStream: fsRead } = await import("fs");
  const body = fsRead(DB_PATH);

  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Key: KEY,
    Body: body as any,
    ContentType: "application/octet-stream",
    Metadata: { pushedAt: new Date().toISOString() },
  }));

  console.log(`✓ Pushed ${DB_PATH} → r2://${bucket}/${KEY}`);
}

async function pull() {
  const bucket = process.env.R2_BUCKET_NAME!;
  const client = getClient();

  // Check if file exists in R2 first
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key: KEY }));
  } catch {
    console.log("No DB found in R2 yet — starting fresh.");
    return;
  }

  const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: KEY }));
  if (!res.Body) {
    console.error("Empty response from R2");
    process.exit(1);
  }

  await pipeline(res.Body as Readable, createWriteStream(DB_PATH));
  console.log(`✓ Pulled r2://${bucket}/${KEY} → ${DB_PATH}`);
}

const cmd = process.argv[2];
if (cmd === "push") {
  push().catch((e) => { console.error(e); process.exit(1); });
} else if (cmd === "pull") {
  pull().catch((e) => { console.error(e); process.exit(1); });
} else {
  console.error("Usage: r2-sync.ts <push|pull>");
  process.exit(1);
}
