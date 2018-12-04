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

export class LogRepayment extends EthereumEvent {
  get params(): LogRepaymentParams {
    return new LogRepaymentParams(this);
  }
}

export class LogRepaymentParams {
  _event: LogRepayment;

  constructor(event: LogRepayment) {
    this._event = event;
  }

  get _agreementId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get _payer(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get _beneficiary(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get _amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get _token(): Address {
    return this._event.parameters[4].value.toAddress();
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

  get _agreementId(): Bytes {
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

export class RepaymentRouter extends SmartContract {
  static bind(address: Address): RepaymentRouter {
    return new RepaymentRouter("RepaymentRouter", address);
  }

  tokenTransferProxy(): Address {
    let result = super.call("tokenTransferProxy", []);
    return result[0].toAddress();
  }

  debtRegistry(): Address {
    let result = super.call("debtRegistry", []);
    return result[0].toAddress();
  }

  paused(): boolean {
    let result = super.call("paused", []);
    return result[0].toBoolean();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }
}
