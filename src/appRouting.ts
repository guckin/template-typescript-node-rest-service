import 'reflect-metadata';
import {RoutingHandlers} from './interfaces/handlesRouting';
import {HealthCheckRoute} from './healthCheckRoute';

export const AppRouting: RoutingHandlers = [
    new HealthCheckRoute()
];
