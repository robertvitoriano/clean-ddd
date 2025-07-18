//ERROR
export class Failure<F> {
  readonly value: F

  constructor(value: F) {
    this.value = value
  }

  isRight() {
    return false
  }

  isLeft() {
    return true
  }
}
// SUCCESS
export class Success<S> {
  readonly value: S

  constructor(value: S) {
    this.value = value
  }

  isSuccess() {
    return true
  }

  isFailure() {
    return false
  }
}

export type Result<F, S> = Failure<F> | Success<S>

export const failure = <F, S>(value: F): Result<F, S> => {
  return new Failure(value)
}

export const success = <F, S>(value: S): Result<F, S> => {
  return new Success(value)
}
