# Zircuit Escape Hatch Tooling

## Setup

1. **Download testnet chaindata snapshot:**
   ```bash
   wget https://chaindata-testnet.s3.us-east-2.amazonaws.com/public/replica1-snapshot-2025-06-19.tar.gz
   ```
   *(Note: This file is ~500GB compressed and requires ~1TB of disk space when extracted)*

2. **Extract chaindata:**
   ```bash
   nohup tar -xzf replica1-snapshot-2025-06-19.tar.gz &
   ```

3. **Move chaindata to correct path:**
   ```bash
   mv chaindata/ ops-bedrock/_data/
   ```

4. **Start local node:**
   ```bash
   docker compose up -d
   ```

5. **Verify replica is working:**
   ```bash
   cast block-number --rpc-url http://localhost:8545
   ```
   *(requires [Foundry](https://getfoundry.sh/))*

6. **Install dependencies:**
   ```bash
   cd scripts
   yarn install
   ```

7. **Configure addresses in `env.example`:**
   - Contract addresses
   - Network settings  
   - Your escape address

8. **Build project:**
   ```bash
   yarn build
   ```

## Usage

- **ETH escape:** `yarn eth`
- **ERC20 escape:** `yarn erc20` *(configure ERC20 addresses in env.example first)*

Both commands output transaction data for the escape hatch.
