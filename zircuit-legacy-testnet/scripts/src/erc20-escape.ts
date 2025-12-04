import * as ethers from "ethers";
import L2OutputOracleABI from "./L2OutputOracle.json";
import L1StandardBridgeABI from "./L1StandardBridge.json";
import { config, validateERC20Config } from "./config";

// Helper function to strip leading zeros from hex strings
function stripHexLeadingZeros(hex: string): string {
    // Remove 0x prefix, strip leading zeros, add 0x back
    const stripped = hex.replace(/^0x0+/, '0x');
    // Handle the case where the number is just 0
    return stripped === '0x' ? '0x0' : stripped;
}

async function escapeERC20(): Promise<void> {
    validateERC20Config(config);

    const l1Provider = new ethers.providers.JsonRpcProvider(config.l1ProviderUrl);
    const l2Provider = new ethers.providers.JsonRpcProvider(config.l2ProviderUrl);

    const L2OutputOracleContract = new ethers.Contract(
        config.l2OutputOracleAddress, 
        L2OutputOracleABI, 
        l1Provider
    );
    const L1StandardBridgeContract = new ethers.Contract(
        config.l1StandardBridgeAddress!, 
        L1StandardBridgeABI, 
        l1Provider
    );

    // Fetch the most recent output root published 
    const latestOutputIndex = await L2OutputOracleContract.latestOutputIndex();
    const latestOutput = await L2OutputOracleContract.getL2Output(latestOutputIndex);
    let l2OutputBlockNumber = latestOutput.l2BlockNumber;

    // Obtain the arguments required to verify the state root of the L2 against the output root that was published in the L2OutputOracle
    const l2Block = await l2Provider.send('eth_getBlockByNumber', [stripHexLeadingZeros(l2OutputBlockNumber.toHexString()), false]);

    let messagePasserStorageRoot = (await l2Provider.send('eth_getProof', [
        config.l2ToL1MessagePasserAddress,
        [],
        stripHexLeadingZeros(l2OutputBlockNumber.toHexString())
    ])).storageHash;

    let outputRoot = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode([ "uint", "uint","uint","uint"],["0x0",l2Block.stateRoot,messagePasserStorageRoot,l2Block.hash]));
    if (outputRoot !== latestOutput.outputRoot) {
        throw new Error("Roots do not match!");
    }

    // Determine the storage slot where the user balance was stored in the L2 ERC20
    const UserERC20BalanceStorageSlot = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["uint","uint"],[config.accountForEscapeAddress,0]));

    // Get merkle proof of the ERC20 L2 account state and merkle proof of user balance
    let ERC20AccountProof = await l2Provider.send('eth_getProof', [
        config.l2ERC20ForEscape!,
        [UserERC20BalanceStorageSlot],
        stripHexLeadingZeros(l2OutputBlockNumber.toHexString())
    ]);

    let escapeTx = await L1StandardBridgeContract.populateTransaction.escapeERC20(
        config.l1ERC20ForEscape!,
        config.l2ERC20ForEscape!,
        {
            version: ethers.constants.HashZero,
            stateRoot: l2Block.stateRoot,
            messagePasserStorageRoot: messagePasserStorageRoot,
            latestBlockhash: l2Block.hash
        },
        {
            nonce: ERC20AccountProof.nonce,
            balance: ERC20AccountProof.balance,
            storageRoot: ERC20AccountProof.storageHash,
            codeHash: ERC20AccountProof.keccakCodeHash,
        },
        ERC20AccountProof.accountProof,
        ERC20AccountProof.storageProof[0].value,
        ERC20AccountProof.storageProof[0].proof
    );

    console.log("Transaction data:", JSON.stringify(escapeTx, null, 2));
}

// Execute if this file is run directly
if (require.main === module) {
    escapeERC20()
        .then(() => {
            process.exit(0);
        })
        .catch((error) => {
            console.error("Error:", error);
            process.exit(1);
        });
}

export { escapeERC20 }; 
