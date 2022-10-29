export function isEsbuildError(error: unknown): boolean {
  return !!error
  && typeof error == 'object'
  && error != null
  && 'errors' in error
  && 'warnings' in error;
}
