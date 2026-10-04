---
id: architecture-overview
title: Architecture Overview
sidebar_label: "🏛️ Overview"
---

# Architecture Overview

> How all the pieces of Rayos fit together — explained from the ground up.

---

## The Big Picture

Rayos is not one app — it is a **platform** made of 7 working repositories. Each one does a specific job, like instruments in an orchestra. Alone they are useful. Together they make something remarkable.

Here is the full system at a glance:

```mermaid
flowchart TB
    subgraph Users["User Devices"]
        WEB["web-dashboard\nNext.js"]
        MOB["mobile-app\nReact Native / Expo"]
        DEMO["demo-app\nNext.js"]
    end

    subgraph SDK["wallet-sdk (TypeScript NPM Package)"]
        PASS["Passkey Module"]
        CONT["Contract Client"]
        RC["Relay Client"]
        SESS["Session Manager"]
    end

    subgraph BACK["relay-backend (NestJS on Render)"]
        WA["WebAuthn Controller"]
        RLY["Relay Controller"]
        SESS2["Sessions Controller"]
        REC["Recovery Controller"]
        IDX["Indexer"]
    end

    subgraph CHAIN["wallet-contracts (Rust / Soroban)"]
        WALLET["Wallet Contract\nidentity and auth"]
        POLICY["Policy Contract\nrules and limits"]
        FACTORY["Factory Contract\ndeployment"]
    end

    STELLAR["Stellar Blockchain"]

    WEB --> SDK
    MOB --> SDK
    DEMO --> SDK
    SDK --> BACK
    BACK --> STELLAR
    CHAIN --> STELLAR
```

---

## Layer by Layer

Think of Rayos as having **four layers**, like a building:

```
+----------------------------------------------+
|  Layer 4: User Interfaces                    |
|  web-dashboard · mobile-app · demo-app       |
+----------------------------------------------+
|  Layer 3: SDK                                |
|  @rayos/wallet-sdk                           |
+----------------------------------------------+
|  Layer 2: Backend                            |
|  relay-backend                               |
+----------------------------------------------+
|  Layer 1: Smart Contracts                    |
|  wallet-contracts (on Stellar Soroban)       |
+----------------------------------------------+
```

Each layer only talks to the layer immediately below it. The UI never directly touches the blockchain — it goes through the SDK, which goes through the relay, which talks to Soroban.

---

## Layer 1 — Smart Contracts

**Repository:** [`wallet-contracts`](https://github.com/Rayos-Org/wallet-contracts)

This is the foundation. Three smart contracts written in **Rust**, running on **Stellar Soroban**.

```mermaid
graph LR
    F["Factory Contract\ndeploy_wallet"] -->|creates| W
    W["Wallet Contract\nverifies passkeys"] -->|checks rules| P
    P["Policy Contract\nSpend Limits + Recovery"]
```

| Contract | Job | Analogy |
|---|---|---|
| **Factory** | Deploys new wallet contracts | The bank that opens new accounts |
| **Wallet** | Verifies passkey signatures, holds signers | The vault door |
| **Policy** | Enforces spend limits, sessions, guardians | The vault rule book |

> **Key Insight:** These contracts run on-chain. Rayos (the company, the relay, anyone) cannot override them. The rules are math.

---

## Layer 2 — Relay Backend

**Repository:** [`relay-backend`](https://github.com/Rayos-Org/relay-backend)

A **NestJS** API that acts as a helpful middleman. It has 5 jobs:

1. **WebAuthn** — Generate challenges for registration/login, verify passkey responses
2. **Relay** — Wrap user transactions in a fee-bump (pays XLM gas so users don't have to)
3. **Sessions** — Manage session keys for repeated low-risk operations
4. **Recovery** — Orchestrate multi-step guardian recovery
5. **Indexer** — Watch the chain for events (transaction history)

> **Trustless by design:** The relay can pay your gas fee, but it cannot move your funds. If it tried to tamper with your signed transaction, the blockchain would reject it immediately.

---

## Layer 3 — Wallet SDK

**Repository:** [`wallet-sdk`](https://github.com/Rayos-Org/wallet-sdk)

A TypeScript npm package (`@rayos/wallet-sdk`) that every frontend app installs. It wraps all the complexity of passkeys, XDR signing, and relay calls into simple function calls:

```typescript
// Create a new wallet
const { address } = await walletSdk.createWallet(options);

// Sign and submit a transaction
const receipt = await walletSdk.signAndSubmit(xdr, opts);
```

Apps never touch WebAuthn or Soroban directly. The SDK is the single abstraction layer.

---

## Layer 4 — User Interfaces

Three apps, all powered by the SDK:

| App | Repo | Description |
|---|---|---|
| **Web Dashboard** | [`web-dashboard`](https://github.com/Rayos-Org/web-dashboard) | Full wallet management — balance, send, policies, guardians |
| **Mobile App** | [`mobile-app`](https://github.com/Rayos-Org/mobile-app) | iOS + Android native experience with device biometrics |
| **Demo App** | [`demo-app`](https://github.com/Rayos-Org/demo-app) | A merchant checkout demo — gasless payments in USDC |

---

## How a Transaction Flows

Here is what happens when you tap "Send" — from your finger to the blockchain:

```mermaid
sequenceDiagram
    participant U as User
    participant APP as App
    participant SDK as wallet-sdk
    participant WA as WebAuthn Device
    participant RELAY as relay-backend
    participant STELLAR as Stellar

    U->>APP: Tap "Send"
    APP->>SDK: signAndSubmit(xdr)
    SDK->>WA: Prompt biometric
    WA-->>U: Show Face ID / Touch ID
    U-->>WA: Scan fingerprint
    WA-->>SDK: Passkey signature
    SDK->>RELAY: Submit signed XDR
    RELAY->>RELAY: Add fee-bump to pay gas
    RELAY->>STELLAR: Submit to network
    STELLAR-->>RELAY: Transaction hash
    RELAY-->>SDK: hash and status
    SDK-->>APP: SubmitResponse
    APP-->>U: Receipt
```

---

## The Infra Layer

**Repository:** [`infra`](https://github.com/Rayos-Org/infra)

This repo contains no running code — it is pure **configuration and tooling**:

- Shared GitHub Actions workflows (used by every repo)
- Environment variable templates
- Docker Compose for local development
- Deployment configs for Render and Vercel

Every other repo pulls its CI/CD from `infra` — change a workflow once, update everywhere.

---

## Environments

Rayos uses a four-tier environment model:

```mermaid
graph LR
    LOCAL["local\nYour machine"] -->|promote| DEV
    DEV["testnet-dev\nAuto on merge to main"] -->|promote| STAGING
    STAGING["testnet-staging\nStable pre-release"] -->|promote| PROD
    PROD["mainnet\nProduction coming soon"]
```

| Environment | Network | Purpose |
|---|---|---|
| `local` | Stellar Testnet | Your own machine |
| `testnet-dev` | Stellar Testnet | Shared staging, auto-deployed |
| `testnet-staging` | Stellar Testnet | Stable, mirrors mainnet config |
| `mainnet` | Stellar Mainnet | Production (pending audit) |

> No repo can skip directly to mainnet. The pipeline enforces the promotion order.

---

## Further Reading

- [Smart Contracts Deep Dive](./contracts)
- [SDK Architecture](./sdk)
- [Relay Backend Architecture](./backend)
- [Apps Architecture](./apps)
