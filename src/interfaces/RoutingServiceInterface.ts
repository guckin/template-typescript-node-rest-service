import {HandlesRouting} from './handlesRouting';

export interface RoutingServiceInterface {
    registerRoute(handler: HandlesRouting): void;
}
