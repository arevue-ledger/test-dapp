// Contracts for Malicious Transactions in different chains
export const NETWORKS_BY_CHAIN_ID = {
  1: 'mainnet',
  137: 'polygon',
  10: 'optimism',
  56: 'bsc',
  43114: 'avalanche',
  42161: 'arbitrum',
  11155111: 'sepolia',
  8453: 'base',
  204: 'opBnb',
};

export const ERC20_SAMPLE_CONTRACTS = {
  mainnet: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
  polygon: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
  optimism: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  bsc: '0x8965349fb649A33a30cbFDa057D8eC2C48AbE2A2',
  avalanche: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
  arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  sepolia: '0x27A56df30bC838BCA36141E517e7b5376dea68eE',
  base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  opBnb: '0x9e5aac1ba1a2e6aed6b32689dfcf62a509ca96f3',
};

export const ERC721_SAMPLE_CONTRACTS = {
  polygon: '0x9e8ea82e76262e957d4cc24e04857a34b0d8f062',
  optimism: '0xaf18644083151cf57f914cccc23c42a1892c218e',
  bsc: '0xebfbfd7c41b123500fb16b71c43b400c12b08be0',
  avalanche: '0x880f7e04D722e305126F7E1efd3434A7d5b1465c',
  arbitrum: '0x8659a4876369b94515a86048fe7f99daba6b9a7d',
  sepolia: '0xbba60aa8144579e07c6db64121b0f608ab6f0c89',
  base: '0x90997fc967e75b7e69f899133aab31d197beb802',
  opBnb: '0x61d7e121185b1d7902a3da7f3c8ac9faaee8863b',
};

export const MALICIOUS_CONTRACT_ADDRESSES = {
  mainnet: '0x000062Accd1a9d62eF428eC86cA3dD4f45120000',
  default: '0x00008F1149168C1D2fa1eBa1Ad3e9cD644510000',
};

export const BENIGN_CONTRACT_ADDRESSES = {
  aave: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
  // aave: '0x794a6135b1614E7542e724526748a131aB150479',0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2
  oneinch: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
  paraswap: '0xdef1c0ded9bec7f1a1670819833240f027b25eff',
  quickswap: '0x5c69bEe701ef814a2B6a3EDD4B165e158b0f0022',
  opensea: '0x00000000006c3852cbEf3e08E8dF289169EdE581',
};
