# A simple setup with Lucia, Neon and Drizzle.

This works by using [Lucia](https://github.com/pilcrowonpaper/lucia)'s built-in `pg` adapter and passing Neon's `Pool` instance to it. This works thanks to Neon's `Pool` and `Client` being a drop-in replacement for `node-postgres`'s `Pool` and `Client`.

To make it work with a framework it shouldn't need much additional work, just add the appropriate `middleware` to `lucia.ts` and make sure to follow the framework specific docs for setting Lucia up further, because there are some things that are missing (like `app.d.ts` for example).

This works in both serverless and edge environments, as it makes use of Neon's serverless driver (https://neon.tech/docs/serverless/serverless-driver).

Context: https://discord.com/channels/1004048134218981416/1128374846171140106

## Testing

I've written the following tests:

- `should register a user`
- `should not login and throw invalid password`
- `should create session`

Supply your own `.env` file from the example, run `pnpm db:migrate`, apply the migration and run `pnpm test`.

### Testing it live

You can deploy this to Vercel to test it manually yourself.

`api/edge.ts` & `api/serverless.ts` are "alive" checks using Drizzle, to make sure that the database is queryable.

`api/auth/` contains 2 directories:

- `edge` - this is the edge version of the API
- `serverless` - this is the serverless version of the API
