import globalContext from '../..';
import { maliciousAddress } from '../../sample-addresses';
import {
  ERC20_SAMPLE_CONTRACTS,
  ERC721_SAMPLE_CONTRACTS,
  MALICIOUS_CONTRACT_ADDRESSES,
  BENIGN_CONTRACT_ADDRESSES,
  NETWORKS_BY_CHAIN_ID,
} from '../../onchain-sample-contracts';

import { isBaseNetworkId, isSepoliaNetworkId } from '../../utils';

// Fonctions utilitaires pour les transactions
const transactionUtils = {
  async sendTransaction(params) {
    try {
      const result = await globalContext.provider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: globalContext.accounts[0],
            ...params,
          },
        ],
      });
      return result;
    } catch (error) {
      return error;
    }
  },

  async signTypedData(data) {
    try {
      const result = await globalContext.provider.request({
        method: 'eth_signTypedData_v4',
        params: [globalContext.accounts[0], data],
      });
      return result;
    } catch (error) {
      return error;
    }
  },

  getContractAddress(networkName, contractType) {
    const contractMap = {
      erc20: ERC20_SAMPLE_CONTRACTS,
      erc721: ERC721_SAMPLE_CONTRACTS,
      malicious: MALICIOUS_CONTRACT_ADDRESSES,
      benign: BENIGN_CONTRACT_ADDRESSES,
    };
    return (
      contractMap[contractType][networkName] ||
      contractMap[contractType].default
    );
  },
};

// Configuration des boutons
const buttonConfigs = {
  maliciousRawEth: {
    id: 'maliciousRawEthButton',
    title: 'Malicious Eth Transfer',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    comments: '(0.00001 ETH)',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: maliciousAddress,
        value: '0x9184e72a000',
      }),
  },
  mintSepoliaERC20: {
    id: 'mintSepoliaERC20',
    title: 'Mint ERC20',
    hidden: true,
    onClick: () => {
      const from = globalContext.accounts[0];
      const noPrefixedAddress = from.slice(2);
      return transactionUtils.sendTransaction({
        to: '0x27A56df30bC838BCA36141E517e7b5376dea68eE',
        value: '0x0',
        data: `0x40c10f19000000000000000000000000${noPrefixedAddress}000000000000000000000000000000000000000000000000000000001dcd6500`,
      });
    },
  },
  maliciousERC20Transfer: {
    id: 'maliciousERC20TransferButton',
    title: 'Malicious ERC20 Transfer (USDC)',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    comments: '',
    tooltip: 'This will only be flagged if you have some ERC20 balance',
    onClick: () =>
      transactionUtils.sendTransaction({
        // from: globalContext.accounts[0],
        /*
        to: transactionUtils.getContractAddress(
          globalContext.networkName,
          'erc20',
        ),
        */
        to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        data: '0xa9059cbb0000000000000000000000005fbdb2315678afecb367f032d93f642f64180aa30000000000000000000000000000000000000000000000000000000000000064',
      }),
  },
  maliciousApproval: {
    id: 'maliciousApprovalButton',
    title: 'Malicious ERC20 Approval (BUSD)',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    comments: '',
    onClick: () => {
      transactionUtils.sendTransaction({
        to: transactionUtils.getContractAddress(
          globalContext.networkName,
          'erc20',
        ),
        data: '0x095ea7b3000000000000000000000000e50a2dbc466d01a34c3e8b7e8e45fce4f7da39e6000000000000000000000000000000000000000000000000ffffffffffffffff',
      });
    },
  },

  maliciousContractInteraction: {
    id: 'maliciousContractInteractionButton',
    title: 'Malicious Contract Interaction',
    signing: 'Blind Signing',
    riskLevel: 'Threat',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: transactionUtils.getContractAddress(
          globalContext.networkName,
          'malicious',
        ),
        data: '0xef5cfb8c0000000000000000000000000b3e87a076ac4b0d1975f0f232444af6deb96c59',
        value: '0x0',
      }),
  },
  maliciousSetApprovalForAll: {
    id: 'maliciousSetApprovalForAll',
    title: 'Malicious Set Approval For All',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    onClick: () =>
      transactionUtils.sendTransaction(
        /*
      let erc721Contract;
      if (globalContext.networkName) {
        erc721Contract = ERC721_SAMPLE_CONTRACTS[globalContext.networkName];
      } else {
        erc721Contract = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
      }
      */
        {
          // to: transactionUtils.getContractAddress(globalContext.networkName, 'erc721'),
          to: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
          data: '0xa22cb465000000000000000000000000b85492afc686d5ca405e3cd4f50b05d358c75ede0000000000000000000000000000000000000000000000000000000000000001',
          gas: '0x1116b',
          maxFeePerGas: '0x29b92700',
          maxPriorityFeePerGas: '0x29b92700',
          nonce: '0x3f',
        },
      ),
  },
  /*
{
    "chainId": 1,
    "from": "0x6535d5f76f021fe65e2ac73d086df4b4bd7ee5d9",
    "to": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    "data": "0xa22cb465000000000000000000000000b85492afc686d5ca405e3cd4f50b05d358c75ede0000000000000000000000000000000000000000000000000000000000000001",
    "gas": "0x1116b",
    "maxFeePerGas": "0x29b92700",
    "maxPriorityFeePerGas": "0x29b92700",
    "nonce": "0x3f"
}
*/

  maliciousPermit: {
    id: 'maliciousPermit',
    title: 'Malicious Permit',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    onClick: () =>
      transactionUtils.signTypedData(
        `{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Permit":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},{"name":"value","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"deadline","type":"uint256"}]},"primaryType":"Permit","domain":{"name":"USD Coin","verifyingContract":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","chainId":${globalContext.chainIdInt},"version":"2"},"message":{"owner":"${globalContext.accounts[0]}","spender":"0x1661F1B207629e4F385DA89cFF535C8E5Eb23Ee3","value":"1033366316628","nonce":1,"deadline":1678709555}}`,
      ),
  },
  maliciousTradeOrder: {
    id: 'maliciousTradeOrder',
    title: 'Malicious Trade Order',
    signing: 'Blind Signing',
    riskLevel: 'Threat',
    comments: '!!! Detected with Metamask (A known malicious address is involved in the transaction), not Rabby',
    onClick: () =>
      transactionUtils.signTypedData(
        `{"types":{"ERC721Order":[{"type":"uint8","name":"direction"},{"type":"address","name":"maker"},{"type":"address","name":"taker"},{"type":"uint256","name":"expiry"},{"type":"uint256","name":"nonce"},{"type":"address","name":"erc20Token"},{"type":"uint256","name":"erc20TokenAmount"},{"type":"Fee[]","name":"fees"},{"type":"address","name":"erc721Token"},{"type":"uint256","name":"erc721TokenId"},{"type":"Property[]","name":"erc721TokenProperties"}],"Fee":[{"type":"address","name":"recipient"},{"type":"uint256","name":"amount"},{"type":"bytes","name":"feeData"}],"Property":[{"type":"address","name":"propertyValidator"},{"type":"bytes","name":"propertyData"}],"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}]},"domain":{"name":"ZeroEx","version":"1.0.0","chainId":"${globalContext.chainIdInt}","verifyingContract":"0xdef1c0ded9bec7f1a1670819833240f027b25eff"},"primaryType":"ERC721Order","message":{"direction":"0","maker":"${globalContext.accounts[0]}","taker":"${maliciousAddress}","expiry":"2524604400","nonce":"100131415900000000000000000000000000000083840314483690155566137712510085002484","erc20Token":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","erc20TokenAmount":"42000000000000","fees":[],"erc721Token":"0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e","erc721TokenId":"2516","erc721TokenProperties":[]}}`,
      ),
  },
  maliciousSeaport: {
    id: 'maliciousSeaport',
    title: 'Malicious Seaport',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    onClick: () =>
      transactionUtils.signTypedData(
        `{"types":{"OrderComponents":[{"name":"offerer","type":"address"},{"name":"zone","type":"address"},{"name":"offer","type":"OfferItem[]"},{"name":"consideration","type":"ConsiderationItem[]"},{"name":"orderType","type":"uint8"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"zoneHash","type":"bytes32"},{"name":"salt","type":"uint256"},{"name":"conduitKey","type":"bytes32"},{"name":"counter","type":"uint256"}],"OfferItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"}],"ConsiderationItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"},{"name":"recipient","type":"address"}],"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}]},"domain":{"name":"Seaport","version":"1.1","chainId":${globalContext.chainIdInt},"verifyingContract":"0x00000000006c3852cbef3e08e8df289169ede581"},"primaryType":"OrderComponents","message":{"offerer":"0x5a6f5477bdeb7801ba137a9f0dc39c0599bac994","zone":"0x004c00500000ad104d7dbd00e3ae0a5c00560c00","offer":[{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"26464","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"7779","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"4770","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"9594","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"2118","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"1753","startAmount":"1","endAmount":"1"}],"consideration":[{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"26464","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"7779","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"4770","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"9594","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"2118","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"1753","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"}],"orderType":"2","startTime":"1681810415","endTime":"1681983215","zoneHash":"0x0000000000000000000000000000000000000000000000000000000000000000","salt":"1550213294656772168494388599483486699884316127427085531712538817979596","conduitKey":"0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000","counter":"0"}}`,
      ),
  },
  // AAVE
  benignAaveSupply: {
    id: 'benignAaveSupply',
    title: 'Benign Aave Supply',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        // to: transactionUtils.getContractAddress(globalContext.networkName, 'malicious'),
        to: BENIGN_CONTRACT_ADDRESSES.aave,
        data: '0x617ba037000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000001c9c3800000000000000000000000006535d5f76f021fe65e2ac73d086df4b4bd7ee5d90000000000000000000000000000000000000000000000000000000000000000',
      }),
  },
  benignAaveBorrow: {
    id: 'benignAaveBorrow',
    title: 'Benign Aave Borrow',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: BENIGN_CONTRACT_ADDRESSES.aave,
        data: '0xa415bcad0000000000000000000000007f39c581f595b53c5cb19bd0b3f8da6c935e2ca000000000000000000000000000000000000000000000000000038d7ea4c68000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000006535d5f76f021fe65e2ac73d086df4b4bd7ee5d9',
        value: '0x0',
        gas: '0x8043b',
        maxFeePerGas: '0x2faf0800',
        maxPriorityFeePerGas: '0x2faf0800',
        nonce: '0x3f',
      }),
  },

  benignAaveWithdraw: {
    id: 'benignAaveWithdraw',
    title: 'Benign Aave Withdraw',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: BENIGN_CONTRACT_ADDRESSES.aave,
        data: '0x69328dec000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000006535d5f76f021fe65e2ac73d086df4b4bd7ee5d9',
        value: '0x0',
        gas: '0x8043b',
        maxFeePerGas: '0x2faf0800',
        maxPriorityFeePerGas: '0x2faf0800',
        nonce: '0x3f',
      }),
  },
  benignAavePermitStaking: {
    id: 'benignAavePermitStaking',
    title: 'Benign Aave Permit (Staking)',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.signTypedData(
        `{ "types": { "EIP712Domain": [ { "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "address" } ], "Permit": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "deadline", "type": "uint256" } ] }, "primaryType": "Permit", "domain": { "name": "Aave token V3", "version": "2", "chainId": "${globalContext.chainIdInt}", "verifyingContract": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9" }, "message": { "owner": "0x6535d5f76f021fe65e2ac73d086df4b4bd7ee5d9", "spender": "0x4da27a545c0c5b758a6ba100e3a049001de870f5", "value": "100000000000000000", "nonce": "0", "deadline": "1732787332" } }`,
      ),
  },
  benignAaveStaking: {
    id: 'benignAaveStaking',
    title: 'Benign Aave Staking',
    signing: 'Blind Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: BENIGN_CONTRACT_ADDRESSES.aave,
        data: '0xecd9ba82000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000000000000067483c84000000000000000000000000000000000000000000000000000000000000001cb713bafe29aa71b13b7296f108808f51afa0ba8bcfe1cf0ad375e1d061f873a06407be64d853d33fc16991f4b53a11f0c5ca21d4e0ecce915ec49e9b0eb93cc3',
        value: '0x0',
        gas: '0x2c38e',
        maxFeePerGas: '0x4190ab00',
        maxPriorityFeePerGas: '0x4190ab00',
        nonce: '0x3f',
      }),
  },
  // 1INCH
  benign1InchClassicSwap: {
    id: 'benign1InchClassicSwap',
    title: 'Benign 1Inch Classic Swap',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        // to: transactionUtils.getContractAddress(globalContext.networkName, 'malicious'),
        to: '0x111111125421ca6dc452d289314280a0f8842a65',
        data: '0xd2d374e5000000000000000000000000655edce464cc797526600a462a8154650eee4b77000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000034f36fb00000000000000000000000000000000000000000000000000000000034f36fb000000000000005e97facaf5000000000000003b3fb01f8609c409c467dca52560f830342688ccb20bd1048deb6cd8cf3993307b9702fe13c4ee283cce770bdbcf43a96693b198a29bfe945b764a0bc1fcafdfd678b8df4dd6db6a1d061ff574e26b9977',
        value: '0x0',
        gas: '0x2c38e',
        maxFeePerGas: '0x4190ab00',
        maxPriorityFeePerGas: '0x4190ab00',
        nonce: '0x3f',
      }),
  },

  malicious1InchClassicSwap: {
    id: 'malicious1InchClassicSwap',
    title: 'Malicious 1Inch Classic Swap',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    onClick: () =>
      transactionUtils.sendTransaction({
        // to: transactionUtils.getContractAddress(globalContext.networkName, 'malicious'),
        to: '0x111111125421ca6dc452d289314280a0f8842a65',
        data: '0xc4d652af000000000000000000000000655edce464cc797526600a462a8154650eee4b770000000000000000000000000fa09c3a328792253f8dee7116848723b72a6d2e000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000034f36fb00000000000000000000000000000000000000000000000000000000034f36fb000000000000005f2cea620b000000000000003b3fb01f8609c409c467dca3cd0393dc979d3a13a33006093d972ce054760adf8c216d72200054dca990ab8aa649f86b0f3a7c9fd1811cdd304ad1e437bda4aa117dbb4e72de714fff9f753db8e26b9977',
        value: '0x0',
        gas: '0x2c38e',
        maxFeePerGas: '0x4190ab00',
        maxPriorityFeePerGas: '0x4190ab00',
        nonce: '0x3f',
      }),
  },

  malicious1InchOrder: {
    id: 'malicious1InchOrder',
    title: 'Malicious 1Inch Order',
    signing: 'Clear Signing',
    riskLevel: 'Threat',
    onClick: () =>
      transactionUtils.signTypedData(`{
    "primaryType": "Order",
    "types": {
        "EIP712Domain": [
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "version",
                "type": "string"
            },
            {
                "name": "chainId",
                "type": "uint256"
            },
            {
                "name": "verifyingContract",
                "type": "address"
            }
        ],
        "Order": [
            {
                "name": "salt",
                "type": "uint256"
            },
            {
                "name": "maker",
                "type": "address"
            },
            {
                "name": "receiver",
                "type": "address"
            },
            {
                "name": "makerAsset",
                "type": "address"
            },
            {
                "name": "takerAsset",
                "type": "address"
            },
            {
                "name": "makingAmount",
                "type": "uint256"
            },
            {
                "name": "takingAmount",
                "type": "uint256"
            },
            {
                "name": "makerTraits",
                "type": "uint256"
            }
        ]
    },
    "domain": {
        "name": "1inch Aggregation Router",
        "version": "6",
        "chainId": 1,
        "verifyingContract": "0x111111125421ca6dc452d289314280a0f8842a65"
    },
    "message": {
        "maker": "0x6535d5f76f021fe65e2ac73d086df4b4bd7ee5d9",
        "makerAsset": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "takerAsset": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "makerTraits": "62419173104490761595518734106350460423737843278013141091896793745170907529216",
        "salt": "102412815616154893501306849590120450259292503969437846241830792407351257425192",
        "makingAmount": "55523067",
        "takingAmount": "54730145",
        "receiver": "0x0fa09c3a328792253f8dee7116848723b72a6d2e"
    }
  }`),
  },

  maliciousSafeMessage: {
    id: 'maliciousSafeMessage',
    title: 'Malicious Safe Message',
    onClick: () =>
      transactionUtils.signTypedData(
        `{   "types": {     "SafeTx": [       {         "type": "address",         "name": "to"       },       {         "type": "uint256",         "name": "value"       },       {         "type": "bytes",         "name": "data"       },       {         "type": "uint8",         "name": "operation"       },       {         "type": "uint256",         "name": "safeTxGas"       },       {         "type": "uint256",         "name": "baseGas"       },       {         "type": "uint256",         "name": "gasPrice"       },       {         "type": "address",         "name": "gasToken"       },       {         "type": "address",         "name": "refundReceiver"       },       {         "type": "uint256",         "name": "nonce"       }     ],     "EIP712Domain": [       {         "name": "chainId",         "type": "uint256"       },       {         "name": "verifyingContract",         "type": "address"       }     ]   },   "domain": {     "chainId": ${globalContext.chainIdInt},     "verifyingContract": "0x1Db92e2EeBC8E0c075a02BeA49a2935BcD2dFCF4"   },   "primaryType": "SafeTx",   "message": {     "to": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",     "value": "0",     "data": "0x6a76120200000000000000000000000096221423681a6d52e184d440a8efcebb105c7242000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000b2b2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000bdd077f651ebe7f7b3ce16fe5f2b025be296951600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c3d0afef78a52fd504479dc2af3dc401334762cbd05609c7ac18db9ec5abf4a07a5cc09fc86efd3489707b89b0c729faed616459189cb50084f208d03b201b001f1f0f62ad358d6b319d3c1221d44456080068fe02ae5b1a39b4afb1e6721ca7f9903ac523a801533f265231cd35fc2dfddc3bd9a9563b51315cf9d5ff23dc6d2c221fdf9e4b878877a8dbeee951a4a31ddbf1d3b71e127d5eda44b4730030114baba52e06dd23da37cd2a07a6e84f9950db867374a0f77558f42adf4409bfd569673c1f0000000000000000000000000000000000000000000000000000000000",     "operation": "1",     "safeTxGas": "45746",     "baseGas": "0",     "gasPrice": "0",     "gasToken": "0x0000000000000000000000000000000000000000",     "refundReceiver": "0x0000000000000000000000000000000000000000",     "nonce": "28"   } }`,
      ),
  },

  maliciousOpenseaMessage: {
    id: 'maliciousOpenseaMessage',
    title: 'Malicious Opensea Signature',
    onClick: () =>
      transactionUtils.signTypedData(`{
          "types": {
              "PermitSingle": [
              {
                "name": "details",
                "type": "PermitDetails"
              },
              {
                "name": "spender",
                "type": "address"
              },
              {
                "name": "sigDeadline",
                "type": "uint256"
              }
              ],
              "PermitDetails": [
                {
                  "name": "token",
                  "type": "address"
                },
                {
                  "name": "amount",
                  "type": "uint160"
                },
                {
                  "name": "expiration",
                  "type": "uint48"
                },
                {
                  "name": "nonce",
                  "type": "uint48"
                }
              ],
              "EIP712Domain": [
                {
            "name": "name",
            "type": "string"
                },
                {
            "name": "chainId",
            "type": "uint256"
                },
                {
            "name": "verifyingContract",
            "type": "address"
                }  
              ]
          },
          "domain": {
        "name": "Permit2",
        "chainId": "1",
        "verifyingContract": "0x000000000022d473030f116ddee9f6b43ac78ba3"
          },
          "primaryType": "PermitSingle",
          "message": {
        "details": {
          "token": "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
          "amount": "1461501637330902918203684832716283019655932542975",
          "expiration": "2726145248",
          "nonce": "0"
        },
        "spender": "0x03b49e509e2eb993ad2c304a22a3ec6f8f5572b1",
        "sigDeadline": "2723555048"
      }
        }`),
  },

  maliciousPermit2toEOAMessage: {
    id: 'maliciousPermit2toEOAMessage',
    title: 'Malicious Permit2 USDC to an EOA',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "PermitSingle": [
          {
            "name": "details",
            "type": "PermitDetails"
          },
          {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "sigDeadline",
            "type": "uint256"
          }
        ],
        "PermitDetails": [
          {
            "name": "token",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint160"
          },
          {
            "name": "expiration",
            "type": "uint48"
          },
          {
            "name": "nonce",
            "type": "uint48"
          }
        ],
        "EIP712Domain": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "chainId",
            "type": "uint256"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          }
        ]
      },
      "domain": {
        "name": "Permit2",
        "chainId": 137,
        "verifyingContract": "0x000000000022d473030f116ddee9f6b43ac78ba3"
      },
      "primaryType": "PermitSingle",
      "message": {
        "details": {
          "token": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "amount": "1461501637330902918203684832716283019655932542975",
          "expiration": "281474976710655",
          "nonce": "0"
        },
        "spender": "0xb5e64e857bb7b5350196c5bac8d639cec1072745",
        "sigDeadline": "281474976710655"
      }
    }`),
  },

  maliciousPermit2toSafeMessage: {
    id: 'maliciousPermit2toSafeMessage',
    title: 'Malicious Permit2 USDC to Safe',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "PermitSingle": [
          {
            "name": "details",
            "type": "PermitDetails"
          },
          {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "sigDeadline",
            "type": "uint256"
          }
        ],
        "PermitDetails": [
          {
            "name": "token",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint160"
          },
          {
            "name": "expiration",
            "type": "uint48"
          },
          {
            "name": "nonce",
            "type": "uint48"
          }
        ],
        "EIP712Domain": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "chainId",
            "type": "uint256"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          }
        ]
      },
      "domain": {
        "name": "Permit2",
        "chainId": "137",
        "verifyingContract": "0x000000000022d473030f116ddee9f6b43ac78ba3"
      },
      "primaryType": "PermitSingle",
      "message": {
        "details": {
          "token": "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
          "amount": "1461501637330902918203684832716283019655932542975",
          "expiration": "281474976710655",
          "nonce": "0"
        },
        "spender": "0x7818930b0a0db994d49ce326f5a19a80bca336e2",
        "sigDeadline": "281474976710655"
      }
    }`),
  },
  maliciousTransactionBybit: {
    id: 'maliciousTransactionBybit',
    title: 'Malicious Transaction Bybit',
    signing: 'Blind/Raw Signing',
    riskLevel: 'Threat',
    comments: '!!! EIP-712<. Reason: Overwrites Safe mastercopy - full compromise. No legitimate case. Detection: Delegate call to untrusted address. Not flagged by Metamask nor Rabby.',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "EIP712Domain": [
          {
            "name": "chainId",
            "type": "uint256"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          }
        ],
        "SafeTx": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          },
          {
            "name": "data",
            "type": "bytes"
          },
          {
            "name": "operation",
            "type": "uint8"
          },
          {
            "name": "safeTxGas",
            "type": "uint256"
          },
          {
            "name": "baseGas",
            "type": "uint256"
          },
          {
            "name": "gasPrice",
            "type": "uint256"
          },
          {
            "name": "gasToken",
            "type": "address"
          },
          {
            "name": "refundReceiver",
            "type": "address"
          },
          {
            "name": "nonce",
            "type": "uint256"
          }
        ]
      },
      "domain": {
        "chainId": ${globalContext.chainIdInt},
        "verifyingContract": "0x1Db92e2EeBC8E0c075a02BeA49a2935BcD2dFCF4"
      },
      "primaryType": "SafeTx",
      "message": {
        "to": "0x96221423681A6d52E184D440a8eFCEbB105C7242",
        "value": "0",
        "data": "0xa9059cbb000000000000000000000000bdd077f651ebe7f7b3ce16fe5f2b025be29695160000000000000000000000000000000000000000000000000000000000000000",
        "operation": 1,
        "safeTxGas": "45746",
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": "71"
      }
    }`),
  },

  maliciousWazirXexploit: {
    id: 'maliciousWazirXexploit',
    title: 'Malicious WazirX Exploit',
    signing: 'Blind/Raw Signing',
    riskLevel: 'Threat',
    comments: '!!! EIP-712<. Reason: Overwrites Safe mastercopy - full compromise. No legitimate case. Detection: Delegate call to untrusted address. Not flagged by Metamask nor Rabby.',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "EIP712Domain": [
          {
            "name": "chainId",
            "type": "uint256"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          }
        ],
        "SafeTx": [
          {
            "name": "to",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          },
          {
            "name": "data",
            "type": "bytes"
          },
          {
            "name": "operation",
            "type": "uint8"
          },
          {
            "name": "safeTxGas",
            "type": "uint256"
          },
          {
            "name": "baseGas",
            "type": "uint256"
          },
          {
            "name": "gasPrice",
            "type": "uint256"
          },
          {
            "name": "gasToken",
            "type": "address"
          },
          {
            "name": "refundReceiver",
            "type": "address"
          },
          {
            "name": "nonce",
            "type": "uint256"
          }
        ]
      },
      "domain": {
        "chainId": ${globalContext.chainIdInt},
        "verifyingContract": "0x1Db92e2EeBC8E0c075a02BeA49a2935BcD2dFCF4"
      },
      "primaryType": "SafeTx",
      "message": {
        "to": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
        "value": "0",
        "data": "0xa9059cbb000000000000000000000000bdd077f651ebe7f7b3ce16fe5f2b025be29695160000000000000000000000000000000000000000000000000000000000000000",
        "operation": 1,
        "safeTxGas": "45746",
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": "71"
      }
    }`),
  },
  maliciousERC20approvaltoanEOA: {
    id: 'maliciousERC20approvaltoanEOA',
    title: 'Malicious ERC20 Approval to EOA',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "EIP712Domain": [
          {
            "type": "uint256",
            "name": "chainId"
          },
          {
            "type": "address",
            "name": "verifyingContract"
          }
        ],
        "SafeTx": [
          {
            "type": "address",
            "name": "to"
          },
          {
            "type": "uint256",
            "name": "value"
          },
          {
            "type": "bytes",
            "name": "data"
          },
          {
            "type": "uint8",
            "name": "operation"
          },
          {
            "type": "uint256",
            "name": "safeTxGas"
          },
          {
            "type": "uint256",
            "name": "baseGas"
          },
          {
            "type": "uint256",
            "name": "gasPrice"
          },
          {
            "type": "address",
            "name": "gasToken"
          },
          {
            "type": "address",
            "name": "refundReceiver"
          },
          {
            "type": "uint256",
            "name": "nonce"
          }
        ]
      },
      "domain": {
        "verifyingContract": "0xA77DE01e157f9f57C7c4A326eeE9C4874D0598b6",
        "chainId": 1
      },
      "primaryType": "SafeTx",
      "message": {
        "to": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "value": "0",
        "data": "0x095ea7b30000000000000000000000003819b800c67be64029c1393c8b2e0d0d627dade2000000000000000000000000000000000000000000000016c4abbebea0100000",
        "operation": 0,
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": 48,
        "safeTxGas": "0"
      }
    }`),
  },
  maliciousIncreaseAllowance: {
    id: 'maliciousIncreaseAllowance',
    title: 'Malicious Increase Allowance',
    signing: 'Blind/Raw Signing',
    riskLevel: 'Threat',
    comments: '!!! Approving an EOA (that isn’t an owner) is unusual, but not always malicious.',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "EIP712Domain": [
          {
            "type": "uint256",
            "name": "chainId"
          },
          {
            "type": "address",
            "name": "verifyingContract"
          }
        ],
        "SafeTx": [
          {
            "type": "address",
            "name": "to"
          },
          {
            "type": "uint256",
            "name": "value"
          },
          {
            "type": "bytes",
            "name": "data"
          },
          {
            "type": "uint8",
            "name": "operation"
          },
          {
            "type": "uint256",
            "name": "safeTxGas"
          },
          {
            "type": "uint256",
            "name": "baseGas"
          },
          {
            "type": "uint256",
            "name": "gasPrice"
          },
          {
            "type": "address",
            "name": "gasToken"
          },
          {
            "type": "address",
            "name": "refundReceiver"
          },
          {
            "type": "uint256",
            "name": "nonce"
          }
        ]
      },
      "domain": {
        "verifyingContract": "0xA77DE01e157f9f57C7c4A326eeE9C4874D0598b6",
        "chainId": ${globalContext.chainIdInt}
      },
      "primaryType": "SafeTx",
      "message": {
        "to": "0x5aFE3855358E112B5647B952709E6165e1c1eEEe",
        "value": "0",
        "data": "0x39509351000000000000000000000000b5e64e857bb7b5350196c5bac8d639cec107274500000000000000000000000000000000000000000000021e19e0c9bab23fffff",
        "operation": 0,
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": 48,
        "safeTxGas": "0"
      }
    }`),
  },
  maliciousBatchedERC20approval: {
    id: 'maliciousBatchedERC20approval',
    title: 'Malicious Batched ERC20 Approval',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "EIP712Domain": [
          {
            "type": "uint256",
            "name": "chainId"
          },
          {
            "type": "address",
            "name": "verifyingContract"
          }
        ],
        "SafeTx": [
          {
            "type": "address",
            "name": "to"
          },
          {
            "type": "uint256",
            "name": "value"
          },
          {
            "type": "bytes",
            "name": "data"
          },
          {
            "type": "uint8",
            "name": "operation"
          },
          {
            "type": "uint256",
            "name": "safeTxGas"
          },
          {
            "type": "uint256",
            "name": "baseGas"
          },
          {
            "type": "uint256",
            "name": "gasPrice"
          },
          {
            "type": "address",
            "name": "gasToken"
          },
          {
            "type": "address",
            "name": "refundReceiver"
          },
          {
            "type": "uint256",
            "name": "nonce"
          }
        ]
      },
      "domain": {
        "verifyingContract": "0xA77DE01e157f9f57C7c4A326eeE9C4874D0598b6",
        "chainId": ${globalContext.chainIdInt}
      },
      "primaryType": "SafeTx",
      "message": {
        "to": "0x40A2aCCbd92BCA938b02010E17A5b8929b49130D",
        "value": "0",
        "data": "0x8d80ff0a000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000001cb005afe3855358e112b5647b952709e6165e1c1eeee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004439509351000000000000000000000000b5e64e857bb7b5350196c5bac8d639cec107274500000000000000000000000000000000000000000000021e19e0c9bab23fffff00c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044095ea7b3000000000000000000000000b5e64e857bb7b5350196c5bac8d639cec1072745000000000000000000000000000000000000000000000016c4abbebea0100000000000000000000000000000000000000000000000",
        "operation": 1,
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": 48,
        "safeTxGas": "0"
      }
    }`),
  },
  maliciousClaim: {
    id: 'maliciousClaim',
    title: 'Malicious Claim',
    signing: 'Raw Signing',
    riskLevel: 'Threat',
    comments: '!!! EIP-712 - Reason: Sends ETH to an empty/non-contract address. Detection: Target has no bytecode and non-zero value - phishing pattern. Not flagged by Metamask.',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "EIP712Domain": [
          {
            "type": "uint256",
            "name": "chainId"
          },
          {
            "type": "address",
            "name": "verifyingContract"
          }
        ],
        "SafeTx": [
          {
            "type": "address",
            "name": "to"
          },
          {
            "type": "uint256",
            "name": "value"
          },
          {
            "type": "bytes",
            "name": "data"
          },
          {
            "type": "uint8",
            "name": "operation"
          },
          {
            "type": "uint256",
            "name": "safeTxGas"
          },
          {
            "type": "uint256",
            "name": "baseGas"
          },
          {
            "type": "uint256",
            "name": "gasPrice"
          },
          {
            "type": "address",
            "name": "gasToken"
          },
          {
            "type": "address",
            "name": "refundReceiver"
          },
          {
            "type": "uint256",
            "name": "nonce"
          }
        ]
      },
      "domain": {
        "verifyingContract": "0xA77DE01e157f9f57C7c4A326eeE9C4874D0598b6",
        "chainId": "${globalContext.chainIdInt}"
      },
      "primaryType": "SafeTx",
      "message": {
        "to": "0xB5E64e857bb7b5350196C5BAc8d639ceC1072745",
        "value": "40000000000000000",
        "data": "0x4e71d92d",
        "operation": 0,
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": "0x0000000000000000000000000000000000000000",
        "nonce": 48,
        "safeTxGas": "0"
      }
    }`),
  },
  benignSend09: {
    id: 'benignSend09',
    title: 'Benign Send (almost all funds)',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: '0x3440378aB3552A3736Da9680507D8583298144Ed',
        value: '0x13fc6f4d5c00000',
      }),
  },
  benignSend06: {
    id: 'benignSend06',
    title: 'Benign Send (60% of funds)',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: '0x3440378aB3552A3736Da9680507D8583298144Ed',
        value: '0xd6bf94d5e40000',
      }),
  },
  benignSend: {
    id: 'benignSend',
    title: 'Benign Send',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.sendTransaction({
        to: '0x3440378aB3552A3736Da9680507D8583298144Ed',
        value: '0x8e1bc9bf040000',
      }),
  },
  benignUniswapPermitMessage: {
    id: 'benignUniswapPermitMessage',
    title: 'Uniswap Permit (UniswapX Dutch Order)',
    signing: 'Clear Signing',
    riskLevel: 'Benign',
    onClick: () =>
      transactionUtils.signTypedData(`{
      "types": {
        "PermitWitnessTransferFrom": [
          {
            "name": "permitted",
            "type": "TokenPermissions"
          },
          {
            "name": "spender",
            "type": "address"
          },
          {
            "name": "nonce",
            "type": "uint256"
          },
          {
            "name": "deadline",
            "type": "uint256"
          },
          {
            "name": "witness",
            "type": "V2DutchOrder"
          }
        ],
        "TokenPermissions": [
          {
            "name": "token",
            "type": "address"
          },
          {
            "name": "amount",
            "type": "uint256"
          }
        ],
        "V2DutchOrder": [
          {
            "name": "info",
            "type": "OrderInfo"
          },
          {
            "name": "cosigner",
            "type": "address"
          },
          {
            "name": "baseInputToken",
            "type": "address"
          },
          {
            "name": "baseInputStartAmount",
            "type": "uint256"
          },
          {
            "name": "baseInputEndAmount",
            "type": "uint256"
          },
          {
            "name": "baseOutputs",
            "type": "DutchOutput[]"
          }
        ],
        "OrderInfo": [
          {
            "name": "reactor",
            "type": "address"
          },
          {
            "name": "swapper",
            "type": "address"
          },
          {
            "name": "nonce",
            "type": "uint256"
          },
          {
            "name": "deadline",
            "type": "uint256"
          },
          {
            "name": "additionalValidationContract",
            "type": "address"
          },
          {
            "name": "additionalValidationData",
            "type": "bytes"
          }
        ],
        "DutchOutput": [
          {
            "name": "token",
            "type": "address"
          },
          {
            "name": "startAmount",
            "type": "uint256"
          },
          {
            "name": "endAmount",
            "type": "uint256"
          },
          {
            "name": "recipient",
            "type": "address"
          }
        ],
        "EIP712Domain": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "chainId",
            "type": "uint256"
          },
          {
            "name": "verifyingContract",
            "type": "address"
          }
        ]
      },
      "domain": {
        "name": "Permit2",
        "chainId": "${globalContext.chainIdInt}",
        "verifyingContract": "0x000000000022d473030f116ddee9f6b43ac78ba3"
      },
      "primaryType": "PermitWitnessTransferFrom",
      "message": {
        "permitted": {
          "token": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "amount": "55523067"
        },
        "spender": "0x00000011f84b9aa48e5f8aa8b9897600006289be",
        "nonce": "1993352410446724903527540831511062577909113635061593632310874046879236495361",
        "deadline": "1743114922",
        "witness": {
          "info": {
            "reactor": "0x00000011f84b9aa48e5f8aa8b9897600006289be",
            "swapper": "0x6535d5f76f021fe65e2ac73d086df4b4bd7ee5d9",
            "nonce": "1993352410446724903527540831511062577909113635061593632310874046879236495361",
            "deadline": "1743114922",
            "additionalValidationContract": "0x0000000000000000000000000000000000000000",
            "additionalValidationData": "0x"
          },
          "cosigner": "0x4449cd34d1eb1fedcf02a1be3834ffde8e6a6180",
          "baseInputToken": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
          "baseInputStartAmount": "55523067",
          "baseInputEndAmount": "55523067",
          "baseOutputs": [
            {
              "token": "0xdac17f958d2ee523a2206206994597c13d831ec7",
              "startAmount": "55283452",
              "endAmount": "54669224",
              "recipient": "0x6535d5f76f021fe65e2ac73d086df4b4bd7ee5d9"
            }
          ]
        }
      }
    }`),
  },
};

// Fonction pour créer un bouton
function createButton(config) {
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'mb-3';

  const button = document.createElement('button');
  button.className = 'btn btn-primary btn-lg btn-block';
  button.id = config.id;
  button.textContent = config.title;
  button.disabled = true;

  const commentsContainer = document.createElement('div');
  commentsContainer.className = 'mt-2 small text-muted';

  if (config.signing !== undefined) {
    const signingText = document.createElement('span');
    signingText.textContent = `Signing: ${config.signing}`;
    commentsContainer.appendChild(signingText);
  }
  
  if (config.riskLevel) {
    const riskLevelText = document.createElement('span');
    riskLevelText.textContent = ` - Risk Level: ${config.riskLevel}`;
    commentsContainer.appendChild(riskLevelText);
  }

  if (config.comments) {
    const commentsText = document.createElement('div');
    commentsText.textContent = config.comments;
    commentsContainer.appendChild(commentsText);
  }

  if (config.tooltip) {
    const tooltipText = document.createElement('div');
    tooltipText.textContent = config.tooltip;
    commentsContainer.appendChild(tooltipText);
  }

  buttonContainer.appendChild(button);
  if (commentsContainer.children.length > 0) {
    buttonContainer.appendChild(commentsContainer);
  }

  if (config.hidden) {
    buttonContainer.hidden = true;
  }
  button.onclick = config.onClick;
  return buttonContainer;
}

// Fonction pour créer une section de boutons
function createButtonSection(title, buttonIds) {
  const section = document.createElement('div');
  section.innerHTML = `<h5>${title}</h5>`;
  buttonIds.forEach((id) => {
    const config = buttonConfigs[id];
    if (config) {
      section.appendChild(createButton(config));
    }
  });
  return section;
}

export function ppomMaliciousTransactionsAndSignatures(parentContainer) {
  // Création du conteneur principal
  const container = document.createElement('div');
  container.className =
    'col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-stretch';
  container.innerHTML = `
    <div class="card full-width">
      <div class="card-body">
        <h4 class="card-title">PPOM - Malicious Transactions and Signatures</h4>
        <p>We know we are vulnerable if any of these Transactions/Signatures are not flagged as Malicious</p>
      </div>
    </div>
  `;

  const cardBody = container.querySelector('.card-body');

  // Ajout des sections de boutons
  const sections = [
    {
      title: 'Transactions',
      buttons: [
        'maliciousRawEth',
        'mintSepoliaERC20',
        'maliciousERC20Transfer',
        'maliciousApproval',
        'maliciousContractInteraction',
        'maliciousSetApprovalForAll',
      ],
    },
    {
      title: 'Signatures',
      buttons: ['maliciousPermit', 'maliciousTradeOrder', 'maliciousSeaport'],
    },
    {
      title: 'Safe',
      buttons: [
        'maliciousSafeMessage',
        'maliciousPermit2toEOAMessage',
        'maliciousPermit2toSafeMessage',
        'maliciousERC20approvaltoanEOA',
        'maliciousBatchedERC20approval',
        'maliciousTransactionBybit',
        'maliciousWazirXexploit',
        'maliciousClaim',
        'maliciousIncreaseAllowance',
      ],
    },
    {
      title: 'AAVE',
      buttons: [
        'benignAaveSupply',
        'benignAaveBorrow',
        'benignAaveWithdraw',
        'benignAavePermitStaking',
        'benignAaveStaking',
      ],
    },
    {
      title: '1Inch',
      buttons: [
        'benign1InchClassicSwap',
        'malicious1InchClassicSwap',
        'malicious1InchOrder',
      ],
    },
    /*
    {
      title: 'Token - ERC 721',
      buttons: [],
    },
    {
      title: 'Token - ERC 1155',
      buttons: [],
    },
    {
      title: 'NFT',
      buttons: [],
    },
    */
    {
      title: 'Paraswap',
      buttons: [],
    },
    {
      title: 'Uniswap',
      buttons: ['benignUniswapPermitMessage'],
    },
    /*
    {
      title: 'Quickswap',
      buttons: [],
    },
    {
      title: 'Lido',
      buttons: [],
    },
    
    {
      title: 'Opensea',
      buttons: ['maliciousOpenseaMessage'],
    },
    {
      title: 'Kiln (staking)',
      buttons: [],
    },
    {
      title: 'Swap (changelly/Exodus)',
      buttons: [],
    },
    */
    {
      title: 'Benign Transactions',
      buttons: ['benignSend', 'benignSend06', 'benignSend09'],
    },
  ];

  sections.forEach((section) => {
    cardBody.appendChild(createButtonSection(section.title, section.buttons));
  });

  parentContainer.appendChild(container);

  // Gestion des événements
  document.addEventListener('globalConnectionChange', function (e) {
    const buttons = container.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = !e.detail.connected;
    });
  });

  document.addEventListener('disableAndClear', function () {
    const buttons = container.querySelectorAll('button');
    buttons.forEach((button) => {
      button.disabled = true;
    });
  });

  document.addEventListener('newNetwork', function (e) {
    const mintSepoliaERC20Button = container.querySelector('#mintSepoliaERC20');
    const maliciousContractInteractionButton = container.querySelector(
      '#maliciousContractInteractionButton',
    );

    if (mintSepoliaERC20Button) {
      mintSepoliaERC20Button.hidden = !isSepoliaNetworkId(e.detail.networkId);
    }
    if (maliciousContractInteractionButton) {
      maliciousContractInteractionButton.hidden =
        isBaseNetworkId(e.detail.networkId) ||
        isSepoliaNetworkId(e.detail.networkId);
    }
  });
}
