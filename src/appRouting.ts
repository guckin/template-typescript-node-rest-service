import {RegistersAppRouting} from './interfaces/registersAppRouting';
import {injectable} from 'inversify';

@injectable()
export class AppRouting implements RegistersAppRouting {
    registeredRoutes(): any {
        // TODO
        return null;
    }
}
