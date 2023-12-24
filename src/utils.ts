import { IConstruct } from 'constructs';

export function isEsbuildError(error: unknown): boolean {
  return !!error
  && typeof error == 'object'
  && error != null
  && 'errors' in error
  && 'warnings' in error;
}


const assetIds = new WeakMap<IConstruct, number>();
export const uniqueAssetId = (scope: IConstruct, name: string) => {
  const nextId = (assetIds.get(scope) ?? 0) + 1;
  assetIds.set(scope, nextId);

  // Only one asset per scope, skip the id
  if (nextId === 1) {
    return name;
  }

  return `${name}${nextId}`;
};
