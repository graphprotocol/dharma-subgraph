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

export class LogDebtOrderFilled extends EthereumEvent {
  get params(): LogDebtOrderFilledParams {
    return new LogDebtOrderFilledParams(this);
  }
}

export class LogDebtOrderFilledParams {
  _event: LogDebtOrderFilled;

  constructor(event: LogDebtOrderFilled) {
    this._event = event;
  }

  get _agreementId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _principal(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _principalToken(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _underwriter(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get _underwriterFee(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get _relayer(): Address {
    return this._event.parameters[5].value.toAddress();
  }

  get _relayerFee(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class LogIssuanceCancelled extends EthereumEvent {
  get params(): LogIssuanceCancelledParams {
    return new LogIssuanceCancelledParams(this);
  }
}

export class LogIssuanceCancelledParams {
  _event: LogIssuanceCancelled;

  constructor(event: LogIssuanceCancelled) {
    this._event = event;
  }

  get _agreementId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _cancelledBy(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class LogDebtOrderCancelled extends EthereumEvent {
  get params(): LogDebtOrderCancelledParams {
    return new LogDebtOrderCancelledParams(this);
  }
}

export class LogDebtOrderCancelledParams {
  _event: LogDebtOrderCancelled;

  constructor(event: LogDebtOrderCancelled) {
    this._event = event;
  }

  get _debtOrderHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _cancelledBy(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class LogError extends EthereumEvent {
  get params(): LogErrorParams {
    return new LogErrorParams(this);
  }
}

export class LogErrorParams {
  _event: LogError;

  constructor(event: LogError) {
    this._event = event;
  }

  get _errorId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get _orderHash(): Bytes {
    return this._event.parameters[1].value.toBytes();
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

export class DebtKernel extends SmartContract {
  static bind(address: Address): DebtKernel {
    return new DebtKernel("DebtKernel", address);
  }

  debtOrderCancelled(param0: Bytes): boolean {
    let result = super.call("debtOrderCancelled", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    return result[0].toBoolean();
  }

  paused(): boolean {
    let result = super.call("paused", []);
    return result[0].toBoolean();
  }

  issuanceCancelled(param0: Bytes): boolean {
    let result = super.call("issuanceCancelled", [
      EthereumValue.fromFixedBytes(param0)
    ]);
    return result[0].toBoolean();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }

  TOKEN_TRANSFER_PROXY(): Address {
    let result = super.call("TOKEN_TRANSFER_PROXY", []);
    return result[0].toAddress();
  }

  NULL_ISSUANCE_HASH(): Bytes {
    let result = super.call("NULL_ISSUANCE_HASH", []);
    return result[0].toBytes();
  }

  EXTERNAL_QUERY_GAS_LIMIT(): i32 {
    let result = super.call("EXTERNAL_QUERY_GAS_LIMIT", []);
    return result[0].toI32();
  }

  debtToken(): Address {
    let result = super.call("debtToken", []);
    return result[0].toAddress();
  }
}
