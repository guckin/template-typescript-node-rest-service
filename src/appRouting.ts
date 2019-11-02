import {RegistersAppRouting} from './interfaces/registersAppRouting';
import {injectable} from 'inversify';
import 'reflect-metadata';
import {HandlesRouting} from './interfaces/handlesRouting';

@injectable()
export class AppRouting implements RegistersAppRouting {
    registeredRoutes(): HandlesRouting[] {
        return undefined;
    }
}
