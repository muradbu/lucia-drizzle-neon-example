import { auth } from "../../../lucia";

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function SignIn(
  request: Request & { body: { id: string; password: string } }
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

    return new Response(JSON.stringify({ session, user }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }));
  }
}
