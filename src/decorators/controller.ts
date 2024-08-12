import { ROUTE_PREFIX } from '../core/metadata';

export function Controller(prefix: string): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(ROUTE_PREFIX, prefix, target);
    };
}