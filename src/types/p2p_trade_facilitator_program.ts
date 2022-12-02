export type P2pTradeFacilitatorProgram = {
  "version": "0.1.0",
  "name": "p2p_trade_facilitator_program",
  "instructions": [
    {
      "name": "createSellAd",
      "accounts": [
        {
          "name": "sellAd",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "id",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "device",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateSellAdParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "sellAd",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump nonce of the PDA (1)."
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "The id of the ad (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "The owner of the ad (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "device",
            "docs": [
              "The id of the device on which this ad is created (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "unitPrice",
            "docs": [
              "Price in peso per token (8)"
            ],
            "type": "u64"
          },
          {
            "name": "available",
            "docs": [
              "Amount assigned to this posted ad in lamports (8)"
            ],
            "type": "u64"
          },
          {
            "name": "minLimit",
            "docs": [
              "Minimum purchase in peso * lamports (8)"
            ],
            "type": "u64"
          },
          {
            "name": "maxLimit",
            "docs": [
              "Maximum purchase in peso * lamports (8)"
            ],
            "type": "u64"
          },
          {
            "name": "transferMethod",
            "docs": [
              "Binary flags indicating the transfer methods available for this post (4)",
              "0000000 All payments",
              "0000001 Gcash",
              "0000002 Bank Transfer",
              "0000004 UnionBank of the Philippines",
              "0000008 Paymaya",
              "0000016 Bank of the Philippine Islands...",
              "0000032 SEA Bank",
              "0000064 Banco De Oro (BDO)",
              "0000128 Coins.ph",
              "0000256 Metropolitan Bank of the Phili...",
              "0000512 Rizal Commercial Banking Corpo...",
              "0001024 Landbank of the Philippines",
              "0002048 Philippines National Bank (PNB...",
              "0004096 CIMB Philippines",
              "0008192 ShopeePay-SEA",
              "0016384 Asia United Bank",
              "0032768 Maybank",
              "0065536 Alipay",
              "0131072 Cash Deposit to Bank",
              "0262144 Sterling Bank",
              "0524288 7-Eleven",
              "1048576 CIMB Niaga",
              "2097152 LINE Pay",
              "4194304 WeChat"
            ],
            "type": "u32"
          },
          {
            "name": "state",
            "docs": [
              "State of the ad (1)",
              "0 open",
              "1 buyer to proceed with transferring funds to seller",
              "2 seller to confirm transferred funds and close the deal",
              "3 appeal / call for public hearing"
            ],
            "type": "u8"
          },
          {
            "name": "buyer",
            "docs": [
              "Assigned buyer, if present, funds will be locked until trade is settled (1 + 32)"
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "timeStarted",
            "docs": [
              "Time when the buyer and the seller agreed to proceed with the trade (1 + 8)"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "reserved",
            "docs": [
              "Unused reserved byte space for additive future changes (128)"
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateSellAdParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "unitPrice",
            "type": "u64"
          },
          {
            "name": "available",
            "type": "u64"
          },
          {
            "name": "minLimit",
            "type": "u64"
          },
          {
            "name": "maxLimit",
            "type": "u64"
          },
          {
            "name": "transferMethod",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AmountNotWithinLimit",
      "msg": "The amount available is not within the limit range"
    }
  ]
};

export const IDL: P2pTradeFacilitatorProgram = {
  "version": "0.1.0",
  "name": "p2p_trade_facilitator_program",
  "instructions": [
    {
      "name": "createSellAd",
      "accounts": [
        {
          "name": "sellAd",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "id",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "device",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateSellAdParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "sellAd",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump nonce of the PDA (1)."
            ],
            "type": "u8"
          },
          {
            "name": "id",
            "docs": [
              "The id of the ad (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "authority",
            "docs": [
              "The owner of the ad (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "device",
            "docs": [
              "The id of the device on which this ad is created (32)"
            ],
            "type": "publicKey"
          },
          {
            "name": "unitPrice",
            "docs": [
              "Price in peso per token (8)"
            ],
            "type": "u64"
          },
          {
            "name": "available",
            "docs": [
              "Amount assigned to this posted ad in lamports (8)"
            ],
            "type": "u64"
          },
          {
            "name": "minLimit",
            "docs": [
              "Minimum purchase in peso * lamports (8)"
            ],
            "type": "u64"
          },
          {
            "name": "maxLimit",
            "docs": [
              "Maximum purchase in peso * lamports (8)"
            ],
            "type": "u64"
          },
          {
            "name": "transferMethod",
            "docs": [
              "Binary flags indicating the transfer methods available for this post (4)",
              "0000000 All payments",
              "0000001 Gcash",
              "0000002 Bank Transfer",
              "0000004 UnionBank of the Philippines",
              "0000008 Paymaya",
              "0000016 Bank of the Philippine Islands...",
              "0000032 SEA Bank",
              "0000064 Banco De Oro (BDO)",
              "0000128 Coins.ph",
              "0000256 Metropolitan Bank of the Phili...",
              "0000512 Rizal Commercial Banking Corpo...",
              "0001024 Landbank of the Philippines",
              "0002048 Philippines National Bank (PNB...",
              "0004096 CIMB Philippines",
              "0008192 ShopeePay-SEA",
              "0016384 Asia United Bank",
              "0032768 Maybank",
              "0065536 Alipay",
              "0131072 Cash Deposit to Bank",
              "0262144 Sterling Bank",
              "0524288 7-Eleven",
              "1048576 CIMB Niaga",
              "2097152 LINE Pay",
              "4194304 WeChat"
            ],
            "type": "u32"
          },
          {
            "name": "state",
            "docs": [
              "State of the ad (1)",
              "0 open",
              "1 buyer to proceed with transferring funds to seller",
              "2 seller to confirm transferred funds and close the deal",
              "3 appeal / call for public hearing"
            ],
            "type": "u8"
          },
          {
            "name": "buyer",
            "docs": [
              "Assigned buyer, if present, funds will be locked until trade is settled (1 + 32)"
            ],
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "timeStarted",
            "docs": [
              "Time when the buyer and the seller agreed to proceed with the trade (1 + 8)"
            ],
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "reserved",
            "docs": [
              "Unused reserved byte space for additive future changes (128)"
            ],
            "type": {
              "array": [
                "u8",
                128
              ]
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateSellAdParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "unitPrice",
            "type": "u64"
          },
          {
            "name": "available",
            "type": "u64"
          },
          {
            "name": "minLimit",
            "type": "u64"
          },
          {
            "name": "maxLimit",
            "type": "u64"
          },
          {
            "name": "transferMethod",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AmountNotWithinLimit",
      "msg": "The amount available is not within the limit range"
    }
  ]
};