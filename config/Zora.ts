export const ZORA_INDEX_RINKEBY =
  "https://indexer-dev-rinkeby.zora.co/v1/graphql";

export const ZORA_INDEX_MAINNET =
  "https://indexer-prod-mainnet.zora.co/v1/graphql";

export const ZORA_MODULE_MANAGER_ABI = [
  {
    inputs: [
      { internalType: "address", name: "_registrar", type: "address" },
      { internalType: "address", name: "_feeToken", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "approved", type: "bool" },
    ],
    name: "ModuleApprovalSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "module",
        type: "address",
      },
    ],
    name: "ModuleRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "newRegistrar",
        type: "address",
      },
    ],
    name: "RegistrarChanged",
    type: "event",
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "address", name: "_module", type: "address" },
    ],
    name: "isModuleApproved",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "moduleFeeToken",
    outputs: [
      {
        internalType: "contract ZoraProtocolFeeSettings",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "moduleRegistered",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_module", type: "address" }],
    name: "registerModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registrar",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_module", type: "address" },
      { internalType: "bool", name: "_approved", type: "bool" },
    ],
    name: "setApprovalForModule",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_module", type: "address" },
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "bool", name: "_approved", type: "bool" },
      { internalType: "uint256", name: "_deadline", type: "uint256" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "setApprovalForModuleBySig",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_modules", type: "address[]" },
      { internalType: "bool", name: "_approved", type: "bool" },
    ],
    name: "setBatchApprovalForModules",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_registrar", type: "address" }],
    name: "setRegistrar",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "sigNonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "userApprovals",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];
