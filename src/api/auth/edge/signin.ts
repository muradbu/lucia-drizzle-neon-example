import { auth } from "../../../lib/auth";

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function SignIn(
  request: Request & { body: { id: string; password: string } }
) {
  if (request.method !== "POST") return new Response("Must be POST");

  const body = await request.json();

  if (!body) return new Response("Must have body");
  if (!body.id || !body.password) return new Response("Missing parameters");

  try {
    const user = await auth.useKey("test", body.id, body.password);
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    });

    return new Response(JSON.stringify({ session, user }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error }));
  }
}
