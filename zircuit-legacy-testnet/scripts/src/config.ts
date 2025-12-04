import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from env.example file
dotenv.config({ path: path.resolve(__dirname, '../env.example') });

// Configuration for the escape hatch tooling
// Update values in env.example with your actual deployment addresses and RPC endpoints

export interface EscapeHatchConfig {
    accountForEscapeAddress: string;
    l1ProviderUrl: string;
    l2ProviderUrl: string;
    l2OutputOracleAddress: string;
    optimismPortalAddress: string;
    l2ToL1MessagePasserAddress: string;
    // ERC20-specific fields
    l1StandardBridgeAddress?: string;
    l1ERC20ForEscape?: string;
    l2ERC20ForEscape?: string;
}

export const config: EscapeHatchConfig = {
    // Values loaded from env.example
    accountForEscapeAddress: process.env.ESCAPE_ADDRESS || "<EOA ADDRESS>",
    l1ProviderUrl: process.env.L1_RPC_URL || "<L1 PROVIDER>",
    l2ProviderUrl: process.env.L2_RPC_URL || "<L2 PROVIDER>",
    l2OutputOracleAddress: process.env.L2_OUTPUT_ORACLE_ADDRESS || "<L2OutputOracle ADDRESS>",
    optimismPortalAddress: process.env.OPTIMISM_PORTAL_ADDRESS || "<OptimismPortal ADDRESS>",    
    l2ToL1MessagePasserAddress: "0x4200000000000000000000000000000000000016",
    l1StandardBridgeAddress: process.env.L1_STANDARD_BRIDGE_ADDRESS || "<L1StandardBridge ADDRESS>",
    l1ERC20ForEscape: process.env.L1_ERC20_ADDRESS || "<ADDRESS OF ERC20 ON L1>",
    l2ERC20ForEscape: process.env.L2_ERC20_ADDRESS || "<ADDRESS OF ERC20 ON L2>"
};

// Validation function to ensure all required config is provided for ETH escaping
export function validateConfig(cfg: EscapeHatchConfig): void {
    const requiredFields = [
        'accountForEscapeAddress',
        'l1ProviderUrl',
        'l2ProviderUrl',
        'l2OutputOracleAddress',
        'optimismPortalAddress'
    ];

    for (const field of requiredFields) {
        const value = cfg[field as keyof EscapeHatchConfig];
        if (!value || value.includes('<') || value.includes('>')) {
            throw new Error(`Configuration error: ${field} must be set to a valid value in env.example. Current value: ${value}`);
        }
    }
}

// Validation function to ensure all required config is provided for ERC20 escaping
export function validateERC20Config(cfg: EscapeHatchConfig): void {
    const requiredFields = [
        'accountForEscapeAddress',
        'l1ProviderUrl',
        'l2ProviderUrl',
        'l2OutputOracleAddress',
        'l1StandardBridgeAddress',
        'l1ERC20ForEscape',
        'l2ERC20ForEscape'
    ];

    for (const field of requiredFields) {
        const value = cfg[field as keyof EscapeHatchConfig];
        if (!value || value.includes('<') || value.includes('>')) {
            throw new Error(`Configuration error: ${field} must be set to a valid value in env.example. Current value: ${value}`);
        }
    }
} 
