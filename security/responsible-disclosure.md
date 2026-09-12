---
id: responsible-disclosure
title: Responsible Disclosure
sidebar_label: 🔒 Responsible Disclosure
---

# Responsible Disclosure

> Found a security issue? Thank you for looking. Here's what to do.

---

## Please Don't Open a Public Issue

We know it's tempting to open a GitHub issue — it's the default for everything else. But for security vulnerabilities, a public issue immediately alerts potential attackers before a fix is ready.

**Instead, please report privately:**

📧 **Email:** `security@rayos.org`

We will acknowledge your report within **48 hours** and keep you informed as we investigate and patch.

---

## What to Include in Your Report

A good report helps us fix things faster:

- **Description** — What is the vulnerability? What does it enable an attacker to do?
- **Steps to reproduce** — As specific as possible
- **Affected component** — Which repo / contract / module?
- **Impact assessment** — Your estimate of severity (funds at risk? data exposure? denial of service?)
- **Proof of concept** — If you have one, please share it privately

---

## What Happens After You Report

1. **Acknowledgment** — We confirm receipt within 48 hours
2. **Investigation** — We reproduce and assess the issue
3. **Fix** — We develop and test a patch
4. **Disclosure** — We coordinate a public disclosure date with you (typically 90 days after report)
5. **Credit** — With your permission, we credit you in the security advisory

---

## Scope

| In Scope | Out of Scope |
|---|---|
| `wallet-contracts` — all three Soroban contracts | UI styling issues |
| `wallet-sdk` — passkey flows, XDR signing | Performance issues not related to security |
| `relay-backend` — WebAuthn, relay, recovery | Issues in dependency packages (report those upstream) |
| `web-dashboard` and `mobile-app` auth flows | Testnet-only issues with no mainnet impact |

---

## What We Commit To

- We will not take legal action against researchers who report in good faith
- We will fix confirmed vulnerabilities promptly
- We will not deploy to mainnet without an independent security audit

---

> Thank you for helping keep Rayos and the Stellar ecosystem safe. 🙏
