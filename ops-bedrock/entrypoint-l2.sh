#!/bin/sh
set -exu

exec geth \
	--datadir="/db" \
	--http \
	--http.addr=0.0.0.0 \
	--http.api=web3,debug,eth,net \
	--syncmode=full \
	--nodiscover \
	--maxpeers=0 \
	--gcmode=archive \
	--networkid=48899 \
	--offline \
	"$@"
