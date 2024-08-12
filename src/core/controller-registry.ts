import { Express } from 'express';
import { ROUTE_PREFIX, ROUTES, MIDDLEWARE, RouteDefinition, getMetadata } from './metadata';

export class ControllerRegistry {

    public static addControllers(
        app: Express,
        controllers: any[] | { [group: string]: any[] },
        groupPrefix: string = ''
    ): void {
        if (Array.isArray(controllers)) {
            controllers.forEach(controller => this.addController(app, controller, groupPrefix));
        } else {
            Object.entries(controllers).forEach(([prefix, groupControllers]) => {
                const fullGroupPrefix = groupPrefix + prefix;
                groupControllers.forEach(controller => this.addController(app, controller, fullGroupPrefix));
            });
        }
    }

    private static addController(app: Express, controller: any, groupPrefix: string = ''): void {
        const instance = new controller();
        const prefix = getMetadata(ROUTE_PREFIX, controller) || '';
        const routes: RouteDefinition[] = getMetadata(ROUTES, controller) || [];
        const classMiddlewares = getMetadata(MIDDLEWARE, controller) || [];

        routes.forEach(route => {
            const handler = (instance[route.methodName as keyof typeof instance] as Function).bind(instance);
            const fullPath = `${groupPrefix}${prefix}${route.path}`;
            const methodMiddlewares = getMetadata(MIDDLEWARE, controller, route.methodName) || [];
            const middlewares = [...classMiddlewares, ...methodMiddlewares];
            (app as any)[route.method](fullPath, ...middlewares, handler);
        });
    }
}