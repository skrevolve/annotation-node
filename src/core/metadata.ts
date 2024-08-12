import 'reflect-metadata';

export const ROUTE_PREFIX = 'route_prefix';
export const ROUTES = 'routes';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface RouteDefinition {
    path: string;
    method: HttpMethod;
    methodName: string | symbol;
}