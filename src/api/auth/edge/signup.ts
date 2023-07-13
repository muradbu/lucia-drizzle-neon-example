import { auth } from "../../../lucia";

export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function SignUp(
  request: Request & { body: { id: string; password: string } }
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

    return new Response(
      JSON.stringify({
        message: "Success! Created user.",
        user,
      })
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }));
  }
}
