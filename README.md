# Create T3 App With Sign-In With Ethereum

An implementation of [T3 Stack](https://create.t3.gg/) with [Sign-In With Ethereum](https://login.xyz).

!["T3-Stack-SIWE"](/README/t3-siwe-screenshot.png)

## Tutorials

📘 Full walkthrough article on how to [Combine Sign-In With Ethereum With Create-T3-App](https://codingwithmanny.medium.com/combine-sign-in-with-ethereum-with-create-t3-app-8f54604caeeb).

<a href="https://codingwithmanny.medium.com/combine-sign-in-with-ethereum-with-create-t3-app-8f54604caeeb">![Combine Sign-In With Ethereum With Create-T3-App](README/t3-siwe-medium.jpg)</a>

---

## Requirement

- NVM or Node `v18.15.0`

---

## next-auth@4.21.1 Fix

With the latest version of `next-auth@4.21.1` it drops the headers which doesn't allow the nonce to be read from the csrf cookie.

The solution to this can be found in this branch:

[fix/next-auth-4.21.1](https://github.com/codingwithmanny/t3-app-siwe/tree/fix/next-auth-4.21.1)

---

## Getting Started

Follow all these steps to get up and running locally.

### Dependencies

```bash
# FROM: ./

pnpm install; # npm install;
```

### Environment Variable File

```bash
# FROM: ./

cp .env.example .env;
```

**File:** `.env`

```toml
# When adding additional environment variables, the schema in "/src/env.mjs"
# should be updated accordingly.

# Prisma
# https://www.prisma.io/docs/reference/database-reference/connection-urls#env
DATABASE_URL="file:./db.sqlite"

# Next Auth
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
NEXTAUTH_SECRET="A-REALLY-LONG-SECRET-PASSWORD-32"
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

### Database Migration

```bash
# FROM: ./

npx prisma migrate dev;
```

### Local Development

```bash
# FROM: ./

pnpm dev; # npm run dev;

# Expected Output:
# > test-t3-app@0.1.0 dev /Users/username/path/to/t3-app-siwe
# > next dev

# ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Database Client (Prisma Studio)

```bash
# FROM: ./

npx prisma studio;

# Expected Output:
# Environment variables loaded from .env
# Prisma schema loaded from prisma/schema.prisma
# Prisma Studio is up on http://localhost:5555
```

---

built by [@codingwithmanny](https://twitter.com/codingwithmanny)


