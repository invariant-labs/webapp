<<<<<<< HEAD
According to the design I made a button that indicates if given pool is indexed by Jupiter
I used Sagas, because it seemed the app handles side effects mostly using it
I made the modal with status and handled the possible error
indexedPools could be an array, but I decided to use an object, because every other Saga is using it this way

I added basic stories for each component 

- If the pool doesn't exist - the button is not shown
![image](https://github.com/invariant-labs/webapp/assets/116462435/f85a4f5e-a4dd-4be3-9a07-1eaaa5403985)
![image](https://github.com/invariant-labs/webapp/assets/116462435/0cfef3cc-1561-4204-b72e-2ee082207495)

- If the pool does exist and is indexed - button is lightened - opens modal on click 
![image](https://github.com/invariant-labs/webapp/assets/116462435/5fd53199-e68e-4ad6-b765-9d8055240d3a)
![image](https://github.com/invariant-labs/webapp/assets/116462435/e0b3d944-e121-4a75-a095-7098c830bda3)

- If the pool does exist and is not indexed - button is darkened - opens modal on click
![image](https://github.com/invariant-labs/webapp/assets/116462435/b18f8931-3d9c-4bbc-9c01-feb44926f9f2)
![image](https://github.com/invariant-labs/webapp/assets/116462435/4feccf1d-1cea-4370-9eff-ad41c275cc6c)

- If the pool does exist, but app got an error fetching Jupiter API, modal shows the app couldn't fetch Jupiter API correctly
![image](https://github.com/invariant-labs/webapp/assets/116462435/ce677cd3-faf1-4def-bfa6-a3c838d07de0)

<div align="center">
    <h1>⚡Invariant webapp - Solana⚡</h1>
</div>

Invariant is a decentralized exchange <b>(DEX)</b> app built on the <b>Solana blockchain</b>, offering advanced features such as <b>concentrated liquidity</b> for maximum capital efficiency and lower trading fees. It enables users to swap tokens, and create and manage liquidity pools within specific price ranges.
This frontend repository provides the user interface for interacting with the <b>Invariant protocol.</b>

## 🔨 Getting Started

### Prerequisites

- NodeJs, version 20+ ([NodeJs](https://nodejs.org/en/download/package-manager))
- npm ([npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm))

### Build webapp

- Clone repository

```bash
git clone https://github.com/invariant-labs/webapp.git
```

- Install dependencies

```bash
npm i
```

- Run on local server

```bash
npm run vite
```

#### Run storybook

Storybook allows one to check all components and test them in an independent environment.

- Run storybook

```bash
npm run storybook
```
