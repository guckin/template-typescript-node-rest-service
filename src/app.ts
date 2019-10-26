import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import {TYPES} from './interfaces/types';
import {RegistersAppRouting} from './interfaces/registersAppRouting';
import 'reflect-metadata';


@injectable()
export class App {

    constructor(
        @inject(TYPES.WrapsHttpFramework)
        private readonly httpFrameworkWrapper: WrapsHttpFramework,
        @inject(TYPES.RegistersAppRouting)
        private readonly appRouting: RegistersAppRouting
    ) {}

    start() {
        this.httpFrameworkWrapper.registerRoute(
            this.appRouting.registeredRoutes()
        );
        this.httpFrameworkWrapper.start();
    }
}
