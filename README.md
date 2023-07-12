# A simple setup with Lucia, Neon and Drizzle.

This works by using Lucia's built-in `pg` adapter and passing Neon's `Pool` instance to it. This works thanks to Neon's `Pool` and `Client` being a drop-in replacement for `node-postgres`'s `Pool` and `Client`.

To make it work with a framework it shouldn't need much additional work, just add the appropriate `middleware` to `lucia.ts` and make sure to follow the framework specific docs for setting Lucia up further, because there are some things that are missing (like `app.d.ts` for example).

This works in both serverless and edge environments, as it makes use of Neon's serverless driver (https://neon.tech/docs/serverless/serverless-driver).

Context: https://discord.com/channels/1004048134218981416/1128374846171140106
