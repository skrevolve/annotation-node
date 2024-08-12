import 'reflect-metadata';

export const ROUTE_PREFIX = Symbol('route_prefix');
export const ROUTES = Symbol('routes');

export interface RouteDefinition {
    path: string;
    method: string;
    methodName: string | symbol;
}

export function getMetadata(metadataKey: symbol, target: any): any {
    return Reflect.getMetadata(metadataKey, target);
}

export function setMetadata(metadataKey: symbol, metadataValue: any, target: any): void {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
}