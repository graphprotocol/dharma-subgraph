// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import types and APIs from graph-ts
import { Entity, store } from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import { CollateralLocked, CollateralReturned, CollateralSeized } from '../types/Collateralizer/Collateralizer'

export function handleLock(event: CollateralLocked): void {
  let collateral = new Entity()
  let id = event.params.agreementID.toHex()

  collateral.setString('id', id)
  collateral.setAddress('tokenAddress', event.params.token)
  collateral.setU256('amount', event.params.amount)
  collateral.setString('status', "locked")
  collateral.setString('debtOrder', id)

  store.set('Collateral', id, collateral)
}

export function handleReturned(event: CollateralReturned): void {
  let returning = new Entity()
  let id = event.params.agreementID.toHex()

  returning.setAddress('collateralReturnedTo', event.params.collateralizer)
  returning.setString('status', "returned")

  store.set('Collateral', id, returning)
}

export function handleSeized(event: CollateralSeized): void {
  let seizing = new Entity()
  let id = event.params.agreementID.toHex()

  seizing.setAddress('collateralReturnedTo', event.params.beneficiary)
  seizing.setString('status', "seized")
  store.set('Collateral', id, seizing)
}