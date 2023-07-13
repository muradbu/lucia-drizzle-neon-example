import { auth } from "@/lib/auth";
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
    const user = await auth.createUser({
      key: {
        providerId: "test",
        providerUserId: request.body.id,
        password: request.body.password,
      },
      attributes: {},
      userId: request.body.id,
    });

    response.status(200).send({ user });
  } catch (error) {
    response.status(500).send({ error: error });
  }
}
