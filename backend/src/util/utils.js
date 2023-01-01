import crypto from "crypto";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sha1FromStream(stream) {
  const hasher = crypto.createHash("sha1");
  hasher.setEncoding("hex");
  const hasherEnd = new Promise((resolve, reject) => {
    stream.on("end", () => {
      hasher.end();
      resolve(hasher.read());
    });
    stream.on("error", reject);
  });
  stream.pipe(hasher);
  return await hasherEnd;
}