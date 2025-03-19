import globalContext from '../..';
import { maliciousAddress } from '../../sample-addresses';
import {
  ERC20_SAMPLE_CONTRACTS,
  ERC721_SAMPLE_CONTRACTS,
  MALICIOUS_CONTRACT_ADDRESSES,
} from '../../onchain-sample-contracts';
import { isBaseNetworkId, isSepoliaNetworkId } from '../../utils';

export function ppomMaliciousTransactionsAndSignatures(parentContainer) {
  parentContainer.insertAdjacentHTML(
    'beforeend',
    `<div
      class="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-stretch"
    >
      <div class="card full-width">
        <div class="card-body">
          <h4 class="card-title">
            PPOM - Malicious Transactions and Signatures
          </h4>
          <p>We know we are vulnerable if any of these Transactions/Signatures are not flagged as Malicious</p>
          <h5>Transactions</h5>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousRawEthButton"
            disabled
          >
            Malicious Eth Transfer
          </button>
          <button
          class="btn btn-primary btn-lg btn-block mb-3"
          id="mintSepoliaERC20"
          hidden
        >
          Mint ERC20
        </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousERC20TransferButton"
            disabled
            title="This will only be flagged if you have some ERC20 balance"
          >
            Malicious ERC20 Transfer (USDC)
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousApprovalButton"
            disabled
          >
            Malicious ERC20 Approval (BUSD)
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousContractInteractionButton"
            disabled
          >
              Malicious Contract Interaction
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousSetApprovalForAll"
            disabled
          >
            Malicious Set Approval For All
          </button>
          <h5>Signatures</h5>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousPermit"
            disabled
          >
            Malicious Permit
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousTradeOrder"
            disabled
          >
            Malicious Trade Order
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousSeaport"
            disabled
          >
            Malicious Seaport
          </button>
          <h5>Ledger Test Cases</h5>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="malicious1InchOrder"
            disabled
          >
            Malicious 1Inch Order
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="maliciousSafeMessage"
            disabled
          >
            Malicious Safe Message
          </button>
          <h5>AAVE</h5>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="benignAaveSupply"
            disabled
          >
            Benign Aave Supply
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="benignAaveBorrow"
            disabled
          >
            Benign Aave Borrow
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="benignAaveWithdraw"
            disabled
          >
            Benign Aave Withdraw
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="benignAavePermitStaking"
            disabled
          >
            Benign Aave Permit (Staking)
          </button>
          <button
            class="btn btn-primary btn-lg btn-block mb-3"
            id="benignAaveStaking"
            disabled
          >
            Benign Aave Staking
          </button>
        </div>
      </div>
    </div>`,
  );

  // AREARE : add new buttons here
  const maliciousRawEthButton = document.getElementById(
    'maliciousRawEthButton',
  );
  const mintSepoliaERC20 = document.getElementById('mintSepoliaERC20');
  const maliciousERC20TransferButton = document.getElementById(
    'maliciousERC20TransferButton',
  );
  const maliciousApprovalButton = document.getElementById(
    'maliciousApprovalButton',
  );
  const maliciousContractInteractionButton = document.getElementById(
    'maliciousContractInteractionButton',
  );
  const maliciousSetApprovalForAll = document.getElementById(
    'maliciousSetApprovalForAll',
  );

  // Signatures
  const maliciousPermit = document.getElementById('maliciousPermit');
  const maliciousTradeOrder = document.getElementById('maliciousTradeOrder');
  const maliciousSeaport = document.getElementById('maliciousSeaport');
  const malicious1InchOrder = document.getElementById('malicious1InchOrder');
  const maliciousSafeMessage = document.getElementById('maliciousSafeMessage');
  const benignAaveSupply = document.getElementById('benignAaveSupply');
  const benignAaveBorrow = document.getElementById('benignAaveBorrow');
  const benignAaveWithdraw = document.getElementById('benignAaveWithdraw');
  const benignAavePermitStaking = document.getElementById(
    'benignAavePermitStaking',
  );
  const benignAaveStaking = document.getElementById('benignAaveStaking');

  document.addEventListener('globalConnectionChange', function (e) {
    if (e.detail.connected) {
      // MetaMask is connected, enable the button
      maliciousRawEthButton.disabled = false;
      mintSepoliaERC20.disabled = false;
      maliciousERC20TransferButton.disabled = false;
      maliciousApprovalButton.disabled = false;
      maliciousContractInteractionButton.disabled = false;
      maliciousSetApprovalForAll.disabled = false;
      maliciousPermit.disabled = false;
      maliciousTradeOrder.disabled = false;
      maliciousSeaport.disabled = false;
      // AREARE
      malicious1InchOrder.disabled = false;
      maliciousSafeMessage.disabled = false;
      benignAaveSupply.disabled = false;
      benignAaveBorrow.disabled = false;
      benignAaveWithdraw.disabled = false;
      benignAaveStaking.disabled = false;
      benignAavePermitStaking.disabled = false;
    }
  });

  document.addEventListener('disableAndClear', function () {
    maliciousRawEthButton.disabled = true;
    mintSepoliaERC20.disabled = true;
    maliciousERC20TransferButton.disabled = true;
    maliciousApprovalButton.disabled = true;
    maliciousContractInteractionButton.disabled = true;
    maliciousSetApprovalForAll.disabled = true;
    maliciousPermit.disabled = true;
    maliciousTradeOrder.disabled = true;
    maliciousSeaport.disabled = true;
    // AREARE
    malicious1InchOrder.disabled = true;
    maliciousSafeMessage.disabled = true;
    benignAaveSupply.disabled = true;
    benignAaveBorrow.disabled = true;
    benignAaveWithdraw.disabled = true;
    benignAaveStaking.disabled = true;
    benignAavePermitStaking.disabled = true;
  });

  document.addEventListener('newNetwork', function (e) {
    mintSepoliaERC20.hidden = !isSepoliaNetworkId(e.detail.networkId);
    maliciousContractInteractionButton.hidden =
      isBaseNetworkId(e.detail.networkId) ||
      isSepoliaNetworkId(e.detail.networkId);
  });

  // Malicious raw ETH transfer
  maliciousRawEthButton.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          to: `${maliciousAddress}`,
          value: '0x9184e72a000',
        },
      ],
    });
    console.log(result);
  };

  /**
   *  PPOM
   */

  // Mint ERC20 in Sepolia
  mintSepoliaERC20.onclick = async () => {
    const from = globalContext.accounts[0];
    const noPrefixedAddress = from.slice(2);
    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from,
          to: '0x27A56df30bC838BCA36141E517e7b5376dea68eE',
          value: '0x0',
          data: `0x40c10f19000000000000000000000000${noPrefixedAddress}000000000000000000000000000000000000000000000000000000001dcd6500`,
        },
      ],
    });
    console.log(result);
  };

  // Malicious ERC20 transfer
  maliciousERC20TransferButton.onclick = async () => {
    let erc20Contract;

    if (globalContext.networkName) {
      erc20Contract = ERC20_SAMPLE_CONTRACTS[globalContext.networkName];
    } else {
      erc20Contract = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
    }

    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          to: erc20Contract,
          data: '0xa9059cbb0000000000000000000000005fbdb2315678afecb367f032d93f642f64180aa30000000000000000000000000000000000000000000000000000000000000064',
        },
      ],
    });
    console.log(result);
  };

  // Malicious ERC20 Approval
  maliciousApprovalButton.onclick = async () => {
    let erc20Contract;

    if (globalContext.networkName) {
      erc20Contract = ERC20_SAMPLE_CONTRACTS[globalContext.networkName];
    } else {
      erc20Contract = '0x4fabb145d64652a948d72533023f6e7a623c7c53';
    }
    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          to: erc20Contract,
          data: '0x095ea7b3000000000000000000000000e50a2dbc466d01a34c3e8b7e8e45fce4f7da39e6000000000000000000000000000000000000000000000000ffffffffffffffff',
        },
      ],
    });
    console.log(result);
  };

  // Malicious Contract interaction
  maliciousContractInteractionButton.onclick = async () => {
    const contractAddress =
      MALICIOUS_CONTRACT_ADDRESSES[globalContext.networkName] ||
      MALICIOUS_CONTRACT_ADDRESSES.default;

    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          to: contractAddress,
          data: '0xef5cfb8c0000000000000000000000000b3e87a076ac4b0d1975f0f232444af6deb96c59',
          value: '0x0',
        },
      ],
    });
    console.log(result);
  };

  // Malicious Set Approval For All
  maliciousSetApprovalForAll.onclick = async () => {
    let erc721Contract;

    if (globalContext.networkName) {
      erc721Contract = ERC721_SAMPLE_CONTRACTS[globalContext.networkName];
    } else {
      erc721Contract = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d';
    }

    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          to: erc721Contract,
          data: '0xa22cb465000000000000000000000000b85492afc686d5ca405e3cd4f50b05d358c75ede0000000000000000000000000000000000000000000000000000000000000001',
        },
      ],
    });
    console.log(result);
  };

  // Malicious permit
  maliciousPermit.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_signTypedData_v4',
      params: [
        globalContext.accounts[0],
        `{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Permit":[{"name":"owner","type":"address"},{"name":"spender","type":"address"},{"name":"value","type":"uint256"},{"name":"nonce","type":"uint256"},{"name":"deadline","type":"uint256"}]},"primaryType":"Permit","domain":{"name":"USD Coin","verifyingContract":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","chainId":${globalContext.chainIdInt},"version":"2"},"message":{"owner":"${globalContext.accounts[0]}","spender":"0x1661F1B207629e4F385DA89cFF535C8E5Eb23Ee3","value":"1033366316628","nonce":1,"deadline":1678709555}}`,
      ],
    });
    console.log(result);
  };

  // Malicious trade order
  maliciousTradeOrder.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_signTypedData_v4',
      params: [
        globalContext.accounts[0],
        `{"types":{"ERC721Order":[{"type":"uint8","name":"direction"},{"type":"address","name":"maker"},{"type":"address","name":"taker"},{"type":"uint256","name":"expiry"},{"type":"uint256","name":"nonce"},{"type":"address","name":"erc20Token"},{"type":"uint256","name":"erc20TokenAmount"},{"type":"Fee[]","name":"fees"},{"type":"address","name":"erc721Token"},{"type":"uint256","name":"erc721TokenId"},{"type":"Property[]","name":"erc721TokenProperties"}],"Fee":[{"type":"address","name":"recipient"},{"type":"uint256","name":"amount"},{"type":"bytes","name":"feeData"}],"Property":[{"type":"address","name":"propertyValidator"},{"type":"bytes","name":"propertyData"}],"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}]},"domain":{"name":"ZeroEx","version":"1.0.0","chainId":"${globalContext.chainIdInt}","verifyingContract":"0xdef1c0ded9bec7f1a1670819833240f027b25eff"},"primaryType":"ERC721Order","message":{"direction":"0","maker":"${globalContext.accounts[0]}","taker":"${maliciousAddress}","expiry":"2524604400","nonce":"100131415900000000000000000000000000000083840314483690155566137712510085002484","erc20Token":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2","erc20TokenAmount":"42000000000000","fees":[],"erc721Token":"0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e","erc721TokenId":"2516","erc721TokenProperties":[]}}`,
      ],
    });
    console.log(result);
  };

  // Malicious 1Inch Order
  malicious1InchOrder.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_signTypedData_v4',
      params: [
        globalContext.accounts[0],
        `{
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
}`,
      ],
    });
    console.log(result);
  };

  // Malicious Seaport
  maliciousSeaport.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_signTypedData_v4',
      params: [
        globalContext.accounts[0],
        `{"types":{"OrderComponents":[{"name":"offerer","type":"address"},{"name":"zone","type":"address"},{"name":"offer","type":"OfferItem[]"},{"name":"consideration","type":"ConsiderationItem[]"},{"name":"orderType","type":"uint8"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"zoneHash","type":"bytes32"},{"name":"salt","type":"uint256"},{"name":"conduitKey","type":"bytes32"},{"name":"counter","type":"uint256"}],"OfferItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"}],"ConsiderationItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"},{"name":"recipient","type":"address"}],"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}]},"domain":{"name":"Seaport","version":"1.1","chainId":${globalContext.chainIdInt},"verifyingContract":"0x00000000006c3852cbef3e08e8df289169ede581"},"primaryType":"OrderComponents","message":{"offerer":"0x5a6f5477bdeb7801ba137a9f0dc39c0599bac994","zone":"0x004c00500000ad104d7dbd00e3ae0a5c00560c00","offer":[{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"26464","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"7779","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"4770","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"9594","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"2118","startAmount":"1","endAmount":"1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"1753","startAmount":"1","endAmount":"1"}],"consideration":[{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"26464","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"7779","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0x60e4d786628fea6478f785a6d7e704777c86a7c6","identifierOrCriteria":"4770","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"9594","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"2118","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"},{"itemType":"2","token":"0xba30e5f9bb24caa003e9f2f0497ad287fdf95623","identifierOrCriteria":"1753","startAmount":"1","endAmount":"1","recipient":"0xdfdc0b1cf8e9950d6a860af6501c4fecf7825cc1"}],"orderType":"2","startTime":"1681810415","endTime":"1681983215","zoneHash":"0x0000000000000000000000000000000000000000000000000000000000000000","salt":"1550213294656772168494388599483486699884316127427085531712538817979596","conduitKey":"0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000","counter":"0"}}`,
      ],
    });
    console.log(result);
  };

  maliciousSafeMessage.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_signTypedData_v4',
      params: [
        globalContext.accounts[0],
        `{   "types": {     "SafeTx": [       {         "type": "address",         "name": "to"       },       {         "type": "uint256",         "name": "value"       },       {         "type": "bytes",         "name": "data"       },       {         "type": "uint8",         "name": "operation"       },       {         "type": "uint256",         "name": "safeTxGas"       },       {         "type": "uint256",         "name": "baseGas"       },       {         "type": "uint256",         "name": "gasPrice"       },       {         "type": "address",         "name": "gasToken"       },       {         "type": "address",         "name": "refundReceiver"       },       {         "type": "uint256",         "name": "nonce"       }     ],     "EIP712Domain": [       {         "name": "chainId",         "type": "uint256"       },       {         "name": "verifyingContract",         "type": "address"       }     ]   },   "domain": {     "chainId": "1",     "verifyingContract": "0x1Db92e2EeBC8E0c075a02BeA49a2935BcD2dFCF4"   },   "primaryType": "SafeTx",   "message": {     "to": "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",     "value": "0",     "data": "0x6a76120200000000000000000000000096221423681a6d52e184d440a8efcebb105c7242000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000b2b2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000bdd077f651ebe7f7b3ce16fe5f2b025be296951600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c3d0afef78a52fd504479dc2af3dc401334762cbd05609c7ac18db9ec5abf4a07a5cc09fc86efd3489707b89b0c729faed616459189cb50084f208d03b201b001f1f0f62ad358d6b319d3c1221d44456080068fe02ae5b1a39b4afb1e6721ca7f9903ac523a801533f265231cd35fc2dfddc3bd9a9563b51315cf9d5ff23dc6d2c221fdf9e4b878877a8dbeee951a4a31ddbf1d3b71e127d5eda44b4730030114baba52e06dd23da37cd2a07a6e84f9950db867374a0f77558f42adf4409bfd569673c1f0000000000000000000000000000000000000000000000000000000000",     "operation": "1",     "safeTxGas": "45746",     "baseGas": "0",     "gasPrice": "0",     "gasToken": "0x0000000000000000000000000000000000000000",     "refundReceiver": "0x0000000000000000000000000000000000000000",     "nonce": "28"   } }`,
      ],
    });
    console.log(result);
  };

  // Benign Aave Supply
  benignAaveSupply.onclick = async () => {
    const contractAddress =
      MALICIOUS_CONTRACT_ADDRESSES[globalContext.networkName] ||
      MALICIOUS_CONTRACT_ADDRESSES.default;

    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          // to: contractAddress,
          to: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
          data: '0x617ba037000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000001c9c3800000000000000000000000006535d5f76f021fe65e2ac73d086df4b4bd7ee5d90000000000000000000000000000000000000000000000000000000000000000',
          value: '0x0',
        },
      ],
    });
    console.log(result);
  };


  // Benign Aave Borrow
  benignAaveBorrow.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          // to: contractAddress,
          to: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
          data: '0xa415bcad0000000000000000000000007f39c581f595b53c5cb19bd0b3f8da6c935e2ca000000000000000000000000000000000000000000000000000038d7ea4c68000000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000006535d5f76f021fe65e2ac73d086df4b4bd7ee5d9',
          value: '0x0',
        },
      ],
    });
    console.log(result);
  };

  // Benign Aave Withdraw
  benignAaveWithdraw.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          // to: contractAddress,
          to: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
          data: '0x69328dec000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000000000006535d5f76f021fe65e2ac73d086df4b4bd7ee5d9',
          value: '0x0',
        },
      ],
    });
    console.log(result);
  };

  // Benign Aave Permit Staking
  benignAavePermitStaking.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_signTypedData_v4',
      params: [
        globalContext.accounts[0],
        `{ "types": { "EIP712Domain": [ { "name": "name", "type": "string" }, { "name": "version", "type": "string" }, { "name": "chainId", "type": "uint256" }, { "name": "verifyingContract", "type": "address" } ], "Permit": [ { "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "deadline", "type": "uint256" } ] }, "primaryType": "Permit", "domain": { "name": "Aave token V3", "version": "2", "chainId": "1", "verifyingContract": "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9" }, "message": { "owner": "0x6535d5f76f021fe65e2ac73d086df4b4bd7ee5d9", "spender": "0x4da27a545c0c5b758a6ba100e3a049001de870f5", "value": "100000000000000000", "nonce": "0", "deadline": "1732787332" } }`,
      ],
    });
    console.log(result);
  };

  // Benign Aave Staking
  benignAaveStaking.onclick = async () => {
    const result = await globalContext.provider.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: globalContext.accounts[0],
          // to: contractAddress,
          to: '0x87870bca3f3fd6335c3f4ce8392d69350b4fa4e2',
          data: '0xecd9ba82000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000000000000067483c84000000000000000000000000000000000000000000000000000000000000001cb713bafe29aa71b13b7296f108808f51afa0ba8bcfe1cf0ad375e1d061f873a06407be64d853d33fc16991f4b53a11f0c5ca21d4e0ecce915ec49e9b0eb93cc3',
          value: '0x0',
        },
      ],
    });
    console.log(result);
  };
}
