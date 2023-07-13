import { auth } from "../../../lucia";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function SignUp(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") return new Response("Must be POST");
  if (!request.body) return new Response("Must have body");
  if (!request.body.id || !request.body.password)
    return new Response("Missing parameters");

  try {
    const user = await auth.useKey(
      "test",
      request.body.id,
      request.body.password
    );
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    response.status(200).send({ user, session });
  } catch (error) {
    response.status(500).send({ error: error });
  }
}
