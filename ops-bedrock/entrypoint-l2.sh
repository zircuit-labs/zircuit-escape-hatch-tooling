#!/bin/sh
set -exu

VERBOSITY=${GETH_VERBOSITY:-3}
GETH_DATA_DIR=/db
GETH_CHAINDATA_DIR="$GETH_DATA_DIR/geth/chaindata"
RPC_PORT="${RPC_PORT:-8545}"
WS_PORT="${WS_PORT:-8546}"
CONFIG_FILE_PATH="/config/gethconfig.toml"
GETH_TXPOOL_GLOBALQUEUE="${GETH_TXPOOL_GLOBALQUEUE:-1024}"

# Check if the config file exists and set the CONFIG_FLAG accordingly
CONFIG_FLAG=""
if [ -f "$CONFIG_FILE_PATH" ]; then
  CONFIG_FLAG="--config=$CONFIG_FILE_PATH"
fi

# Warning: Archive mode is required, otherwise old trie nodes will be
# pruned within minutes of starting the devnet.

exec geth \
	--datadir="$GETH_DATA_DIR" \
	--verbosity="$VERBOSITY" \
	--http \
	--http.corsdomain="*" \
	--http.vhosts="*" \
	--http.addr=0.0.0.0 \
	--http.port="$RPC_PORT" \
	--http.api=web3,debug,eth,txpool,net,engine,admin \
	--ws \
	--ws.addr=0.0.0.0 \
	--ws.port="$WS_PORT" \
	--ws.origins="*" \
	--ws.api=debug,eth,txpool,net,engine,admin \
	--syncmode=full \
	--nodiscover \
	--maxpeers=0 \
	--rpc.allow-unprotected-txs \
	--rpc.txfeecap 10 \
	--gcmode=archive \
	--metrics \
	--metrics.addr=0.0.0.0 \
	--metrics.port=6060 \
	--circuit-capacity-check="false" \
	--circuit-capacity-check-deposit="false" \
	--log.format="terminal" \
	--txpool.globalqueue="$GETH_TXPOOL_GLOBALQUEUE" \
	${CONFIG_FLAG} \
	"$@"
