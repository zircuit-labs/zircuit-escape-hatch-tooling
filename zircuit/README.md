# Zircuit Escape Hatch Tooling

## Setup

1. **Download chaindata snapshot:**
   Snapshots for both Zircuit Garfield Testnet and Zircuit Mainnet can be found [here](https://zircuit-snapshot.liquify.com), and the download can be performed in the following manner:
   ```bash
   wget https://zircuit-snapshot.liquify.com/files/mainnet/zircuit-mainnet-22452793-2025-12-04.tar.lz4
   ```
   *(Note: This file is ~500GB compressed and requires ~1TB of disk space when extracted)*

2. **Extract chaindata:**
   ```bash
   nohup tar -xzf zircuit-mainnet-22452793-2025-12-04.tar.lz4 &
   ```

3. **Move chaindata to correct path:**
   ```bash
   mv chaindata/ zircuit/ops-bedrock/_data/
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
   cd zircuit/scripts
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
