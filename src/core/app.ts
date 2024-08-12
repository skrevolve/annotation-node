import express from 'express';
import { ROUTE_PREFIX, ROUTES, RouteDefinition } from './metadata';

export class App {
    private app: express.Application;

    constructor() {
        this.app = express();
    }

    public addController(controller: any) {
        const instance = new controller();
        const prefix = Reflect.getMetadata(ROUTE_PREFIX, controller);
        const routes: RouteDefinition[] = Reflect.getMetadata(ROUTES, controller);

        routes.forEach(route => {
            (this.app[route.method as keyof express.Application] as Function)(
                prefix + route.path,
                (req: express.Request, res: express.Response) => {
                    (instance[route.methodName as keyof typeof instance] as Function)(req, res);
                }
            );
        });
    }

    public listen(port: number, callback?: () => void) {
        this.app.listen(port, callback);
    }
}