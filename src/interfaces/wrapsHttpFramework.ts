import {HandlesRouting} from './handlesRouting';

export interface ApplicationStartConfiguration {
    port: number;
    serverInitMessage: string;
}

export interface WrapsHttpFramework {
    start(config: ApplicationStartConfiguration): void;
    registerRoute(route: HandlesRouting): void;
}
