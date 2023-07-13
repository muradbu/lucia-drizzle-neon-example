import { dbHttp } from "../db";
import { sql } from "drizzle-orm";

export default async function handler(request, response) {
  const {
    rows: [firstRow],
  } = await dbHttp.execute(sql`SELECT 1`);
  const value = (firstRow as Record<string, unknown>)["?column?"];

  if (value === 1) {
    response
      .status(200)
      .send("Success! Queried database using Drizzle ORM over HTTP.");
  } else {
    response
      .status(500)
      .send("Failed! Queried database using Drizzle ORM over HTTP.");
  }
}
