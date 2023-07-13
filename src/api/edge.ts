import { dbHttp } from "@/lib/db";
import { sql } from "drizzle-orm";
import type { RequestContext } from "@vercel/edge";

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function Edge(request: Request, context: RequestContext) {
  const {
    rows: [firstRow],
  } = await dbHttp.execute(sql`SELECT 1`);
  const value = (firstRow as Record<string, unknown>)["?column?"];

  const region = request.headers.get("x-vercel-id");

  if (value === 1) {
    return new Response(
      JSON.stringify({
        message: "Success! Queried database using Drizzle ORM over HTTP.",
        query: "SELECT 1",
        response: firstRow,
        executedIn: region,
      })
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Failed! Queried database using Drizzle ORM over HTTP.",
        query: "SELECT 1",
        response: firstRow,
        executedIn: region,
      })
    );
  }
}
