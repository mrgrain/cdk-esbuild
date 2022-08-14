interface CodedError {
  code: string;
}

export function errorHasCode(error: unknown, code: string): error is CodedError {
  return !!error
  && typeof error == 'object'
  && error != null
  && 'code' in error
  && (error as CodedError).code ==code;
}
