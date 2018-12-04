// Required for dynamic memory allocation in WASM / AssemblyScript
import 'allocator/arena'
export { allocate_memory }

// Import event types from the registrar contract ABI
import {
  LogDebtOrderFilled,
  LogIssuanceCancelled,
  LogDebtOrderCancelled,
} from '../types/DebtKernel/DebtKernel'

// Import entity types from the schema
import { CancelledDebtOrder, DebtOrder } from '../types/schema'

export function handleDebtOrderFilled(event: LogDebtOrderFilled): void {
  let id = event.params._agreementId.toHex()

  let debtOrder = new DebtOrder(id)
  debtOrder.principle = event.params._principal
  debtOrder.principleToken = event.params._principalToken
  debtOrder.underwriter = event.params._underwriter
  debtOrder.underwriterFee = event.params._underwriterFee
  debtOrder.relayer = event.params._relayer
  debtOrder.relayerFee = event.params._relayerFee
  debtOrder.collaterals = []
  debtOrder.repayments = []
  debtOrder.save()
}

// This event has never actually been called on mainnet or kovan, so it is returning blank queries
export function handleIssuanceCancelled(event: LogIssuanceCancelled): void {
  let id = event.params._agreementId.toHex()

  let debtOrder = new DebtOrder(id)
  debtOrder.issuanceCancelledBy = event.params._cancelledBy
  debtOrder.save()
}

export function handleDebtCancelled(event: LogDebtOrderCancelled): void {
  let id = event.params._debtOrderHash.toHex()

  let cancelledDebt = new CancelledDebtOrder(id)
  cancelledDebt.cancelledBy = event.params._cancelledBy
  cancelledDebt.save()
}
