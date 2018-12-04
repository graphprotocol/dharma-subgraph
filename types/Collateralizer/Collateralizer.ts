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

export class CollateralLocked extends EthereumEvent {
  get params(): CollateralLockedParams {
    return new CollateralLockedParams(this);
  }
}

export class CollateralLockedParams {
  _event: CollateralLocked;

  constructor(event: CollateralLocked) {
    this._event = event;
  }

  get agreementID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get token(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class CollateralReturned extends EthereumEvent {
  get params(): CollateralReturnedParams {
    return new CollateralReturnedParams(this);
  }
}

export class CollateralReturnedParams {
  _event: CollateralReturned;

  constructor(event: CollateralReturned) {
    this._event = event;
  }

  get agreementID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get collateralizer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class CollateralSeized extends EthereumEvent {
  get params(): CollateralSeizedParams {
    return new CollateralSeizedParams(this);
  }
}

export class CollateralSeizedParams {
  _event: CollateralSeized;

  constructor(event: CollateralSeized) {
    this._event = event;
  }

  get agreementID(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get beneficiary(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get token(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
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

export class Collateralizer__unpackCollateralParametersFromBytesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromUnsignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromUnsignedBigInt(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class Collateralizer extends SmartContract {
  static bind(address: Address): Collateralizer {
    return new Collateralizer("Collateralizer", address);
  }

  debtKernelAddress(): Address {
    let result = super.call("debtKernelAddress", []);
    return result[0].toAddress();
  }

  tokenTransferProxy(): Address {
    let result = super.call("tokenTransferProxy", []);
    return result[0].toAddress();
  }

  CONTEXT(): string {
    let result = super.call("CONTEXT", []);
    return result[0].toString();
  }

  debtRegistry(): Address {
    let result = super.call("debtRegistry", []);
    return result[0].toAddress();
  }

  timestampAdjustedForGracePeriod(gracePeriodInDays: BigInt): BigInt {
    let result = super.call("timestampAdjustedForGracePeriod", [
      EthereumValue.fromUnsignedBigInt(gracePeriodInDays)
    ]);
    return result[0].toBigInt();
  }

  paused(): boolean {
    let result = super.call("paused", []);
    return result[0].toBoolean();
  }

  SECONDS_IN_DAY(): BigInt {
    let result = super.call("SECONDS_IN_DAY", []);
    return result[0].toBigInt();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }

  tokenRegistry(): Address {
    let result = super.call("tokenRegistry", []);
    return result[0].toAddress();
  }

  unpackCollateralParametersFromBytes(
    parameters: Bytes
  ): Collateralizer__unpackCollateralParametersFromBytesResult {
    let result = super.call("unpackCollateralParametersFromBytes", [
      EthereumValue.fromFixedBytes(parameters)
    ]);
    return new Collateralizer__unpackCollateralParametersFromBytesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  agreementToCollateralizer(param0: Bytes): Address {
    let result = super.call("agreementToCollateralizer", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    return result[0].toAddress();
  }

  getAuthorizedCollateralizeAgents(): Array<Address> {
    let result = super.call("getAuthorizedCollateralizeAgents", []);
    return result[0].toAddressArray();
  }
}
