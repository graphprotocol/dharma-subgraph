// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import types and APIs from graph-ts
import { Entity, store } from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import { LogDebtOrderFilled, LogIssuanceCancelled, LogDebtOrderCancelled } from '../types/DebtKernel/DebtKernel'

export function handleDebtOrderFilled(event: LogDebtOrderFilled): void {
    let debtOrder = new Entity()

    let id = event.params._agreementId.toHex()

    debtOrder.setString('id', id)
    debtOrder.setU256('principle', event.params._principal)
    debtOrder.setAddress('principleToken', event.params._principalToken)
    debtOrder.setAddress('underWriter', event.params._underwriter)
    debtOrder.setU256('underWriterFee', event.params._underwriterFee)
    debtOrder.setAddress('relayer', event.params._relayer)
    debtOrder.setU256('relayerFee', event.params._relayerFee)

    store.set('DebtOrder', id, debtOrder)
}

export function handleIssuanceCancelled(event: LogIssuanceCancelled): void {
    let id = event.params._agreementId.toHex()

    let issuance = store.get('Issuance', id) as Entity
    issuance.setAddress('cancelledBy', event.params._cancelledBy)

    store.set('DebtOrder', id, issuance)

}

export function handleDebtCancelled(event: LogDebtOrderCancelled): void {
    // TODO:
    // let id = event.params._debtOrderHash.toHex()
    //
    // let debtOrder = store.get('DebtOrder', id) as Entity
    // debtOrder.setAddress('cancelledBy', event.params._cancelledBy)
    //
    // store.set('DebtOrder', id, debtOrder)
}
