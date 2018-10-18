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
    repayment.setArray('tokenAddresses', new Array<Value>())
    // repayment.setU256('amountRepaid', 0)
  }

  let payers = repayment.getArray('payers')
  let beneficiaries = repayment.getArray('beneficiaries')
  let amounts = repayment.getArray('amounts')
  let tokenAddresses = repayment.getArray('tokenAddresses')
  // let previousPaid =

  payers.push(Value.fromAddress(event.params._payer))
  beneficiaries.push(Value.fromAddress(event.params._beneficiary))
  amounts.push(Value.fromU256(event.params._amount))
  tokenAddresses.push(Value.fromAddress(event.params._token))

  repayment.setArray('payer', payers)
  repayment.setArray('beneficiary', beneficiaries)
  repayment.setArray('amount', amounts)
  repayment.setArray('tokenAddress', tokenAddresses)
  // repayment.setU256('amountRepaid', event.params._amount)


  store.set('Repayment', id, repayment as Entity)
}

