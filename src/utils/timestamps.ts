import { serverTimestamp, Timestamp } from "firebase/firestore";

export function generateQrTimestamps(ttlSeconds: number = 60) {
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
  return {
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    expiresAt: Timestamp.fromDate(expiresAt),
  };
}
