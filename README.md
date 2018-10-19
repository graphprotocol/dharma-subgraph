#Dharma Subgraph

This is a Subgraph for the [Dharma contracts](https://github.com/dharmaprotocol/charta). It is specifically designed so that the subgraph encompasses all the 
information required for the [Dharma Plex Dapp](https://plex.dharma.io/) to function. 

This requires the following four contracts to be ingested by the subgraph, with all events needed listed as well:
* DebtKernal.sol
    * LogDebtOrderFilled
    * LogIssuanceCancelled
    * LogDebtOrderCancelled
* DebtRegistry.sol
    * LogInsertEntry
    * LogModifyEntryBeneficiary
* Collateralizer.sol
    * CollateralLocked
    * CollateralSeized
    * CollateralReturned
* RepaymentRouter.sol
    * LogRepayment

This can be used for both the Kovan network  contracts and the Mainnet contracts. In order to do
so the `subgraph.yaml` file will need to have the contract addresses changed to point to the 
correct address for the network.


## How Graph Nodes Work

A Graph Node can source events by calling to Infura through http or websocket calls. It can also connect to your own geth node or parity node. Fast synced geth nodes work if you have to start syncing from scratch. Having your own node is more reliable and quicker, but Infura is the quickest way to get started.  

This subgraph has three types of files which tell the Graph Node to ingest events from specific contracts
They are:
* The subgraph manifest (subgraph.yaml)
* A GraphQL schema      (schema.graphql)
* Mapping scripts      (debt-kernal.ts, debt-registry.ts, repayment-router.ts, collateralizer.ts)

This repository has these files created and ready to compile. If you want to read about how to modify these files yourself, please check out https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md. 

We have provided quick steps on how to start up the Dharma-Subgraph graph node below. If these steps aren't descriptive enough, the [Getting started](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) document has in depth details that should help. 

## Steps to get the Dharma-Subgraph Running 
  1. Install IPFS and run `ipfs init` followed by `ipfs daemon`
  2. Install PostgreSQL and run `initdb -D .postgres` followed by `createdb dharma-subgraph`
  3. If using Ubuntu, you may need to install additional packages: `sudo apt-get install -y clang libpq-dev libssl-dev pkg-config`
  4. Clone this repository, and run the following:
     * `yarn`
     * `yarn codegen` 
  5. Clone https://github.com/graphprotocol/graph-node from master and `cargo build` (this might take a while)
  6a. Now that all the dependencies are running, you can run the following command to connect to Kovan Infura (it may take ~5-10 minutes to compile):


```
cargo run -p graph-node --release --   
--postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/dharma-kovan-subgraph 
--ipfs 127.0.0.1:5001
--ethereum-rpc kovan-infura:https://kovan.infura.io 

```

  6b. Or Kovan Mainnet:

```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/dharma-subgraph \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-infura:https://mainnet.infura.io 

```

 6c. Or a local node:
 
 ```
   cargo run -p graph-node --release -- \
   --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/dharma-subgraph \
   --ipfs 127.0.0.1:5001 \
   --ethereum-rpc local-node:http://127.0.0.1:8545
 
 ```

 7. Now deploy the Dharma-Subgraph to The Graph Node with `yarn deploy --verbosity debug`. you should see a lot of blocks being skipped, and then it will start ingesting events from the moment the contracts were uploaded to the network. 

Now that you have built the subgraph and started a Graph Node you may open a [Graphiql](https://github.com/graphql/graphiql) browser at `127.0.0.1:8000` and get started with querying.

## Getting started with Querying 

Below are a few ways to show how to query the Dharma-Subgraph for interesting data. 

### Querying all possible data that is being stored
The query below shows all the information that is possible to query, but limited to the first 5 instances. There are many other filtering options that can be used, just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md). Type this command into the Graphiql interface in your browser at `127.0.0.1:8000`:

```
{
  debtOrders(first: 5) {
  id
  beneficiary
  cancelledBy
  principle
  principleToken
  relayer
  relayerFee
  termsContract
  termsContractParameters
  underwriter
  underwriterFee
  underwriterRiskRating
  }
  
  cancelledDebtOrders(first: 5){
    id
    cancelledBy
  }
    
  collaterals(first: 5){
    id
    tokenAddress
    amount
    status
    collateralReturnedTo
  }

  repayments(first: 5){
    id
    amounts
    payers
    tokenAddresses
    beneficiaries
  }
}
```

