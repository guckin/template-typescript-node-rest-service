import {HandlesRouting, HttpVerb, Path, RouteCallback} from './handlesRouting';

export interface ApplicationStartConfiguration {
    port: number;
    serverInitMessage: string;
}

export interface WrapsHttpFramework {
    start(config: ApplicationStartConfiguration): void;
    registerRoute(routeHandler: HandlesRouting): void;
}
