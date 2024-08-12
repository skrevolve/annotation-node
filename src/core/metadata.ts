import 'reflect-metadata';

export const ROUTE_PREFIX = Symbol('route_prefix');
export const ROUTES = Symbol('routes');
export const MIDDLEWARE = Symbol('middleware');

export interface RouteDefinition {
    path: string;
    method: string;
    methodName: string | symbol;
}

export function getMetadata(metadataKey: symbol, target: any, propertyKey?: string | symbol): any {
    if (propertyKey) {
        return Reflect.getMetadata(metadataKey, target, propertyKey);
    }
    return Reflect.getMetadata(metadataKey, target);
}

export function setMetadata(metadataKey: symbol, metadataValue: any, target: any, propertyKey?: string | symbol): void {
    if (propertyKey) {
        Reflect.defineMetadata(metadataKey, metadataValue, target, propertyKey);
    } else {
        Reflect.defineMetadata(metadataKey, metadataValue, target);
    }
}