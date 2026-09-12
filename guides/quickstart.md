---
id: quickstart
title: Quickstart
sidebar_label: "🚀 Quickstart"
---

# Quickstart

> Get the full Rayos stack running on your machine in under 10 minutes.

---

## Prerequisites

Before you start, make sure you have these installed:

| Tool | Version | Install |
|---|---|---|
| **Node.js** | v20+ | [nodejs.org](https://nodejs.org/) |
| **pnpm** | v9.x | `npm install -g pnpm@9` |
| **Rust** | Latest stable | [rustup.rs](https://rustup.rs/) |
| **Docker** | Latest | [docker.com](https://www.docker.com/) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

---

## Step 1 — Clone All Repos

```bash
mkdir rayos && cd rayos
git clone https://github.com/Rayos-Org/wallet-contracts.git
git clone https://github.com/Rayos-Org/wallet-sdk.git
git clone https://github.com/Rayos-Org/relay-backend.git
git clone https://github.com/Rayos-Org/web-dashboard.git
```

> You don't need all repos at once. If you're only contributing to one part, just clone that repo.

---

## Step 2 — Start the Relay Backend

The relay backend is the first service to start — everything else depends on it.

```bash
cd relay-backend
pnpm install
cp .env.example .env

# Start PostgreSQL + Redis
docker-compose up -d

# Push database schema
pnpm db:push

# Start dev server
pnpm start:dev
```

✅ Relay is running at `http://localhost:3000`  
📖 Swagger API docs at `http://localhost:3000/api/docs`

---

## Step 3 — Start the Web Dashboard

```bash
cd web-dashboard
pnpm install
cp .env.local.example .env.local
```

Open `.env.local` and set:
```env
NEXT_PUBLIC_RELAY_URL=http://localhost:3000
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org
JWT_SECRET=any-random-secret-for-local-dev
```

Then:
```bash
pnpm dev
```

✅ Web dashboard is running at `http://localhost:3001`

---

## Step 4 — Create Your First Wallet

1. Open `http://localhost:3001` in your browser
2. Click **"Create Wallet"**
3. Follow the 3-step flow:
   - Enter a display name
   - Your browser will prompt you to create a **passkey** (Face ID / Touch ID / PIN)
   - The wallet contract is deployed on Stellar Testnet
4. You're in! You'll see your balance dashboard.

> **Note:** On first run, your wallet will have 0 XLM. The relay backend uses [Friendbot](https://laboratory.stellar.org/#?network=test) to fund testnet accounts. Look for the Friendbot button in the UI.

---

## Step 5 — Make Your First Transaction

1. From the dashboard, click **"Send"**
2. Enter a recipient address (you can use any valid Stellar testnet address)
3. Enter an amount in XLM
4. Click **"Send"** — your device will prompt for biometric confirmation
5. Watch the transaction appear in your activity feed!

---

## Running the Demo App

Want to see the checkout demo?

```bash
cd demo-app
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3002` and try buying something from the mock catalog.

---

## Running Tests

Each repo has its own test commands:

```bash
# Web Dashboard
cd web-dashboard && pnpm test && pnpm e2e

# Relay Backend
cd relay-backend && pnpm run test:e2e

# Wallet SDK
cd wallet-sdk && pnpm test

# Wallet Contracts (Rust)
cd wallet-contracts && cargo test
```

---

## Troubleshooting

**`Cannot connect to Redis`** — Make sure Docker is running: `docker ps`

**`Database connection refused`** — Check that the Postgres container is up: `docker-compose ps`

**Passkey prompt doesn't appear** — Your browser must support WebAuthn. Use Chrome, Edge, Firefox, or Safari (latest versions). Localhost is always allowed.

**`pnpm: command not found`** — Run `npm install -g pnpm@9` first.

**Wallet stuck at "deploying"** — The Stellar testnet can be slow. Wait 10–15 seconds and refresh.

---

## What's Next?

- [Integrating the SDK](./integrating-the-sdk) — Add Rayos to your own app
- [Recovery Flow](./recovery-flow) — Set up and test guardian recovery
- [Architecture Overview](../architecture/overview) — Go deeper on how it all works
