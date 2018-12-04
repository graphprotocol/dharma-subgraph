import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt
} from "@graphprotocol/graph-ts";

export class DebtOrder extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DebtOrder entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DebtOrder entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DebtOrder", id.toString(), this);
  }

  static load(id: string): DebtOrder | null {
    return store.get("DebtOrder", id) as DebtOrder | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get principle(): BigInt {
    let value = this.get("principle");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set principle(value: BigInt) {
    if (value === null) {
      this.unset("principle");
    } else {
      this.set("principle", Value.fromBigInt(value as BigInt));
    }
  }

  get principleToken(): Bytes {
    let value = this.get("principleToken");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set principleToken(value: Bytes) {
    if (value === null) {
      this.unset("principleToken");
    } else {
      this.set("principleToken", Value.fromBytes(value as Bytes));
    }
  }

  get underwriter(): Bytes {
    let value = this.get("underwriter");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set underwriter(value: Bytes) {
    if (value === null) {
      this.unset("underwriter");
    } else {
      this.set("underwriter", Value.fromBytes(value as Bytes));
    }
  }

  get underwriterFee(): BigInt {
    let value = this.get("underwriterFee");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set underwriterFee(value: BigInt) {
    if (value === null) {
      this.unset("underwriterFee");
    } else {
      this.set("underwriterFee", Value.fromBigInt(value as BigInt));
    }
  }

  get relayer(): Bytes {
    let value = this.get("relayer");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set relayer(value: Bytes) {
    if (value === null) {
      this.unset("relayer");
    } else {
      this.set("relayer", Value.fromBytes(value as Bytes));
    }
  }

  get relayerFee(): BigInt {
    let value = this.get("relayerFee");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set relayerFee(value: BigInt) {
    if (value === null) {
      this.unset("relayerFee");
    } else {
      this.set("relayerFee", Value.fromBigInt(value as BigInt));
    }
  }

  get issuanceCancelledBy(): Bytes | null {
    let value = this.get("issuanceCancelledBy");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes | null;
    }
  }

  set issuanceCancelledBy(value: Bytes | null) {
    if (value === null) {
      this.unset("issuanceCancelledBy");
    } else {
      this.set("issuanceCancelledBy", Value.fromBytes(value as Bytes));
    }
  }

  get beneficiary(): Bytes {
    let value = this.get("beneficiary");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set beneficiary(value: Bytes) {
    if (value === null) {
      this.unset("beneficiary");
    } else {
      this.set("beneficiary", Value.fromBytes(value as Bytes));
    }
  }

  get underwriterRiskRating(): BigInt {
    let value = this.get("underwriterRiskRating");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set underwriterRiskRating(value: BigInt) {
    if (value === null) {
      this.unset("underwriterRiskRating");
    } else {
      this.set("underwriterRiskRating", Value.fromBigInt(value as BigInt));
    }
  }

  get termsContract(): Bytes {
    let value = this.get("termsContract");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set termsContract(value: Bytes) {
    if (value === null) {
      this.unset("termsContract");
    } else {
      this.set("termsContract", Value.fromBytes(value as Bytes));
    }
  }

  get termsContractParameters(): Bytes {
    let value = this.get("termsContractParameters");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set termsContractParameters(value: Bytes) {
    if (value === null) {
      this.unset("termsContractParameters");
    } else {
      this.set("termsContractParameters", Value.fromBytes(value as Bytes));
    }
  }

  get collaterals(): Array<string> | null {
    let value = this.get("collaterals");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray() as Array<string> | null;
    }
  }

  set collaterals(value: Array<string> | null) {
    if (value === null) {
      this.unset("collaterals");
    } else {
      this.set("collaterals", Value.fromStringArray(value as Array<string>));
    }
  }

  get repayments(): Array<string> | null {
    let value = this.get("repayments");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray() as Array<string> | null;
    }
  }

  set repayments(value: Array<string> | null) {
    if (value === null) {
      this.unset("repayments");
    } else {
      this.set("repayments", Value.fromStringArray(value as Array<string>));
    }
  }
}

export class Collateral extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Collateral entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Collateral entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Collateral", id.toString(), this);
  }

  static load(id: string): Collateral | null {
    return store.get("Collateral", id) as Collateral | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get tokenAddress(): Bytes {
    let value = this.get("tokenAddress");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set tokenAddress(value: Bytes) {
    if (value === null) {
      this.unset("tokenAddress");
    } else {
      this.set("tokenAddress", Value.fromBytes(value as Bytes));
    }
  }

  get amount(): BigInt {
    let value = this.get("amount");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set amount(value: BigInt) {
    if (value === null) {
      this.unset("amount");
    } else {
      this.set("amount", Value.fromBigInt(value as BigInt));
    }
  }

  get status(): string {
    let value = this.get("status");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set status(value: string) {
    if (value === null) {
      this.unset("status");
    } else {
      this.set("status", Value.fromString(value as string));
    }
  }

  get collateralReturnedTo(): Bytes | null {
    let value = this.get("collateralReturnedTo");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes | null;
    }
  }

  set collateralReturnedTo(value: Bytes | null) {
    if (value === null) {
      this.unset("collateralReturnedTo");
    } else {
      this.set("collateralReturnedTo", Value.fromBytes(value as Bytes));
    }
  }

  get debtOrder(): string {
    let value = this.get("debtOrder");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set debtOrder(value: string) {
    if (value === null) {
      this.unset("debtOrder");
    } else {
      this.set("debtOrder", Value.fromString(value as string));
    }
  }
}

export class CancelledDebtOrder extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save CancelledDebtOrder entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save CancelledDebtOrder entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("CancelledDebtOrder", id.toString(), this);
  }

  static load(id: string): CancelledDebtOrder | null {
    return store.get("CancelledDebtOrder", id) as CancelledDebtOrder | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get cancelledBy(): Bytes {
    let value = this.get("cancelledBy");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set cancelledBy(value: Bytes) {
    if (value === null) {
      this.unset("cancelledBy");
    } else {
      this.set("cancelledBy", Value.fromBytes(value as Bytes));
    }
  }
}

export class Repayment extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Repayment entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Repayment entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Repayment", id.toString(), this);
  }

  static load(id: string): Repayment | null {
    return store.get("Repayment", id) as Repayment | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get payers(): Array<Bytes> | null {
    let value = this.get("payers");
    if (value === null) {
      return null;
    } else {
      return value.toBytesArray() as Array<Bytes> | null;
    }
  }

  set payers(value: Array<Bytes> | null) {
    if (value === null) {
      this.unset("payers");
    } else {
      this.set("payers", Value.fromBytesArray(value as Array<Bytes>));
    }
  }

  get beneficiaries(): Array<Bytes> | null {
    let value = this.get("beneficiaries");
    if (value === null) {
      return null;
    } else {
      return value.toBytesArray() as Array<Bytes> | null;
    }
  }

  set beneficiaries(value: Array<Bytes> | null) {
    if (value === null) {
      this.unset("beneficiaries");
    } else {
      this.set("beneficiaries", Value.fromBytesArray(value as Array<Bytes>));
    }
  }

  get amounts(): Array<BigInt> | null {
    let value = this.get("amounts");
    if (value === null) {
      return null;
    } else {
      return value.toBigIntArray() as Array<BigInt> | null;
    }
  }

  set amounts(value: Array<BigInt> | null) {
    if (value === null) {
      this.unset("amounts");
    } else {
      this.set("amounts", Value.fromBigIntArray(value as Array<BigInt>));
    }
  }

  get debtOrder(): string {
    let value = this.get("debtOrder");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set debtOrder(value: string) {
    if (value === null) {
      this.unset("debtOrder");
    } else {
      this.set("debtOrder", Value.fromString(value as string));
    }
  }
}
