---
id: roadmap
title: Roadmap
sidebar_label: "🗺️ Roadmap"
---

# Roadmap

> Where Rayos is going — and how we plan to get there.

Rayos is currently in active development on **Stellar Testnet**. This page outlines what's built, what's being built, and what's planned for the future.

---

## Current Status (v0.x — Testnet)

These features are **fully built and working** on Stellar Testnet today:

| Feature | Status | Repo |
|---|---|---|
| Passkey wallet creation (WebAuthn registration) | ✅ Done | `wallet-contracts`, `wallet-sdk` |
| Passkey-signed transactions | ✅ Done | `wallet-contracts`, `wallet-sdk` |
| Fee sponsorship via relay | ✅ Done | `relay-backend` |
| Session keys (reduce passkey prompts) | ✅ Done | `wallet-contracts`, `wallet-sdk` |
| Spend limits (rolling cap per token) | ✅ Done | `wallet-contracts` |
| Guardian-based recovery (N-of-M) | ✅ Done | `wallet-contracts`, `relay-backend` |
| Web dashboard (wallet + policies + guardians) | ✅ Done | `web-dashboard` |
| Mobile app (iOS + Android, biometric native) | ✅ Done | `mobile-app` |
| Demo checkout app (gasless merchant payments) | ✅ Done | `demo-app` |
| CI/CD pipelines for all repos | ✅ Done | `infra` |
| Public documentation site | 🚧 In Progress | `docs` |

---

## Near-Term (v1.0 — Mainnet Ready)

These are the remaining pieces before Rayos can safely run on Stellar Mainnet:

### 🔒 Security
- Independent security audit of `wallet-contracts` (all three contracts)
- Threat model review and responsible disclosure process
- CAP-0071 native auth delegation integration (Protocol 27+)

### ⚡ Protocol Upgrades
- **CAP-0071 / CAP-0072 migration** — Stellar's upcoming native auth delegation will allow the policy contract to be called directly inside `__check_auth`, removing the current two-step check and reducing gas cost significantly.
- This is the "v2 wallet" referenced throughout the codebase.

### 🌐 Infrastructure
- Mainnet contract deployment (post-audit)
- Production relay deployment with key rotation
- Vercel + Render production environments live

---

## Future (v2.x and Beyond)

| Idea | Description |
|---|---|
| **Multi-device passkeys** | Register multiple devices (phone + laptop) to the same wallet, each with its own credential |
| **Hardware key support** | YubiKey and FIDO2 keys as signers — ideal for power users and teams |
| **Team wallets** | Shared policy contract across multiple wallets — e.g., a company treasury |
| **Third-party policy modules** | Let developers write their own Policy contract and attach it to any Rayos wallet |
| **Cross-chain relaying** | Potentially extend the relay pattern to other Soroban-compatible chains |

---

## CAP-0071 / CAP-0072 — What Are These?

These are official Stellar protocol improvement proposals. In simple terms:

> **Today:** The policy contract (spend limits, recovery rules) is checked *before* a transaction is built. It's a two-step process.
>
> **After CAP-0071:** The policy can be enforced *inside* the transaction's authentication itself — one step, cheaper gas, stronger guarantees.

This is a big upgrade. The current architecture is deliberately conservative to avoid complexity until the protocol support lands.

---

## How to Contribute to the Roadmap

- Open a [GitHub Discussion](https://github.com/Rayos-Org/docs/discussions) to propose ideas
- Comment on existing issues in any repo
- Submit a PR — the best way to accelerate any feature is to build it!
