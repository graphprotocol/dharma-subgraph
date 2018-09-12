export function handleLogSimpleInterestTermStart(event: LogSimpleInterestTermStart): void {
  // let id = event.params.id.toHex()

  // let simpleInterestTermStart = new Entity()
  // simpleInterestTermStart.setString('id', id)
  // simpleInterestTermStart.setBytes('principalTokenAddress', event.params.principalTokenAddress)

  // principalAmount: BigInt
  // termStartUnixTimestamp: BigInt
  // termEndUnixTimestamp: BigInt
  // amortizationUnitType: String
  // termLengthInAmortizationUnits: BigInt
  // interestRate: BigInt

  store.set('SimpleInterestTermStart', id, simpleInterestTermStart)
}
