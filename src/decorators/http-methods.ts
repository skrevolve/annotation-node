import { ROUTES, RouteDefinition } from '../core/metadata';

function createMethodDecorator(method: string) {
    return function (path: string): MethodDecorator {
        return (target, propertyKey) => {
            const routes = Reflect.getMetadata(ROUTES, target.constructor) || [];
            routes.push({
                method: method,
                path: path,
                methodName: propertyKey
            } as RouteDefinition);
            Reflect.defineMetadata(ROUTES, routes, target.constructor);
        };
    };
}

export const Get = createMethodDecorator('get');
export const Post = createMethodDecorator('post');
export const Put = createMethodDecorator('put');
export const Delete = createMethodDecorator('delete');