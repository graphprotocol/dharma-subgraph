// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import types and APIs from graph-ts
import { Entity, store, Value } from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import { LogRepayment } from '../types/RepaymentRouter/RepaymentRouter'

export function handleRepayment(event: LogRepayment): void {
  let id = event.params._agreementId.toHex()

  let repayment = store.get('Repayment', 'id')

  if (repayment == null) {
    repayment = new Entity()
    repayment.setArray('payers', new Array<Value>())
    repayment.setArray('beneficiaries', new Array<Value>())
    repayment.setArray('amounts', new Array<Value>())
    repayment.setString('debtOrder', id)
    // repayment.setU256('amountRepaid', event.params._amount)
  }

  let payers = repayment.getArray('payers')
  let beneficiaries = repayment.getArray('beneficiaries')
  let amounts = repayment.getArray('amounts')

  payers.push(Value.fromAddress(event.params._payer))
  beneficiaries.push(Value.fromAddress(event.params._beneficiary))
  amounts.push(Value.fromU256(event.params._amount))

  // dont have to set again when fixed
  // repayment.setArray('payer', payers)
  // repayment.setArray('beneficiary', beneficiaries)
  // repayment.setArray('amount', amounts)

  store.set('Repayment', id, repayment as Entity)
}

// So that we don't add twice on the first try
// if (repayment != null) {
//   let previousPaid = repayment.getU256('amountRepaid')
//   let combined = addition(event.params._amount, previousPaid)
//   repayment.setU256('amountRepaid', combined)
// }

// function addition(a: U256, b: U256): U256 {
//   let first = Number(a)
//   let second = Number(b)
//   let total = first + second
//   let final = <U256>(total)
//   return total as U256
// }