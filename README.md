# Zircuit Escape Hatch Tooling

*Note: this currently applies only to the Zircuit Legacy testnet which was deprecated in June 2025.*

## Setup - Legacy Testnet (Deprecated June 2025)

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

Escape hatch functionality for the Legacy Testnet is active 5 days after the last state root was posted on Sepolia.

- **ETH escape:** `yarn eth`
- **ERC20 escape:** `yarn erc20` *(configure ERC20 addresses in env.example first)*

Both commands output transaction data for the escape hatch.

## Execute Transaction

Once you have the transaction data from the above commands, execute it on Sepolia:

```bash
cast send [to_address] "tx_data" --rpc-url [sepolia_rpc] --private-key YOUR_PRIVATE_KEY
```

Replace:
- `[to_address]` with the target contract address
- `"tx_data"` with the output from `yarn eth` or `yarn erc20`
- `YOUR_PRIVATE_KEY` with your escaping account's private key

