import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import {TYPES} from './interfaces/types';
import {RegistersAppRouting} from './interfaces/registersAppRouting';
import 'reflect-metadata';
import {HandlesRouting} from './interfaces/handlesRouting';


@injectable()
export class App {

    constructor(
        @inject(TYPES.WrapsHttpFramework)
        private readonly httpFrameworkWrapper: WrapsHttpFramework,
        @inject(TYPES.RegistersAppRouting)
        private readonly appRouting: RegistersAppRouting
    ) {}

    start() {
        this.appRouting.registeredRoutes().forEach((route: HandlesRouting) => {
            this.httpFrameworkWrapper.registerRoute(route);
        });
        this.httpFrameworkWrapper.start();
    }
}
