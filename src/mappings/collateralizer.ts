// Import event types from the registrar contract ABI
import {
  CollateralLocked,
  CollateralReturned,
  CollateralSeized,
} from '../types/Collateralizer/Collateralizer'

// Import entity types from the schema
import { Collateral } from '../types/schema'

export function handleLock(event: CollateralLocked): void {
  let id = event.params.agreementID.toHex()

  let collateral = new Collateral(id)
  collateral.tokenAddress = event.params.token
  collateral.amount = event.params.amount
  collateral.status = 'locked'
  collateral.debtOrder = id
  collateral.save()
}

export function handleReturned(event: CollateralReturned): void {
  let id = event.params.agreementID.toHex()

  let collateral = new Collateral(id)
  collateral.collateralReturnedTo = event.params.collateralizer
  collateral.status = 'returned'
  collateral.save()
}

export function handleSeized(event: CollateralSeized): void {
  let id = event.params.agreementID.toHex()

  let collateral = new Collateral(id)
  collateral.collateralReturnedTo = event.params.beneficiary
  collateral.status = 'seized'
  collateral.save()
}
