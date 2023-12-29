import { AxiosError } from 'axios';

export enum HttpRejectType {
  OtherRequestIsBeingExecuted,
  ComponentUnloaded,
  NotHandled,
  Handled500InternalServerError,
  Handled404NotFound,
  ServerNotReachable,
  ErroneousRequest,
}

export class HttpRejectInfo {
  constructor(readonly type: HttpRejectType, readonly error: AxiosError | undefined) {}

  static otherRequestIsBeingExecuted(): HttpRejectInfo {
    return new HttpRejectInfo(HttpRejectType.OtherRequestIsBeingExecuted, undefined);
  }

  static componentUnloaded(): HttpRejectInfo {
    return new HttpRejectInfo(HttpRejectType.ComponentUnloaded, undefined);
  }

  static notHandled(error: AxiosError): HttpRejectInfo {
    return new HttpRejectInfo(HttpRejectType.NotHandled, error);
  }

  static handled500InternalServerError(error: AxiosError): HttpRejectInfo {
    return new HttpRejectInfo(HttpRejectType.Handled500InternalServerError, error);
  }

  static handled404NotFound(error: AxiosError): HttpRejectInfo {
    return new HttpRejectInfo(HttpRejectType.Handled404NotFound, error);
  }

  static handledServerNotReachable(error: AxiosError): HttpRejectInfo {
    return new HttpRejectInfo(HttpRejectType.ServerNotReachable, error);
  }

  static handledErroneousRequest(error: AxiosError): HttpRejectInfo {
    return new HttpRejectInfo(HttpRejectType.ErroneousRequest, error);
  }
}
