import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { dbPool } from "@/lib/db";
import { user as UserSchema } from "../src/lib/schema";

const TEST_USER = {
  id: "1337",
  password: "password",
};

beforeAll(async () => {
  await cleanup();
});

afterAll(async () => {
  await cleanup();
});

describe("Authentication", () => {
  it("should register a user", async () => {
    const user = await auth.createUser({
      key: {
        providerId: "test",
        providerUserId: TEST_USER.id,
        password: TEST_USER.password,
      },
      attributes: {},
      userId: TEST_USER.id,
    });
    expect(user.userId).toBe(TEST_USER.id);
  });

  it("should not login and throw invalid password", async () => {
    try {
      await auth.useKey("test", TEST_USER.id, "wr0ngp4ssw0rd");
      throw new Error("Expected useKey to throw, but it did not");
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe("AUTH_INVALID_PASSWORD");
      } else {
        throw new Error("Expected an Error to be thrown, but it was not");
      }
    }
  });

  it("should create session", async () => {
    try {
      const user = await auth.useKey("test", TEST_USER.id, TEST_USER.password);
      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      });
      expect(session.user.userId).toBe(TEST_USER.id);
    } catch (error) {
      throw new Error("Expected useKey to not throw, but it did: " + error);
    }
  });
});

const cleanup = async () => {
  const existingUser = await dbPool
    .select({ userId: UserSchema.id })
    .from(UserSchema)
    .where(eq(UserSchema.id, TEST_USER.id));
  const userId = existingUser[0]?.userId;

  await auth.invalidateAllUserSessions(userId);
  await auth.deleteDeadUserSessions(userId);
  await auth.deleteUser(userId);
};
