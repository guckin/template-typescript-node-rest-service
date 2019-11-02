import {ApplicationStartConfiguration, WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import {TYPES} from './interfaces/types';
import {RegistersAppRouting} from './interfaces/registersAppRouting';
import 'reflect-metadata';
import {HandlesRouting} from './interfaces/handlesRouting';
import {AppInterface} from './interfaces/appInterface';


@injectable()
export class App implements AppInterface {

    constructor(
        @inject(TYPES.WrapsHttpFramework)
        private readonly httpFrameworkWrapper: WrapsHttpFramework,
        @inject(TYPES.RegistersAppRouting)
        private readonly appRouting: RegistersAppRouting
    ) {}

    start(config: ApplicationStartConfiguration) {
        this.appRouting.registeredRoutes().forEach((route: HandlesRouting) => {
            this.httpFrameworkWrapper.registerRoute(route);
        });
        this.httpFrameworkWrapper.start(config);
    }
}
