import { dbHttp } from "@/lib/db";
import { sql } from "drizzle-orm";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function Serverless(
  request: VercelRequest,
  response: VercelResponse
) {
  const {
    rows: [firstRow],
  } = await dbHttp.execute(sql`SELECT 1`);
  const value = (firstRow as Record<string, unknown>)["?column?"];

  if (value === 1) {
    response.status(200).json({
      message: "Success! Queried database using Drizzle ORM over HTTP.",
      query: "SELECT 1",
      response: firstRow,
    });
  } else {
    response.status(500).json({
      message: "Failed! Queried database using Drizzle ORM over HTTP.",
      query: "SELECT 1",
      response: firstRow,
    });
  }
}
