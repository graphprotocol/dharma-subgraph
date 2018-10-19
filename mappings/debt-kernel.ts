// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import types and APIs from graph-ts
import { Entity, store, Value } from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import { LogDebtOrderFilled, LogIssuanceCancelled, LogDebtOrderCancelled } from '../types/DebtKernel/DebtKernel'

export function handleDebtOrderFilled(event: LogDebtOrderFilled): void {
    let debtOrder = new Entity()

    let id = event.params._agreementId.toHex()

    debtOrder.setString('id', id)
    debtOrder.setU256('principle', event.params._principal)
    debtOrder.setAddress('principleToken', event.params._principalToken)
    debtOrder.setAddress('underwriter', event.params._underwriter)
    debtOrder.setU256('underwriterFee', event.params._underwriterFee)
    debtOrder.setAddress('relayer', event.params._relayer)
    debtOrder.setU256('relayerFee', event.params._relayerFee)
    debtOrder.setArray('collaterals', new Array<Value>())
    debtOrder.setArray('repayments', new Array<Value>())


  store.set('DebtOrder', id, debtOrder)
}

// This event has never actually been called on mainnet or kovan, so it is returning blank queries
export function handleIssuanceCancelled(event: LogIssuanceCancelled): void {
    let id = event.params._agreementId.toHex()
    let debtOrder  = new Entity()

    debtOrder.setAddress('issuanceCancelledBy', event.params._cancelledBy)
    store.set('DebtOrder', id, debtOrder)

}

export function handleDebtCancelled(event: LogDebtOrderCancelled): void {
    let cancelledDebt = new Entity()
    let id = event.params._debtOrderHash.toHex()

    cancelledDebt.setString('id', id)
    cancelledDebt.setAddress('cancelledBy', event.params._cancelledBy)

    store.set('CancelledDebtOrder', id, cancelledDebt)
}
