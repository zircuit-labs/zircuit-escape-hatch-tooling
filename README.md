# Zircuit Escape Hatch Tooling

## Setup

1. **Download chaindata** from your source

2. **Copy chaindata to correct path:**
   ```bash
   cp -r _data/* ~/zircuit-escape-hatch-tooling/ops-bedrock/_data
   ```

3. **Start local node:**
   ```bash
   docker compose up -d
   ```

4. **Verify replica is working:**
   ```bash
   cast block-number --rpc-url http://localhost:8545
   ```
   *(requires [Foundry](https://getfoundry.sh/))*

5. **Install dependencies:**
   ```bash
   cd scripts
   yarn install
   ```

6. **Configure addresses in `env.example`:**
   - Contract addresses
   - Network settings  
   - Your escape address

7. **Build project:**
   ```bash
   yarn build
   ```

## Usage

- **ETH escape:** `yarn eth`
- **ERC20 escape:** `yarn erc20` *(configure ERC20 addresses in env.example first)*

Both commands output transaction data for the escape hatch.
