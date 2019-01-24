# Dharma Subgraph

This is a subgraph for the [Dharma Protocol](https://github.com/dharmaprotocol/charta). It is specifically designed so that the subgraph holds all the 
information required for the [Dharma Plex Dapp](https://plex.dharma.io/) to function. 

This requires the following four contracts to be ingested by the subgraph, with the events that were sourced to be stored in the subgraph database:
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

This can be used for both the Kovan network contracts and the Mainnet contracts. In order to do
so the `subgraph.yaml` file will need to have the contract addresses changed to point to the 
correct address for each respective network.

## Brief Description of The Graph Node Setup

A Graph Node can run multiple subgraphs, and in this case it can have a subgraph for both Mainnet and Kovan. The subgraph ingests event data by calling to Infura through http. It can also connect to any geth or parity node that accepts RPC calls. Fast synced geth nodes work. To use parity, the `--no-warp` flag must be used. Setting up a local Ethereum node is more reliable and faster, but Infura is the easiest way to get started. 

This subgraph has three types of files which tell the Graph Node to ingest events from specific contracts. They are:
* The subgraph manifest (subgraph.yaml)
* A GraphQL schema      (schema.graphql)
* Mapping scripts      (debt-kernal.ts, debt-registry.ts, repayment-router.ts, collateralizer.ts)

This repository has these files created and ready to compile. The only thing that needs to be edited is the contract addresses in the `subgraph.yaml` file to change between Kovan or Mainnet.  

We have provided a quick guide on how to start up the Dharma-Subgraph graph node. If these steps aren't descriptive enough, the [getting started guide](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) has in depth details on running a subgraph. 

## Steps to get the Dharma-Subgraph Running 
  1. Install IPFS and run `ipfs init` followed by `ipfs daemon`
  2. Install PostgreSQL and run `initdb -D .postgres` followed by `pg_ctl -D .postgres start` and `createdb dharma-mainnet` (note this db name is used in the commands below for the mainnet examples)
  3. If using Ubuntu, you may need to install additional packages: `sudo apt-get install -y clang libpq-dev libssl-dev pkg-config`
  4. Clone this repository, and run the following:
     * `yarn`
     * `yarn codegen` 
  5. Clone https://github.com/graphprotocol/graph-node from master and `cargo build` (this might take a while)
  6. a) Now that all the dependencies are running, you can run the following command to connect to Infura Mainnet (it may take a few minutes to compile). Password might be optional, it depends on your postrgres setup:

```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/dharma-mainnet \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-infura:https://mainnet.infura.io 
```
  6. b) Or Mainnet Local:
```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/dharma-mainnet \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-local:http://127.0.0.1:8545 
```
  6. c) Or Infura Kovan _(NOTE: Infura Kovan is not reliable right now, we get inconsistent results returned. If Kovan data is needed, it is suggested to run your own Kovan node)_
```
    cargo run -p graph-node --release --   
    --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/dharma-kovan 
    --ipfs 127.0.0.1:5001
    --ethereum-rpc kovan-infura:https://kovan.infura.io 

```
 6. d) Or a Kovan local node which was started with `parity --chain=kovan --no-warp  --jsonrpc-apis="all" `:
 
 ```
   cargo run -p graph-node --release -- \
   --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/dharma-kovan-subgraph \
   --ipfs 127.0.0.1:5001 \
   --ethereum-rpc kovan-local:http://127.0.0.1:8545
 
 ```

 7. Now create the subgraph locally on The Graph Node with `yarn create-subgraph`. (On The Graph Hosted service, creating the subgraph is done in the web broswer). 
  
 8. Now deploy the dharma subgraph to The Graph Node with `yarn deploy`. You should see a lot of blocks being skipped in the `graph-node` terminal, and then it will start ingesting events from the moment the contracts were uploaded to the network. 

Now that you have subgraph is running you may open a [Graphiql](https://github.com/graphql/graphiql) browser at `127.0.0.1:8000` and get started with querying.

## Getting started with Querying 

Below are a few ways to show how to query the Dharma-Subgraph for data. 

### Querying all possible data that is being stored
The query below shows all the information that is possible to query, but is limited to the first 10 instances. There are many other filtering options that can be used, just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).

```
{
  debtOrders(first: 10) {
    id
    beneficiary
    issuanceCancelledBy
    collaterals{
      id
      status
      tokenAddress
      collateralReturnedTo
      amount
    }
    principle
    principleToken
    relayer
    relayerFee
    repayments{
      id
      payers
      amounts
      beneficiaries
    }
    termsContract
    termsContractParameters
    underwriter
    underwriterFee
    underwriterRiskRating
   }
  
  cancelledDebtOrders(first: 10){
    id
    cancelledBy
  }
}
```
The command above can be copy pasted into the Graphiql interface in your browser at `127.0.0.1:8000`.

