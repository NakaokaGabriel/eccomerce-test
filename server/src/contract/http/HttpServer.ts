export type HttpMethods = 'get' | 'post' | 'delete' | 'put' | 'patch';

export interface HttpServer {
  listen: (port: string | number) => void;
  register: (
    method: HttpMethods,
    path: string,
    callback: Function,
  ) => void;
}