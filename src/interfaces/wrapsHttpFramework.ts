import {HandlesRouting} from './handlesRouting';

export interface WrapsHttpFramework {
    start(): void;
    registerRoute(route: HandlesRouting): void;
}
