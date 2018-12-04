import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class LogInsertEntry extends EthereumEvent {
  get params(): LogInsertEntryParams {
    return new LogInsertEntryParams(this);
  }
}

export class LogInsertEntryParams {
  _event: LogInsertEntry;

  constructor(event: LogInsertEntry) {
    this._event = event;
  }

  get agreementId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get beneficiary(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get underwriter(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get underwriterRiskRating(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get termsContract(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get termsContractParameters(): Bytes {
    return this._event.parameters[5].value.toBytes();
  }
}

export class LogModifyEntryBeneficiary extends EthereumEvent {
  get params(): LogModifyEntryBeneficiaryParams {
    return new LogModifyEntryBeneficiaryParams(this);
  }
}

export class LogModifyEntryBeneficiaryParams {
  _event: LogModifyEntryBeneficiary;

  constructor(event: LogModifyEntryBeneficiary) {
    this._event = event;
  }

  get agreementId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get previousBeneficiary(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get newBeneficiary(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Authorized extends EthereumEvent {
  get params(): AuthorizedParams {
    return new AuthorizedParams(this);
  }
}

export class AuthorizedParams {
  _event: Authorized;

  constructor(event: Authorized) {
    this._event = event;
  }

  get agent(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get callingContext(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class AuthorizationRevoked extends EthereumEvent {
  get params(): AuthorizationRevokedParams {
    return new AuthorizationRevokedParams(this);
  }
}

export class AuthorizationRevokedParams {
  _event: AuthorizationRevoked;

  constructor(event: AuthorizationRevoked) {
    this._event = event;
  }

  get agent(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get callingContext(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class Pause extends EthereumEvent {
  get params(): PauseParams {
    return new PauseParams(this);
  }
}

export class PauseParams {
  _event: Pause;

  constructor(event: Pause) {
    this._event = event;
  }
}

export class Unpause extends EthereumEvent {
  get params(): UnpauseParams {
    return new UnpauseParams(this);
  }
}

export class UnpauseParams {
  _event: Unpause;

  constructor(event: Unpause) {
    this._event = event;
  }
}

export class OwnershipTransferred extends EthereumEvent {
  get params(): OwnershipTransferredParams {
    return new OwnershipTransferredParams(this);
  }
}

export class OwnershipTransferredParams {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class DebtRegistry__getTermsResult {
  value0: Address;
  value1: Bytes;

  constructor(value0: Address, value1: Bytes) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromAddress(this.value0));
    map.set("value1", EthereumValue.fromFixedBytes(this.value1));
    return map;
  }
}

export class DebtRegistry__getResult {
  value0: Address;
  value1: Address;
  value2: Address;
  value3: BigInt;
  value4: Address;
  value5: Bytes;
  value6: BigInt;

  constructor(
    value0: Address,
    value1: Address,
    value2: Address,
    value3: BigInt,
    value4: Address,
    value5: Bytes,
    value6: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromAddress(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromAddress(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    map.set("value4", EthereumValue.fromAddress(this.value4));
    map.set("value5", EthereumValue.fromFixedBytes(this.value5));
    map.set("value6", EthereumValue.fromUnsignedBigInt(this.value6));
    return map;
  }
}

export class DebtRegistry extends SmartContract {
  static bind(address: Address): DebtRegistry {
    return new DebtRegistry("DebtRegistry", address);
  }

  EDIT_CONTEXT(): string {
    let result = super.call("EDIT_CONTEXT", []);
    return result[0].toString();
  }

  getTermsContractParameters(agreementId: Bytes): Bytes {
    let result = super.call("getTermsContractParameters", [
      EthereumValue.fromFixedBytes(agreementId)
    ]);
    return result[0].toBytes();
  }

  paused(): boolean {
    let result = super.call("paused", []);
    return result[0].toBoolean();
  }

  getAuthorizedInsertAgents(): Array<Address> {
    let result = super.call("getAuthorizedInsertAgents", []);
    return result[0].toAddressArray();
  }

  getTerms(agreementId: Bytes): DebtRegistry__getTermsResult {
    let result = super.call("getTerms", [
      EthereumValue.fromFixedBytes(agreementId)
    ]);
    return new DebtRegistry__getTermsResult(
      result[0].toAddress(),
      result[1].toBytes()
    );
  }

  getDebtorsDebts(debtor: Address): Array<Bytes> {
    let result = super.call("getDebtorsDebts", [
      EthereumValue.fromAddress(debtor)
    ]);
    return result[0].toBytesArray();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }

  INSERT_CONTEXT(): string {
    let result = super.call("INSERT_CONTEXT", []);
    return result[0].toString();
  }

  get(agreementId: Bytes): DebtRegistry__getResult {
    let result = super.call("get", [EthereumValue.fromFixedBytes(agreementId)]);
    return new DebtRegistry__getResult(
      result[0].toAddress(),
      result[1].toAddress(),
      result[2].toAddress(),
      result[3].toBigInt(),
      result[4].toAddress(),
      result[5].toBytes(),
      result[6].toBigInt()
    );
  }

  doesEntryExist(agreementId: Bytes): boolean {
    let result = super.call("doesEntryExist", [
      EthereumValue.fromFixedBytes(agreementId)
    ]);
    return result[0].toBoolean();
  }

  getBeneficiary(agreementId: Bytes): Address {
    let result = super.call("getBeneficiary", [
      EthereumValue.fromFixedBytes(agreementId)
    ]);
    return result[0].toAddress();
  }

  getIssuanceBlockTimestamp(agreementId: Bytes): BigInt {
    let result = super.call("getIssuanceBlockTimestamp", [
      EthereumValue.fromFixedBytes(agreementId)
    ]);
    return result[0].toBigInt();
  }

  getTermsContract(agreementId: Bytes): Address {
    let result = super.call("getTermsContract", [
      EthereumValue.fromFixedBytes(agreementId)
    ]);
    return result[0].toAddress();
  }

  getAuthorizedEditAgents(): Array<Address> {
    let result = super.call("getAuthorizedEditAgents", []);
    return result[0].toAddressArray();
  }
}
