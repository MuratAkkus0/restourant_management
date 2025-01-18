type FetchDocumentsOptions = {
  realTime?: boolean;
};
export type FetchDocumentsProps = (
  collectionPath: [string, ...string[]], // Dynamic Tuple
  callback: CallableFunction,
  options?: fetchDocumentsOptions
) => Promise<any>;
