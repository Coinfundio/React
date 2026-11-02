# React — Token Selection

## Clone the repository

```bash
git clone https://github.com/coinfundio/React.git
cd React
```

## Backend

```bash
cd Backend
npm install
npm start
```

## Setup

```bash
npm install
npm test
```

# Problem

**Token selection under a budget**

An investor buys at most one token from each listed property. Each token has a price and an expected ROI. Choose the set of tokens that stays within the budget and produces the highest total ROI.

**Data.** `GET http://localhost:3344/api/v1/properties?limit=14`

Use `id`, `tokenPriceUsd`, and `expectedRoi` from each item in `data`. Ignore a property when `tokenPriceUsd` is `null`. Prices may be fractional. The budget for this test is **1600** USD.

**Rules**

- Buy one token or none from each property.
- The sum of `tokenPriceUsd` must be less than or equal to 1600.
- Maximize the sum of `expectedRoi`.
- If two sets have the same total ROI, choose the set with the lower total price.
- If no token fits, return an empty list.

**Return** the chosen property ids. Order does not matter.

In `ProductBoard`:

- Load `data` from that URL
- Choose tokens with a budget of 1600
- Render each chosen property `id`
- If none fit, leave the list empty