# Zircuit Escape Hatch Tooling

*Note: this currently applies only to the Zircuit Legacy testnet which was deprecated in June 2025.*

## Setup - Legacy Testnet (Deprecated June 2025)

Follow the intructions in ´zircuit-legacy-testnet´ folder.

## Setup - Zircuit Mainnet and Garfield Testnet

Change the network in ´zircuit/ops-bedrock/docker-compose.yml`, use ´testnet´ for Zircuit Garfield, and ´mainnet´ for Zircuit Mainnet.
Follow the instructions in ´zircuit´folder.

## Usage

Escape hatch functionality for the Legacy Testnet is active 5 days after the last state root was posted on Sepolia, and 30 days for Zircuit Garfield and Zircuit Mainnet.

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

