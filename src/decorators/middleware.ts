import { setMetadata, getMetadata } from '../core/metadata';

export const MIDDLEWARE = Symbol('middleware');

export interface MiddlewareFunction {
    (req: any, res: any, next: () => void): void;
}

export function Use(...middlewares: MiddlewareFunction[]): ClassDecorator & MethodDecorator {
    return (target: any, propertyKey?: string | symbol, descriptor?: PropertyDescriptor) => {
        if (propertyKey) {
            // Method decorator
            const existingMiddlewares = getMetadata(MIDDLEWARE, target.constructor, propertyKey) || [];
            setMetadata(MIDDLEWARE, [...existingMiddlewares, ...middlewares], target.constructor, propertyKey);
        } else {
            // Class decorator
            const existingMiddlewares = getMetadata(MIDDLEWARE, target) || [];
            setMetadata(MIDDLEWARE, [...existingMiddlewares, ...middlewares], target);
        }
    };
}