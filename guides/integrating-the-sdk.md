---
id: integrating-the-sdk
title: Integrating the SDK
sidebar_label: "🔧 Integrating the SDK"
---

# Integrating the SDK

> Add passkey-powered Stellar wallets to your own app in a few steps.

The `@rayos/wallet-sdk` is designed to be embedded in any web or mobile application. This guide walks through the integration from scratch.

---

## Installation

```bash
npm install @rayos/wallet-sdk
# or
pnpm add @rayos/wallet-sdk
```

---

## Initialize the SDK

Create a singleton instance — ideally in a `lib/sdk-client.ts` file:

```typescript
import { WalletSdk } from '@rayos/wallet-sdk';

export const walletSdk = new WalletSdk({
  network: {
    passphrase: process.env.NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE!,
    rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL!,
  },
  relayUrl: process.env.NEXT_PUBLIC_RELAY_URL!,
  contractIds: {
    factory: process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ID!,
    policy:  process.env.NEXT_PUBLIC_POLICY_CONTRACT_ID!,
  },
});
```

---

## Create a Wallet

```typescript
const { address, credentialId } = await walletSdk.createWallet({
  displayName: 'Alice',    // shown in biometric prompt
  salt: crypto.getRandomValues(new Uint8Array(32)),
});

// Store address + credentialId in your session / database
console.log('New wallet:', address);
```

This triggers a **biometric prompt** (Face ID / Touch ID / FIDO2 key). The passkey is created and stored in the user's secure enclave — you never see any private key material.

---

## Sign In (Returning User)

```typescript
const { address, credentialId } = await walletSdk.signIn({
  credentialId: storedCredentialId,  // from your session store
});
```

---

## Send a Transaction

```typescript
// Build your XDR transaction first (using Stellar SDK or your relay)
const xdr = await buildTransferXdr({ to: recipientAddress, amount: '10', token: 'XLM' });

// Sign and submit — triggers biometric prompt
const result = await walletSdk.signAndSubmit(xdr, {
  credentialId: storedCredentialId,
});

console.log('Transaction hash:', result.hash);
```

---

## Check Balance

```typescript
const balance = await walletSdk.getBalance({
  address: walletAddress,
  token: 'XLM',
});
```

---

## Session Keys (Optional)

For apps where users perform frequent low-risk actions, session keys reduce passkey prompts:

```typescript
// Create a session key (one biometric prompt)
const session = await walletSdk.createSessionKey({
  credentialId,
  scopes: ['transfer'],
  expiresIn: 3600,  // 1 hour
});

// Use session key for subsequent transactions — no prompt!
const result = await walletSdk.signAndSubmit(xdr, {
  sessionKey: session.key,
});
```

---

## Mobile Integration

For React Native apps, inject the native passkey adapter:

```typescript
import { createCredential, signTransaction } from './native/passkey-adapter';

export const walletSdk = new WalletSdk({
  ...config,
  passkeyProvider: { createCredential, signTransaction },  // native impl
  storage: secureStorageAdapter,                           // expo-secure-store
});
```

See the [`mobile-app`](https://github.com/Rayos-Org/mobile-app) repository for a complete reference implementation.

---

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE` | `Test SDF Network ; September 2015` for testnet |
| `NEXT_PUBLIC_STELLAR_RPC_URL` | `https://soroban-testnet.stellar.org` |
| `NEXT_PUBLIC_RELAY_URL` | URL of your deployed relay-backend |
| `NEXT_PUBLIC_FACTORY_CONTRACT_ID` | Deployed factory contract address |
| `NEXT_PUBLIC_POLICY_CONTRACT_ID` | Deployed policy contract address |

---

## Error Handling

```typescript
import { PolicyError, WalletError } from '@rayos/wallet-sdk';

try {
  await walletSdk.signAndSubmit(xdr, opts);
} catch (err) {
  if (err instanceof PolicyError) {
    switch (err.code) {
      case 'SPEND_LIMIT_EXCEEDED':
        alert('Daily spend limit reached. Try again tomorrow.');
        break;
      case 'INVALID_SESSION':
        // Session expired — prompt passkey again
        break;
    }
  } else if (err instanceof WalletError) {
    console.error('Wallet auth failed:', err.message);
  }
}
```

---

## Reference Implementation

Look at the [`demo-app`](https://github.com/Rayos-Org/demo-app) for a complete, production-quality integration:

- [`lib/sdk-client.ts`](https://github.com/Rayos-Org/demo-app/blob/main/lib/sdk-client.ts) — SDK initialization
- [`components/CheckoutFlow.tsx`](https://github.com/Rayos-Org/demo-app/blob/main/components/CheckoutFlow.tsx) — Sign & submit in a React component
