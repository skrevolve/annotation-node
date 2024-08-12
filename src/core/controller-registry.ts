import { Express } from 'express';
import { ROUTE_PREFIX, ROUTES, RouteDefinition } from './metadata';

export class ControllerRegistry {
    public static registerControllers(app: Express, controllers: any[]) {
        controllers.forEach(controller => this.registerController(app, controller));
    }

    private static registerController(app: Express, controller: any) {
        const instance = new controller();
        const prefix = Reflect.getMetadata(ROUTE_PREFIX, controller) || '';
        const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES, controller) || [];

        routes.forEach(route => {
            const handler = (instance[route.methodName as keyof typeof instance] as Function).bind(instance);
            (app as any)[route.method](prefix + route.path, handler);
        });
    }
}