import {HandlesRouting} from './handlesRouting';

export interface ApplicationStartConfiguration {
    port: number;
    message: string;
}

export interface WrapsHttpFramework {
    start(config: ApplicationStartConfiguration): void;
    registerRoute(route: HandlesRouting): void;
}
