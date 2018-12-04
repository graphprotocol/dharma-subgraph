// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import event types from the registrar contract ABI
import {
  LogInsertEntry,
  LogModifyEntryBeneficiary,
} from '../types/DebtRegistry/DebtRegistry'

// Import entity types from the schema
import { DebtOrder } from '../types/schema'

export function handleLogInsertEntry(event: LogInsertEntry): void {
  let id = event.params.agreementId.toHex()

  let debtOrder = new DebtOrder(id)
  debtOrder.beneficiary = event.params.beneficiary
  debtOrder.underwriter = event.params.underwriter
  debtOrder.underwriterRiskRating = event.params.underwriterRiskRating
  debtOrder.termsContract = event.params.termsContract
  debtOrder.termsContractParameters = event.params.termsContractParameters
  debtOrder.save()
}

export function handleModifyBeneficiary(event: LogModifyEntryBeneficiary): void {
  let id = event.params.agreementId.toHex()

  let debtOrder = new DebtOrder(id)
  debtOrder.beneficiary = event.params.newBeneficiary
  debtOrder.save()
}
