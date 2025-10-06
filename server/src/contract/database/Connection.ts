export default interface DatabaseConnection {
  connect: () => Promise<void>;
  query: <R>(statement: string, params?: any[]) => Promise<R>;
  close: () => Promise<void>;
}
