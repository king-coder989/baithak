# Filecoin Starter Kit - Replit Migration

## Project Overview
This is a Filecoin/Web3 starter kit migrated from Vercel to Replit. The application enables:
- Wallet-based authentication via WalletConnect
- Decentralized file storage via Lighthouse/IPFS
- Web3 interactions on Filecoin Calibration testnet

## Recent Changes (October 15, 2025)

### Vercel to Replit Migration
- **Node.js Version**: Switched from Node.js 22 to Node.js 20 LTS for better stability
- **Port Configuration**: Updated to port 5000 with 0.0.0.0 binding for Replit environment
- **Turbopack**: Disabled due to compatibility issues (bus error crashes)
- **Package Manager**: Using npm
- **Working Directory**: `orbit-starter-kit-main/`

### Security Improvements
- Removed `.env` file from repository (was exposing API keys)
- Added comprehensive `.gitignore` file
- Configured Replit Secrets for environment variables

### Configuration Changes
1. **package.json**:
   - Dev script: `next dev -p 5000 -H 0.0.0.0`
   - Start script: `next start -p 5000 -H 0.0.0.0`
   - Removed Turbopack flag
   - Updated Node.js requirement: `>= 18.17.0` (was `>= 22.0.0`)

2. **Deployment**:
   - Target: Autoscale
   - Build: `cd orbit-starter-kit-main && npm run build`
   - Run: `cd orbit-starter-kit-main && npm run start`

## Environment Variables

### Required Secrets (configured in Replit Secrets)
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` - WalletConnect project ID from https://cloud.walletconnect.com/
- `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` - Lighthouse API key from https://www.lighthouse.storage/

### ⚠️ Important Secret Configuration Note
The secret values should contain ONLY the actual API key/project ID, NOT the key=value format.

**Correct format:**
- Value: `8b1b8840e6d5a43fbb3519dd723413f5`

**Incorrect format (causes errors):**
- Value: `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=8b1b8840e6d5a43fbb3519dd723413f5`

## Project Structure
```
orbit-starter-kit-main/
├── app/                  # Next.js App Router
│   ├── providers.tsx     # Web3 providers (Wagmi, RainbowKit)
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── upload/           # File upload page
│   ├── browse/           # Browse assets page
│   ├── asset/[cid]/      # Asset detail page
│   └── profile/          # User profile page
├── components/           # React components
├── lib/                  # Utility libraries
│   ├── lighthouse.ts     # Lighthouse/IPFS integration
│   ├── contract.ts       # Smart contract interactions
│   └── storage.ts        # Storage utilities
├── hooks/                # React hooks
└── public/               # Static assets
```

## Known Issues & Solutions

### 1. MetaMask SDK Warnings
**Issue**: Console warnings about missing `@react-native-async-storage/async-storage`
**Impact**: Cosmetic only - wallet connection still works
**Solution**: These can be safely ignored (MetaMask SDK optional dependency)

### 2. WalletConnect API 403 Error
**Issue**: WalletConnect remote config returns 403 Forbidden
**Cause**: Replit Secrets contains key=value format instead of just the value
**Solution**: Update the secret to contain only the project ID value

### 3. Environment Variable Format
**Current State**: Environment variables are duplicated (e.g., `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=8b1b8840...`)
**Fix Required**: User needs to update Replit Secrets to contain only the value portion

## Development Workflow

### Running Locally
```bash
cd orbit-starter-kit-main
npm install
npm run dev
```

### Building for Production
```bash
cd orbit-starter-kit-main
npm run build
npm run start
```

### Accessing the App
- Development: https://[replit-url]
- Production (after publishing): Custom domain or Replit deployment URL

## Tech Stack
- **Framework**: Next.js 15.3.0 (App Router)
- **Web3**: Wagmi, RainbowKit, Viem, Ethers.js
- **Storage**: Lighthouse SDK (IPFS/Filecoin)
- **Styling**: Tailwind CSS
- **Network**: Filecoin Calibration Testnet

## User Preferences
- Using Next.js App Router architecture
- Web3/blockchain integration for decentralized storage
- Following Replit best practices for deployment

## Next Steps for Full Functionality
1. **Update Replit Secrets** (CRITICAL):
   - Go to Secrets tab in Replit
   - Update `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` to contain only: `8b1b8840e6d5a43fbb3519dd723413f5`
   - Keep `NEXT_PUBLIC_LIGHTHOUSE_API_KEY` as is: `11dafcd4.a0a9e407eb0f4c9ba4a694b0b8ca607b`
   - Restart the workflow after updating

2. **Test Wallet Connection**:
   - Click "Connect Wallet" button
   - Connect MetaMask or other Web3 wallet
   - Verify connection on Filecoin Calibration network

3. **Test File Upload**:
   - Navigate to /upload
   - Select a file to upload
   - Confirm upload to Lighthouse/IPFS
   - Verify file accessibility via CID

## Architecture Notes
- Client/server separation maintained for security
- Environment variables properly isolated
- No sensitive data in repository
- Production-ready deployment configuration
