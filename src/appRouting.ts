import 'reflect-metadata';
import {RoutingHandlers} from './interfaces/handlesRouting';
import {HealthCheckRoute} from './routes/healthCheckRoute';

export const AppRouting: RoutingHandlers = [
    new HealthCheckRoute()
];
