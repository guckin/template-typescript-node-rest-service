import {ApplicationStartConfiguration, WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import {TYPES} from './interfaces/types';
import 'reflect-metadata';
import {HandlesRouting, RoutingHandlers} from './interfaces/handlesRouting';
import {AppInterface} from './interfaces/appInterface';

@injectable()
export class App implements AppInterface {

    constructor(
        @inject(TYPES.WrapsHttpFramework)
        private readonly httpFrameworkWrapper: WrapsHttpFramework,
        @inject(TYPES.RoutingHandlers)
        private readonly appRouting: RoutingHandlers
    ) {}

    start(config: ApplicationStartConfiguration) {
        this.appRouting.forEach((route: HandlesRouting) => {
            this.httpFrameworkWrapper.registerRoute(route);
        });
        this.httpFrameworkWrapper.start(config);
    }
}
