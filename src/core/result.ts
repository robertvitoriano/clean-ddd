//ERROR
export class Failure<F, S> {
  readonly value: F

  constructor(value: F) {
    this.value = value
  }

  public isSuccess(): this is Success<F, S> {
    return false
  }

  public isFailure(): this is Failure<F, S> {
    return true
  }
}
// SUCCESS
export class Success<F, S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }

  public isSuccess(): this is Success<F, S> {
    return true
  }

  public isFailure(): this is Failure<F, S> {
    return false
  }
}

export type Result<F, S> = Failure<F, S> | Success<F, S>

export const failure = <F, S>(value: F): Result<F, S> => {
  return new Failure(value)
}

export const success = <F, S>(value: S): Result<F, S> => {
  return new Success(value)
}
