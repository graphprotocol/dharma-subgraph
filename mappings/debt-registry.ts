// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import types and APIs from graph-ts
import { Entity, store } from '@graphprotocol/graph-ts'

// Import event types from the registrar contract ABI
import { LogInsertEntry, LogModifyEntryBeneficiary } from '../types/DebtRegistry/DebtRegistry'

export function handleLogInsertEntry(event: LogInsertEntry): void {
    let entry = new Entity()
    let id = event.params.agreementId.toHex()

    entry.setString('id', id)
    entry.setAddress('beneficiary', event.params.beneficiary)
    entry.setAddress('underwriter', event.params.underwriter)
    entry.setU256('underwriterRiskRating', event.params.underwriterRiskRating)
    entry.setAddress('termsContract', event.params.termsContract)
    entry.setBytes('termsContractParameters', event.params.termsContractParameters)

    store.set('DebtOrder', id, entry)
}

export function handleModifyBeneficiary(event: LogModifyEntryBeneficiary): void {
    let id = event.params.agreementId.toHex()
    let regDebt = new Entity()

    regDebt.setAddress('beneficiary', event.params.newBeneficiary)
    store.set('DebtOrder', id, regDebt)
}