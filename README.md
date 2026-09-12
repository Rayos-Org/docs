<p align="center">
  <img src="https://img.shields.io/badge/Rayos-Docs-blue?style=for-the-badge&logo=stellar&logoColor=white" alt="Rayos Docs" />
</p>

<h1 align="center">Rayos Documentation</h1>

<p align="center">
  <strong>The official public-facing developer documentation for the Rayos Organization.</strong><br/>
  Seedless, passkey-native smart wallets for Stellar.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Docusaurus-3.0-3ECC5F?style=for-the-badge&logo=docusaurus&logoColor=white" alt="Docusaurus"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge" alt="Apache 2.0"/>
</p>

---

## 📖 About This Repository

This repository contains the source code for the public-facing **Rayos Documentation Site**. It is built with **Docusaurus**, a modern static website generator designed for documentation.

Unlike the internal `ARCHITECTURE.md` files that live inside each individual repository (which are meant for contributors to that specific codebase), this site serves as the **comprehensive guide** for external developers, integrators, and grant reviewers.

Think of this site as the "book" on how Rayos works.

---

## 📚 Table of Contents

Our documentation is structured to read like a book, taking you from high-level concepts down to the technical metal:

1. **[👋 Introduction](intro.md)** — What is Rayos and why did we build it?
2. **[🚀 Quickstart](guides/quickstart.md)** — Run the full stack locally in 10 minutes.
3. **[🏛️ Architecture Overview](architecture/overview.md)** — How the 8 repositories fit together.
4. **[🔗 Smart Contracts](architecture/contracts.md)** — Deep dive into the Soroban Rust contracts.
5. **[📦 Wallet SDK](architecture/sdk.md)** — How frontend apps talk to the blockchain.
6. **[⚙️ Relay Backend](architecture/backend.md)** — The NestJS middleman that pays your gas fees.
7. **[🖥️ Applications](architecture/apps.md)** — The Web, Mobile, and Demo frontends.
8. **[🔧 Integrating the SDK](guides/integrating-the-sdk.md)** — Add passkeys to your own app.
9. **[🔄 Recovery Flow](guides/recovery-flow.md)** — How social guardian recovery actually works.
10. **[🛡️ Threat Model](security/threat-model.md)** — What we protect against and what we don't.
11. **[🔒 Responsible Disclosure](security/responsible-disclosure.md)** — Found a bug? Let us know safely.
12. **[🗺️ Roadmap](roadmap.md)** — Where we are going next.

---

## 🛠️ Local Development

Want to preview the documentation site locally or contribute changes?

### Prerequisites
- Node.js version 18 or above
- `npm` or `yarn`

### Installation

```bash
git clone https://github.com/Rayos-Org/docs.git
cd docs
npm install
```

### Local Server

```bash
npm run start
```
This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```bash
npm run build
```
This command generates static content into the `build` directory and can be served using any static hosting service.

---

## 🤝 Contributing

We welcome contributions to the documentation! If you find a typo, want to clarify a confusing section, or have a new guide to add:

1. Fork the repository
2. Make your edits to the markdown files
3. Test locally using `npm run start`
4. Submit a Pull Request

All content is written in **Markdown** (`.md`) or **MDX** (`.mdx`), allowing you to use React components directly within the documentation. We also use **Mermaid** extensively for architecture diagrams.

---

## 📄 Content Ownership Rule

Every page under `architecture/` is a **reader-friendly version** of the corresponding repository's internal `ARCHITECTURE.md`. The repo-level files remain the absolute source of truth for deep technical details. This site focuses on the bigger picture and cross-repository relationships.

---

<p align="center">
  Built with ❤️ by the <a href="https://github.com/Rayos-Org">Rayos team</a>.
</p>
