
// app/api/debug-session/route.js
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
  const { userId, orgId } = getAuth(req);
  return Response.json({ userId, orgId });
}