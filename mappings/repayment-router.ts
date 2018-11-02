// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import APIs from graph-ts
import { store } from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import { LogRepayment } from '../types/RepaymentRouter/RepaymentRouter'

// Import entity types from the schema
import { Repayment } from '../types/schema'

export function handleRepayment(event: LogRepayment): void {
  let id = event.params._agreementId.toHex()

  let repayment = store.get('Repayment', id) as Repayment | null

  if (repayment == null) {
    repayment = new Repayment()
    repayment.payers = []
    repayment.beneficiaries = []
    repayment.amounts = []
    repayment.debtOrder = id
    // repayment.amountRepaid = event.params._amount
  }

  let payers = repayment.payers
  let beneficiaries = repayment.beneficiaries
  let amounts = repayment.amounts

  payers.push(event.params._payer)
  beneficiaries.push(event.params._beneficiary)
  amounts.push(event.params._amount)

  // dont have to set again when fixed
  // repayment.payers payers
  // repayment.beneficiarys beneficiaries
  // repayment.amounts, amounts

  store.set('Repayment', id, repayment as Repayment)
}

// So that we don't add twice on the first try
// if (repayment != null) {
//   let previousPaid = repayment.amountRepaid
//   let combined = addition(event.params._amount, previousPaid)
//   repayment.amountRepaid = combined
// }

// function addition(a: BigInt, b: BigInt): BigInt {
//   let first = Number(a)
//   let second = Number(b)
//   let total = first + second
//   return total as BigInt
// }
